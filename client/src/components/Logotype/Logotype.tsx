import { Col, Space } from "antd"
import { NavLink } from "react-router-dom"

function Logotype() {
  return (
  <Col span={24} style={{maxHeight: "6rem"}}>
    <NavLink className="homeicon" to="/"style={{ textDecoration: "none"}}>
      <Space style={{marginLeft:"1.5rem", minHeight:"3rem"}}>
        <img src="/assets/logotype-sunflower.png" alt="Sunflower Posters Logotype" height="80rem"/>
      </Space>
    </NavLink>
  </Col>
  )
}

export default Logotype