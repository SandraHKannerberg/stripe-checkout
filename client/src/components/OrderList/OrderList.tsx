import { useCartContext } from '../../context/CartContext';
import { Row, Col } from 'antd';
import "./OrderList.css"


function OrderList() {
 
  const { orders } = useCartContext();

  return (
    <>
      <Row style={{"display":"flex", "justifyContent" : "center"}}>
        {orders.map((order, index) => (
          <Col key={index} span={2} 
          xs={{ span: 22 }}
          sm={{ span: 12 }}  
          md={{ span: 12 }}  
          lg={{ span: 12 }}
          style={{"margin" : "1rem"}}>

              <h3>Ordernummer {order.created}</h3>
              <p>Kund: {order.customer}</p>
              <p>Totalbelopp: {order.totalOrderPrice} SEK</p>
                <br />
              <h4>Order detaljer</h4>
              <ul>
                {order.products.map((product, productIndex) => (
                    <li className="order--details" key={productIndex}>
                        <p>{product.product}</p>
                        <p>Pris: {product.price} {product.currency}</p>
                        <p>Antal: {product.quantity}</p>
                        <p>Totalt denna produkt: {product.totalPricePerProduct} {product.currency}</p>
                    </li>
                ))}
              </ul>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default OrderList;