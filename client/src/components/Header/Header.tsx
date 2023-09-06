import { Col, Row } from 'antd';
import NavBar from '../NavBar/NavBar';
import Logotype from '../Logotype/Logotype';

function Header() {
  return (
    <div className='header--container'>
        <Row justify="center" align="middle" style={{'backgroundColor' : 'black', 'height' : '1.8rem'}}>
          <Col span={12}><p style={{'color':'white'}}>REKLAM / KAMPANJKOD HÄR</p></Col>
        </Row>
        <Row justify="space-around" align="bottom" style={{'height':'6rem', 'borderBottom' : '2px solid black'}}>
            <Col span={12}><Logotype></Logotype></Col>
            <Col span={12}><NavBar></NavBar></Col>
        </Row>
    </div>
  )
}

export default Header