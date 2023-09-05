import Header from '../components/Header/Header'
import MainContent from '../components/MainContent/MainContent'
import Footer from '../components/Footer/Footer'
import { Col, Row } from 'antd';

function home() {
  return (
    <Row gutter={[0,0]} style={{'height' : '100vh', 'margin' : 'auto'}}>
        <Col span={24}><Header></Header></Col>
        <Col style={{'backgroundColor':'blue', 'height' : '85vh'}} span={24}><MainContent></MainContent></Col>
        <Col style={{'height' : '5vh'}} span={24}><Footer></Footer></Col>
    </Row>
  )
}

export default home