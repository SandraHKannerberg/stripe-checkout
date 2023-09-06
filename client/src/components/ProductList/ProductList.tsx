import { useProductContext } from '../../context/ProductContext';

function ProductList() {
 
  const { products, fetchProducts } = useProductContext();
  
  fetchProducts();

  return (
    <div>
      <h1>Våra Produkter</h1>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price.unit_amount} {product.price.currency}</p>
            <ul>
              {product.images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Product ${product.id} Image ${index}`} style={{'height':'350px'}} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default ProductList;