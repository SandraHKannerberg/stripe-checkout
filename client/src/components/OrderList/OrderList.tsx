import { useCartContext } from '../../context/CartContext';
import { useEffect } from "react";
import { Row, Col, Card } from 'antd';
import { HeartOutlined } from "@ant-design/icons";
import "./OrderList.css"
import "../../App.css"


function OrderList() {
 
  const { orders, message, getOrders } = useCartContext();

  useEffect(() => {
    getOrders()
  }, []);

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
              <h3>Ordernummer </h3>
              <p>Datum {order.created}</p>
              <p>Totalbelopp {order.totalOrderPrice} SEK</p>
              <br />

              <h4>Order detaljer</h4>
              <ul>
                {order.products.map((product, productIndex) => (
                    <li className="order--details" key={productIndex}>
                      <p>{product.product}</p>
                      <p>{product.quantity} st à {product.price} <span className="currency--letters">{product.currency}</span></p>
                      <p>Totalt {product.totalPricePerProduct} <span className="currency--letters">{product.currency}</span></p>
                      <br />
                    </li>
                ))}
              </ul>

              <p className="customerdetails--order">Dina kunduppgifter</p>
              <p>Namn: {order.customer}</p>
              <p>E-mail: {order.email}</p>
              <br />
              </Card.Grid>
              <Col span={24} style={{ fontSize: '20px', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3C6255'}}><HeartOutlined /></Col>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default OrderList;