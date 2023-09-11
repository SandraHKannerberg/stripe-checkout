import { Col, Row } from "antd";
import NavBar from "../NavBar/NavBar";
import Logotype from "../Logotype/Logotype";
import "./Header.css"
import { GiftOutlined } from '@ant-design/icons';

function Header() {
  return (
    <div className="header--container">
        <Row justify="center" align="middle" style={{"backgroundColor" : "black", "height" : "1.8rem"}}>
          <Col span={24}><p style={{"color":"white", "textAlign":"center"}}><GiftOutlined /> AKTUELL KAMPANJKOD: </p></Col>
        </Row>
        <Row justify="space-around" align="bottom" style={{"height":"6rem"}}>
            <Col span={12}><Logotype></Logotype></Col>
            <Col span={12}><NavBar></NavBar></Col>
        </Row>
    </div>
  )
}

export default Header