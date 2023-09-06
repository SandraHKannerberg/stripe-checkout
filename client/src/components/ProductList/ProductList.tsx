import { useEffect, useState } from 'react';

interface Product {
  id: string,
  name: string,
  price: string,
  description: string,
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;