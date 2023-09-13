import { Col, Row } from "antd";
import Coupon from "../CheckoutBtn/Coupon/Coupon";
import NavBar from "../NavBar/NavBar";
import Logotype from "../Logotype/Logotype";
import "./Header.css"


function Header() {
  return (
    <div className="header--container">

      <Coupon></Coupon>
    
      <Row justify="space-around" align="bottom" style={{"height":"6rem"}}>
        <Col span={12}><Logotype></Logotype></Col>
        <Col span={12}><NavBar></NavBar></Col>
      </Row>
    </div>
  )
}

export default Header