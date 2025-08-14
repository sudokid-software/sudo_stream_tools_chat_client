import { useState, useEffect, useRef } from "preact/hooks"
import "./app.css"
import { createChannel } from "./socket"

export function App() {
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)

  const [room, setRoom] = useState(null)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRoom(params.get("room") || "lobby")
  }, []) // Run only once on mount

  // Keep a single channel reference
  const channelRef = useRef(null)

  useEffect(() => {
    console.log("I'm running HERE!")
    if (!room) return // wait until room is known
    if (channelRef.current) return // channel already created

    const channel = createChannel(room)
    channelRef.current = channel

    channel.on("new_chat_message", payload => {
      setMessages(prev => [...prev, payload])
    })

    console.log("I'm connecting multiple times")
    channel.join()
      .receive("ok", () => console.log(`Joined chat_room:${room}`))
      .receive("error", resp => console.error("Failed to join", resp))

    return () => {
      if (channelRef.current) {
        channelRef.current.leave()
        channelRef.current = null
      }
    }
  }, [room])


  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div id="messages" ref={messagesRef}>
      {messages.map((m, i) => (
        <div class="message" key={i}>
          <span class="username">{m.chatter_username}</span>
          <span class="text">{m.message_text}</span>
        </div>
      ))}
    </div>
  )
}
