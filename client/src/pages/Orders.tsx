import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row } from "antd";
import OrderList from "../components/OrderList/OrderList";

function Orders() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh"}} span={24}>
          <OrderList></OrderList>
        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default Orders