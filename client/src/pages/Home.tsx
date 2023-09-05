import Header from '../components/Header/Header'
import MainContent from '../components/MainContent/MainContent'
import Footer from '../components/Footer/Footer'
import { Col, Row } from 'antd';

function home() {
  return (
    <>
        <Row>
            <Col span={24}><Header></Header></Col>
        </Row>

        <Row>
            <Col span={24}><MainContent></MainContent></Col>
        </Row>

        <Row>
            <Col span={24}><Footer></Footer></Col>
        </Row>
    </>
  )
}

export default home