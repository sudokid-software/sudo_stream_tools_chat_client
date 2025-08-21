import { useState, useEffect } from "preact/hooks";
import { ChatWindowComponent } from "../../components/ChatWindowComponent";

export function ChatOverlayApp() {
  const [room, setRoom] = useState(null);

  // Load CSS and room from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoom(params.get("room") || "lobby");

    const cssTheme = params.get("theme") || "default"; // e.g., "?theme=dark"
    if (!["default"].includes(cssTheme)) return;

    if (cssTheme) {
      import(`./themes/${cssTheme}.css`)
        .then(() => console.log(`Loaded ${cssTheme}.css`))
        .catch(() => console.error(`Failed to load ${cssTheme}.css`));
    }
  }, []);

  return (
    <ChatWindowComponent room={room} />
  );
}
