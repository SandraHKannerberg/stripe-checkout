import { Col, Row } from 'antd';
import NavBar from '../NavBar/NavBar';
import Logotype from '../Logotype/Logotype';

function Header() {
  return (
    <>
        <Row style={{'height' : '100%', 'justifyContent' : 'space-between', 'alignItems':'flex-end', 'borderBottom' : '2px solid black'}}>
            <Col span={4}><Logotype></Logotype></Col>
            <Col span={4}><NavBar></NavBar></Col>
        </Row>
    </>
  )
}

export default Header