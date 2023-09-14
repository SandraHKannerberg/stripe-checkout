import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

function Orders() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh"}} span={24}>
          
          <NavLink to="/"style={{ textDecoration: "none" }}>
            <p className="link--my--pages"><HomeOutlined /> Till Startsidan</p>
          </NavLink> 

          <h1>Mina ordrar</h1>
        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default Orders