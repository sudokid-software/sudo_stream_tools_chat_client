import { useState, useEffect, useRef } from "preact/hooks";
import { createChannel } from "../socket.js";

export function ChatWindowComponent({ room }) {
  const [messages, setMessages] = useState([]);
  const channelRef = useRef(null);
  const messageScrollRef = useRef(null);

  // Setup Phoenix channel
  useEffect(() => {
    if (!room || channelRef.current) return;

    const channel = createChannel(room);
    channelRef.current = channel;

    channel.on("new_chat_message", payload => {
      console.log("new message:", payload); // <-- log here
      setMessages(prev => [payload, ...prev]);
    });

    return () => {
      if (channelRef.current) {
        channelRef.current.leave();
        channelRef.current = null;
      }
    };
  }, [room]);

  useEffect(() => {
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="messages" ref={messageScrollRef}>
      {messages.map((m, i) => (
        <div class="message" key={i}>
          <a onclick={() => {
            window.open("https://www.w3schools.com", "_blank", "scrollbars=yes,resizable=yes,top=100,left=100,width=600,height=400");
          }} class="username">{m.chatter_username}</a>
          <span class="text">{m.message_text}</span>
        </div>
      ))}
    </div >
  )
}
