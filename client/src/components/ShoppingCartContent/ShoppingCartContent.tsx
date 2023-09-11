import { useProductContext } from '../../context/ProductContext';
import "./ShoppingCartContent.css"

function ShoppingCartContent() {

const { cartProducts } = useProductContext();

  return (
    <>
      <ul className="shoppingcart--content--list">
        {cartProducts.map((cartItem, index) => (
          <li key={index} className="shoppingcart--content--listitem">
            <h3>{cartItem.name}</h3>
            <p>{cartItem.quantity} st à {cartItem.price.unit_amount} <span className="currency--text">{cartItem.price.currency}</span></p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ShoppingCartContent