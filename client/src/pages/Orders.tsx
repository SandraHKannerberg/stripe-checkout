import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";

function Orders() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh"}} span={24}>
          <h1>Mina ordrar</h1>
        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default Orders