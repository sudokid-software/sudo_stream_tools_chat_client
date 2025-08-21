import { SideNavBar } from "../../components/SideNavBar"

import "../../css/themes/default.css"
import "../../css/account.css";

export const AdminBaseComponent = (props) => {
  console.log(props.children);
  return (
    <>
      {props.children}
    </>
  )
}