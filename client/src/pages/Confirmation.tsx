import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import ConfirmationDetails from "../components/ConfirmationDetails/ConfirmationDetails";
import { Col, Row } from "antd";

function confirmation() {

  return (
    <Row style={{minHeight : "100vh", backgroundColor:"whitesmoke", marginTop: "5rem"}} >
        <Col span={24}><Header></Header></Col>
        <Col style={{height : "auto", textAlign:"center", marginTop:"1rem"}} span={24}>
          <ConfirmationDetails />
        </Col>
        <Col span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default confirmation