import { Button  } from "antd";
import { useCartContext } from '../../context/CartContext';


function CheckoutBtn() {

  const { handlePayment } = useCartContext();

  return (
    <div>
        <Button type="primary" block onClick={handlePayment} style={{"backgroundColor":"#3C6255", "marginTop":"2rem"}}>Gå till kassan</Button>
    </div>
  )
}

export default CheckoutBtn