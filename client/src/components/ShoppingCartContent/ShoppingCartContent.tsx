import { useCartContext } from "../../context/CartContext";
import "./ShoppingCartContent.css"
import { useEffect, useState } from "react";
import { Row } from "antd";

function ShoppingCartContent() {

const { cartProducts, calculateTotalPrice } = useCartContext();
const [totalPrice, setTotalPrice] = useState(0);

useEffect(()=> {
  const price = calculateTotalPrice();
    if (typeof price === 'number' && !isNaN(price)) {
      setTotalPrice(price);
    } else {
      console.error('Price is not a valid number:', price);
    }
}, [calculateTotalPrice])

  return (
    <>
      <ul className="shoppingcart--content--list">
        {cartProducts.map((cartItem, index) => (
          <li key={index} className="shoppingcart--content--listitem">
            <h3>{cartItem.name}</h3>
            <p>{cartItem.quantity} st à {cartItem.price.unit_amount} <span className="currency--letters">{cartItem.price.currency}</span></p>
          </li>
        ))}
      </ul>

      <Row style={{height: "2rem", marginTop: "3rem", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem"}}>
        <h4>TOTALT </h4>
        <h4>{totalPrice} SEK</h4>
      </Row>
    </>
  )
}

export default ShoppingCartContent