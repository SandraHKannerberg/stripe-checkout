import { Space } from "antd"
import { NavLink } from "react-router-dom"

function Logotype() {
  return (

  <NavLink className="homeicon" to="/"style={{ textDecoration: "none"}}>
    <Space style={{"marginLeft":"3rem", "height":"6rem", "display": "flex", "alignItems":"center", "justifyContent":"flex-start"}}>
      <img src="/assets/logotype-sunflower.png" alt="Sunflower Posters Logotype" height="80rem"/>
    </Space>
  </NavLink>
  )
}

export default Logotype