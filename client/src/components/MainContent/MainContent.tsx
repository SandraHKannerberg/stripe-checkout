import ProductList from "../ProductList/ProductList"
import { Row, Col } from "antd";
import "./MainContent.css"

function MainContent() {
  return (
    <Row style={{"display":"flex", "flexDirection":"column"}}> 
      <Col span={24} style={{"textAlign":"center", "marginTop": "2rem"}}><h1 className="heading--welcome">Välkommen till <h1 className="logotype--text">Sunflower Posters</h1></h1></Col>
      <Col span={24}><ProductList></ProductList></Col>
    </Row>
  )
}

export default MainContent