import { useCartContext } from '../../context/CartContext';
import { Row, Col, Card } from 'antd';
import { HeartOutlined } from "@ant-design/icons";
import "./OrderList.css"


function OrderList() {
 
  const { orders, message } = useCartContext();

  return (
    <>
    <Row style={{"display":"flex", "flexDirection":"column", "alignItems":"center", "marginTop":"2rem", "color":"#3C6255"}}>
        <h1 className="orderhistory--title">Orderhistorik</h1>
    </Row>

      <Row style={{"display":"flex", "flexDirection":"column", "alignItems":"center"}}>
        <br />
        <p>{message}</p>
        {orders.map((order, index) => (
          <Col key={index} span={24}
          lg={{ span: 24 }}
          style={{"margin" : "1rem"}}>
            <Card.Grid className="order--card">

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
              </Card.Grid>
              <Col span={24} style={{ fontSize: '20px', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3C6255'}}><HeartOutlined /></Col>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default OrderList;