import { useProductContext } from '../../context/ProductContext';


function ShoppingCart() {

const { cartProducts } = useProductContext();

  return (
    <div>
        <ul>
            {cartProducts.map((cartItem, index) => (
                <li key={index}>
                  <p>{cartItem.id}</p>
                  <p>{cartItem.quantity} st</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ShoppingCart