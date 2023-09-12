import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

function confirmation() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh", "textAlign":"center"}} span={24}>
            
           <h3>Tack för ditt köp!</h3>

           <NavLink to="/"style={{ textDecoration: "none" }}>
                <p>TILLBAKA TILL BUTIKEN</p>
            </NavLink>

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation