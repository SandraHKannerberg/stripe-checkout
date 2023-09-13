import {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    Dispatch,
    SetStateAction,
  } from "react";

import { Price } from "./ProductContext";


export interface CartItem {
    id: string, //Just for Stripe
    quantity: number, //Stripe and cart UI
    name: string, //Cart UI
    price: Price, //Cart UI
}


export interface ICartContext {
    cartProducts: CartItem[];
    setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (id: string, name: string, price: Price) => void;
    getProductQuantity: (id: string) => void;
    cartQuantity: number,
    handlePayment: () => void,
}
  

const defaultValues = {
    cartProducts: [],
    setCartProducts: () => {},
    addToCart: () => '',
    getProductQuantity: () => {}, 
    cartQuantity: 0,
    handlePayment: () => {},
};
  
export const CartContext = createContext<ICartContext>(defaultValues);


export const useCartContext = () => useContext(CartContext);
  
export const CartProvider = ({ children }: PropsWithChildren<{}>) => {

  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

    //HANDLE THE QUANTITY OF EVERY CARTITEM IN THE SHOPPINGCART
    function getProductQuantity(id : string) {

        const quantity = cartProducts.find(product => product.id === id)?.quantity //Check the quantity if the product are in the cart

        if (quantity === undefined) {
            return 0;
        }

        return quantity
    }

    //HANDLE ADD TO CART
    function addToCart(
      id: string,
      name: string,
      price: Price
      ) {
        
        const quantity = getProductQuantity(id); //Get the quantity

        if (quantity === 0) {
        //Product is not in cart
        setCartProducts(
            [
                ...cartProducts,
                {
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                }
            ]
        )
        } else {
            //Product is already in cart
            setCartProducts(
                cartProducts.map(
                    product => 
                    product.id === id 
                    ? {...product, quantity: product.quantity + 1}  //if statement is true
                    : product                                       //if statement is false
                )
            )
        }
    }

    const cartQuantity = cartProducts.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      );


    async function handlePayment () {

      const cartToStripe = cartProducts.map(item => ({
        product: item.id,
        quantity: item.quantity
      }))

      console.log("TEST", cartToStripe)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: cartToStripe})
        })

        if(!response.ok) {
            return
        }

        //WE GET THE URL AND SESSION ID. SAVE SESSION ID  IN LOCALSTORAGE
        //WE NEED THE SESSION ID TO BE ABLE TO CALL ON THE VERIFY SESSION FUNCTION
        const { url, sessionId } = await response.json()
        localStorage.setItem("session-id", sessionId)
        window.location = url;
    }

    return (
      <CartContext.Provider
        value={{
            cartProducts,
            setCartProducts,
            addToCart,
            getProductQuantity,
            cartQuantity,
            handlePayment
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };