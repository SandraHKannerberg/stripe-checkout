import { Button  } from "antd";
import { useProductContext } from '../../context/ProductContext';


function CheckoutBtn() {

  const { handlePayment } = useProductContext();

  return (
    <div>
        <Button type="primary" block onClick={handlePayment} style={{"backgroundColor":"#3C6255", "marginTop":"2rem"}}>Gå till kassan</Button>
    </div>
  )
}

export default CheckoutBtn