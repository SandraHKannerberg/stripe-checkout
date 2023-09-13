import { Col } from "antd";
import { GiftOutlined } from '@ant-design/icons';
import "./Coupon.css"

function Coupon() {
  return (

    <Col span={24}>
        <p className="coupon--header"><GiftOutlined /> Just nu! 25% på alla posters med rabattkoden <span className="coupon--name">AUTUMN23</span>*</p>
        <p className="coupon--info">*Gäller ett köp per kund t.o.m 31/10. Rabattkoden anges i kassan</p>
    </Col>

  )
}

export default Coupon