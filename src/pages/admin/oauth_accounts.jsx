import { useEffect, useState } from "preact/hooks";
import { render } from "preact"
import { SideNavBar } from "../../components/SideNavBar"

import "../../css/themes/default.css"
import "../../css/account.css";
import "../../css/default.css";

const generateOAuthAccount = () => {
  return {
    platform: "twitch",
    platform_id: "123456",
    platform_username: "SudoKid",
    scope: [
      "bits:read",
      "channel:bot",
      "chat:read",
      "moderator:read:chatters", "user:bot", "user:read:chat", "user:write:chat"
    ],
    profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/6159c3ef-1a8d-4d28-9ee9-6d339b34184b-profile_image-300x300.png"
  }
}

const AccountApp = () => {
  const [oAuthAccounts, setOAuthAccounts] = useState([])

  useEffect(() => {
    const newOAuthAccounts = [generateOAuthAccount(), generateOAuthAccount()]
    setOAuthAccounts(newOAuthAccounts)
  }, [])

  console.log(oAuthAccounts);

  return (
    <SideNavBar>
      <div class="content">
        <h1>Platforms</h1>
        {oAuthAccounts.map(oa => (
          <div class="oauth-record">
            <div>
              <img src={oa.profile_image_url} />
            </div>
            <div class="data">
              <div class="header">
                <div>
                  <h2>{oa.platform_username} - {oa.platform_id}</h2>
                </div>
                <div class="actions">
                  <div class="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z">
                      </path>
                    </svg>
                    <span class="tooltiptext">Refresh OAuth</span>
                  </div>
                </div>
              </div>
              <hr />
              <ul class="pill-list">
                {oa.scope.map(s => (
                  <li><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SideNavBar>
  )
}

const root = document.getElementById("app")
render(<AccountApp />, root)