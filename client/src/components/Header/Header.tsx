import { Col, Row } from 'antd';
import NavBar from '../NavBar/NavBar';
import Logotype from '../Logotype/Logotype';

function Header() {
  return (
    <div className='header--container'>
        <Row style={{'width' : '100%', 'height':'25%', 'justifyContent' : 'space-between', 'alignItems':'flex-end', 'borderBottom' : '2px solid black'}}>
            <Col span={4}><Logotype></Logotype></Col>
            <Col span={4}><NavBar></NavBar></Col>
        </Row>
    </div>
  )
}

export default Header