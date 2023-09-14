import { useCartContext } from '../../context/CartContext';
import { Row, Col } from 'antd';
import { HeartOutlined, CheckOutlined } from "@ant-design/icons";
import "./OrderList.css"


function OrderList() {
 
  const { orders } = useCartContext();

  return (
    <>
    <h1 className="orderhistory--title">Orderhistorik</h1>

    <div className="order--check--icon"><CheckOutlined/></div>
      <Row style={{"marginLeft":"6rem"}}>
        {orders.map((order, index) => (
          <Col key={index} span={12} 
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
                        <p>Pris / st: {product.price} {product.currency}</p>
                        <p>Antal: {product.quantity}</p>
                        <p>Totalt denna produkt: {product.totalPricePerProduct} {product.currency}</p>
                        <br />
                    </li>
                ))}
              </ul>
              <Col span={12} style={{ fontSize: '20px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><HeartOutlined /></Col>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default OrderList;