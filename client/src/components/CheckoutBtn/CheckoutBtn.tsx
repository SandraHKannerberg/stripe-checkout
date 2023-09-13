import { Button  } from "antd";
import { useCartContext } from "../../context/CartContext";
import { ArrowRightOutlined } from "@ant-design/icons";

function CheckoutBtn() {

  const { handlePayment } = useCartContext();

  return (
    <>
      <Button className="checkout--btn" type="primary" block onClick={handlePayment} style={{"backgroundColor":"#3C6255", "marginTop":"2rem", "borderRadius":"0"}}>
        <p className="btn--text">Gå till kassan <ArrowRightOutlined /></p>
      </Button>
    </>
  )
}

export default CheckoutBtn