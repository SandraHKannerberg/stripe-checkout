import Header from "../components/Header/Header"
import MainContent from "../components/MainContent/MainContent"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";

function home() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh"}} span={24}><MainContent></MainContent></Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default home