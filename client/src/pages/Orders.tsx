import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Col, Row, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import OrderList from "../components/OrderList/OrderList";

const { Text } = Typography;

function Orders() {
  return (
    <Row style={{"minHeight" : "100vh", "backgroundColor":"whitesmoke"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{"minHeight" : "70vh"}} span={24}>

          <NavLink to="/"style={{ textDecoration: "none"}}>
            <Text style={{"marginLeft":"3rem", "marginTop":"2rem"}}><HomeOutlined /> Till Startsidan</Text>
          </NavLink> 

          <OrderList></OrderList>

        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default Orders