import { useState, useEffect} from "preact/hooks";
import { ChatWindowComponent } from "../../../components/ChatWindowComponent.jsx";
import "../../css/admin.css";

export function ChatAdminApp() {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoom(params.get("room") || "lobby");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Data: ", e);

    console.log("Message: ", e.target.message.value);
    e.target.message.value = "";

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <ChatWindowComponent room={room} />
      </div>
      <div className="chat-form">
        <form onSubmit={sendMessage}>
          <input type="text" name="message" autocomplete="off" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
