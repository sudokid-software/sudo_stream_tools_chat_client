import { render } from "preact"

import "../../css/themes/default.css"
import "../../css/account.css";
import { AdminBaseComponent } from "./AdminBaseComponent";

export function AccountApp() {
  return (
    <AdminBaseComponent>
    <div>
      {/* <div class="account-app-container">
        <div class="account-app-oauth-records">OAuth Records</div>
        <div class="account-app-room-records">Room Records</div>
      </div> */}
    </div>
    </AdminBaseComponent>
  )
}

const root = document.getElementById("app")
render(<AccountApp />, root)