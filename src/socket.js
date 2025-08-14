import { Socket } from "phoenix"

// Connect to Phoenix Socket endpoint
export function createChannel(chatRoomId) {
    const socket = new Socket("ws://localhost/socket", {})
    socket.connect()

    const channel = socket.channel(`chat_room:${chatRoomId}`, {})
    channel.join()
        .receive("ok", resp => console.log("Joined channel successfully", resp))
        .receive("error", resp => console.error("Unable to join", resp))
    return channel
}

