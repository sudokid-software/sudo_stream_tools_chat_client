import { useState, useEffect, useRef } from "preact/hooks"
import "./index.css"
import { createChannel } from "./socket"

export function App() {
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)

  const [room, setRoom] = useState(null)
  const [theme, setTheme] = useState(null)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRoom(params.get("room") || "lobby")

    const cssTheme = params.get("theme") || "default" // e.g., "?theme=dark"
    if (!["default"].includes(cssTheme)) return;

    if (cssTheme) {
      import(`./themes/${cssTheme}.css`)
        .then(() => console.log(`Loaded ${cssTheme}.css`))
        .catch(() => console.error(`Failed to load ${cssTheme}.css`))
    }
  }, []) // Run only once on mount

  // Keep a single channel reference
  const channelRef = useRef(null)

  useEffect(() => {
    if (!room) return // wait until room is known
    if (channelRef.current) return // channel already created

    const channel = createChannel(room)
    channelRef.current = channel

    channel.on("new_chat_message", payload => {
      setMessages(prev => [...prev, payload])
    })

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
