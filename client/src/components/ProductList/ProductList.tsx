import { useProductContext } from '../../context/ProductContext';
import { useCartContext } from '../../context/CartContext';
import { Row, Col, Space, Card, Button  } from 'antd';
import "./ProductList.css"

function ProductList() {
 
  const { products } = useProductContext();
  const { addToCart } = useCartContext();

  const gridStyle: React.CSSProperties = {
    width: "100%",
    textAlign: "center",
    marginBottom: "2rem"
  };

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
            <Card.Grid className="product--card" style={gridStyle}>
              <ul>
                {product.images.map((image, index) => (
                  <Space key={index}>
                    <img src={image} alt={`Product ${product.id} Image ${index}`} style={{"height":"300px", "marginTop":"1rem"}} />
                  </Space>
                ))}
              </ul>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price.unit_amount} <span className="currency--letters">{product.price.currency}</span></p>
              <Button className="btn--text add--to--cart--btn" type="primary" onClick={() => addToCart(product.price.id, product.name, product.price)}>Lägg till i kundkorgen</Button>
            </Card.Grid>
          </Col>
        ))}
      </Row>

    </>
  );
}

export default ProductList;