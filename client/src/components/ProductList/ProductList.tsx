import { useProductContext } from '../../context/ProductContext';

function ProductList() {
 
  const { products, fetchProducts } = useProductContext();
  
  fetchProducts();

  return (
    <div>
      <h1>Våra Produkter</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <ul>
              {product.images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Product ${product.id} Image ${index}`} style={{'height' : '350px'}} />
                </li>
              ))}
            </ul>
            <p>{product.description}</p>
            {/* <ul>
              {product.price.map((price) => (
                <li key={price.id}>
                  <p></p>
                  <p></p>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;