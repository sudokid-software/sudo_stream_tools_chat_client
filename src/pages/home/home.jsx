import { render } from "preact"
import { Home } from "./HomeApp.jsx";

// Determine page and configuration from pathname

const root = document.getElementById("app")

render(<Home />, root);