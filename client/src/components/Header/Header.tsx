import { Col, Row } from 'antd';
import NavBar from '../NavBar/NavBar';
import Logotype from '../Logotype/Logotype';

function Header() {
  return (
    <div className='header--container'>
        <Row justify="space-around" align="bottom" style={{'height':'25%', 'borderBottom' : '2px solid black'}}>
            <Col span={12}><Logotype></Logotype></Col>
            <Col span={12}><NavBar></NavBar></Col>
        </Row>
    </div>
  )
}

export default Header