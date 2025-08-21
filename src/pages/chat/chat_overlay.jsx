import { render } from "preact"
import { ChatOverlayApp } from "./ChatOverlayApp.jsx";

// Determine page and configuration from pathname

console.log("Overlay.jsx is loading!");
console.log("Current URL:", window.location.href);

const root = document.getElementById("app")

render(<ChatOverlayApp />, root);
