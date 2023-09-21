import { Col, Row } from "antd";

function Footer() {
  return (
    <Row style={{height:"3rem", display:"flex", alignItems:"center"}}>
      <Col span={12} offset={6} style={{textAlign:"center", fontSize:"10px"}}>Copyright &copy; Sandra Höst Kannerberg, WIE22D Medieinstitutet 2023</Col>
    </Row>
  )
}

export default Footer