import { render } from "preact"
import { AdminApp } from "./admin/AdminApp.jsx"
import { OverlayApp } from "./overlay/OverlayApp.jsx";

// Determine page and configuration from pathname
let page;

if (window.location.pathname.startsWith("/overlay")) {
	page = "overlay";
} else {
	page = "admin";
}

const root = document.getElementById("app")

if (page === "admin") {
	render(<AdminApp />, root)
} else {
	render(<OverlayApp />, root)
}