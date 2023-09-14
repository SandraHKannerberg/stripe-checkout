import { useCartContext } from '../../context/CartContext';
import { Row, Col } from 'antd';


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

              <h3>Ordernummer: {order.created}</h3>
              <p>Kund: {order.customer}</p>
              <p>Totalbelopp: {order.totalOrderPrice}</p>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default OrderList;