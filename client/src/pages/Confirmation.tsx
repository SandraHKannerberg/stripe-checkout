import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import ConfirmationDetails from "../components/ConfirmationDetails/ConfirmationDetails";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

function confirmation() {

  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh", "textAlign":"center", "marginTop":"1rem"}} span={24}>

          <NavLink to="/"style={{ textDecoration: "none" }}>
            <p className="link--my--pages"><HomeOutlined /> Till Startsidan</p>
          </NavLink> 

          <ConfirmationDetails />

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation