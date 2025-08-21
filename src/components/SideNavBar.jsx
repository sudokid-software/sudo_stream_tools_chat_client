import "../css/themes/default.css"
import "../css/sidenav.css"

export const SideNavBar = (props) => {
  return (
    <div class="container">
      <div class="side-nav-bar">
        <h2 class="header"><a href="">Stream Tools</a></h2>
        <ul>
          <li><a href="/account/oauth-accounts">OAuth Accounts</a></li>
          <li><a href="">Chat Rooms</a></li>
          <li><a href="">SudoBot</a></li>
        </ul>
      </div>
      {props.children}
    </div>
  )
}