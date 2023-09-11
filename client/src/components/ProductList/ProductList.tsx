import { useProductContext } from '../../context/ProductContext';
import { Row, Col, Space, Card, Button  } from 'antd';
import "./ProductList.css"

function ProductList() {
 
  const { products, addToCart } = useProductContext();

  return (
    <>
      <Row style={{"display":"flex", "justifyContent" : "center"}}>
        {products.map((product, index) => (
          <Col key={index} span={4} 
          xs={{ span: 22 }}
          sm={{ span: 12, offset: 6 }}  
          md={{ span: 8, offset: 4 }}  
          lg={{ span: 4, offset: 2 }}
          style={{"margin" : "1rem"}}>
            <Card className="product--card" style={{"width":"100%", "display":"flex", "justifyContent": "center"}}>
              <ul>
                {product.images.map((image, index) => (
                  <Space key={index}>
                    <img src={image} alt={`Product ${product.id} Image ${index}`} style={{"height":"300px"}} />
                  </Space>
                ))}
              </ul>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price.unit_amount} <span className="currency--text">{product.price.currency}</span></p>
              <Button className="add--to--cart--btn" type="primary" block onClick={() => addToCart(product.price.id, product.name, product.price)}>Lägg till i kundkorgen</Button>
            </Card>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default ProductList;