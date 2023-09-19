import { Col, Row } from "antd";
import Coupon from "../Coupon/Coupon";
import NavBar from "../NavBar/NavBar";
import Logotype from "../Logotype/Logotype";
import "./Header.css"
import ShoppingCartIconBtn from "../ShoppingCartIconBtn/ShoppingCartIconBtn";


function Header() {
  return (
    <div className="header--container">
      <Row justify="center" align="middle" style={{backgroundColor : "black", minHeight : "3rem", padding: "10px"}}>
        <Coupon></Coupon>
      </Row>

      <Row justify="space-between" align="middle" style={{minHeight:"6rem", width: "100%"}}>
        <Col>
          <Logotype></Logotype>
        </Col>

        <Col style={{display:"flex", justifyContent:"flex-end", alignItems: "center"}}>
          <NavBar></NavBar>
          <ShoppingCartIconBtn></ShoppingCartIconBtn>
        </Col>
      </Row>
    </div>
  )
}

export default Header