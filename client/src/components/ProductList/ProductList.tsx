import { useProductContext } from '../../context/ProductContext';
import AddToCartBtn  from '../AddToCartBtn/AddToCartBtn';
import { Row, Col, Space, Card  } from 'antd';

function ProductList() {
 
  const { products, fetchProducts } = useProductContext();
  
  fetchProducts();

  return (
    <div>
      <h1>Våra Produkter</h1>

      <Row gutter={[16, 16]} style={{'backgroundColor' : 'yellow'}}>
        {products.map((product, index) => (
          <Col key={index} span={6} style={{'backgroundColor' : 'orange'}}>
            <Card>
              <ul>
                {product.images.map((image, index) => (
                  <Space key={index}>
                    <img src={image} alt={`Product ${product.id} Image ${index}`} style={{'height':'300px'}} />
                  </Space>
                ))}
              </ul>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price.unit_amount} {product.price.currency}</p>
            <AddToCartBtn></AddToCartBtn>
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  );
}

export default ProductList;