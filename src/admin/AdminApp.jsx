import { useState, useEffect, useRef } from "preact/hooks";
import { ChatWindowComponent } from "../components/ChatWindowComponent.jsx";
import "./admin.css";

export function AdminApp() {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoom(params.get("room") || "lobby");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Handle sending HTTP request to server
    // setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <ChatWindowComponent room={room} />
      </div>
      <div className="chat-form">
        <form>
          <input type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    // <div className="chat-container">
    //   <form className="chat-form" onSubmit={handleSubmit}>
    //     {/* <input type="text" value={newMessage} onInput={e => setNewMessage(e.target.value)} /> */}
    //     <input type="text" />
    //     <button type="submit">Send</button>
    //   </form>
    // </div>
  );
}
