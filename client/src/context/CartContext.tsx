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
    id: string,
    quantity: number,
    name: string,
    price: Price,
}

export interface OrderItem {
  product: string,
  price: number,
  currency: string,
  quantity: number,
  totalPricePerProduct: number,
  discount: number,
}

export interface Order {
  created: string,
  customer: string,
  email: string,
  products: OrderItem[],
  totalOrderPrice: number
}

export interface ICartContext {
    cartProducts: CartItem[];
    setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (id: string, name: string, price: Price) => void;
    getProductQuantity: (id: string) => void;
    calculateTotalPrice: () => void,
    cartQuantity: number,
    handlePayment: () => void,
    isPaymentVerified: boolean,
    verifyPayment: () => void,
    orders: Order[];
    setOrders: Dispatch<SetStateAction<Order[]>>;
    message: string,
    setMessage: Dispatch<SetStateAction<string>>,
    getOrders: () => void,
}

const defaultValues = {
    cartProducts: [],
    setCartProducts: () => {},
    addToCart: () => "",
    getProductQuantity: () => {},
    calculateTotalPrice: () => {},
    cartQuantity: 0,
    handlePayment: () => {},
    isPaymentVerified: false,
    verifyPayment: () => {},
    orders: [],
    setOrders: () => {},
    message: "",
    setMessage: () => {},
    getOrders: () => {},
};
  
export const CartContext = createContext<ICartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);
  
export const CartProvider = ({ children }: PropsWithChildren<{}>) => {

  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [isPaymentVerified, setIsPaymentverified] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  //HANDLE THE QUANTITY OF EVERY CARTITEM IN THE SHOPPINGCART
  function getProductQuantity(id : string) {

    //Check the quantity if the product are in the cart
    const quantity = cartProducts.find(product => product.id === id)?.quantity 

      if (quantity === undefined) {
        return 0;
      }

    return quantity
  }

  //HANDLE ADD TO CART
  function addToCart(id: string, name: string, price: Price) {
        
    //Get the quantity
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
    //If product not in cart
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
          //If product already in cart
          setCartProducts(
            cartProducts.map(
              product => 
              product.id === id 
              ? {...product, quantity: product.quantity + 1}
              : product                                     
            )
          )
      }
    }

  //TOTALPRICE
  function calculateTotalPrice() {
    let total = 0;
    for (const item of cartProducts) {

        const priceNumeric = parseFloat(item.price.unit_amount);
        if (!isNaN(priceNumeric)) {
          total += priceNumeric * item.quantity;
        }
          
    }
    return total;
  }

  //COUNT THE CARTQUANTITY
    const cartQuantity = cartProducts.reduce(
      (quantity, item) => item.quantity + quantity,
      0
    );

  //HANDLE PAYMENT
  async function handlePayment () {

    const cartToStripe = cartProducts.map(item => ({
      product: item.id,
      quantity: item.quantity
    }))

    const response = await fetch("https://stripe-checkout-sandra.onrender.com/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({items: cartToStripe})
      })

      if(!response.ok) {
            return
        }

      //Save session id to localStorage
      const { url, sessionId } = await response.json()
      localStorage.setItem("session-id", sessionId)
      window.location = url;
    }

  //VERIFY PAYMENT
  const verifyPayment = async () => {

    try {
      const sessionId = localStorage.getItem("session-id")
  
      const response = await fetch("https://stripe-checkout-sandra.onrender.com/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({sessionId})
        })

        const { verified } = await response.json()
  
        //Check if payment is verified
        if (verified) {
          setIsPaymentverified(true)
          localStorage.removeItem("session-id")
          } else {
            setIsPaymentverified(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    //SHOW THE LOGGED IN CUSTOMER ORDERS
    const getOrders = async () => {
  
      try {
        const response = await fetch(
          "api/orders"
        );
        const orderData = await response.json();

        if (response.status === 203) {
          setMessage("Du har inte handlat hos oss än. Se din orderhistorik här fr.o.m din första order")
          setOrders([]);
        } 

        if ( response.status === 200 ) {

          setMessage("")

        //Create orderlist
        const orderList = orderData.map((order : Order) => ({

          created: order.created, 
          customer: order.customer,
          email: order.email,

          products: order.products.map((product) => ({
            product: product.product,
            price: product.price,
            currency: product.currency,
            quantity: product.quantity,
            discount: product.discount !== 0 ? product.discount : undefined,
          })),

          totalOrderPrice: order.totalOrderPrice
      }));

      const sortedOrderList = orderList.slice().sort((a:Order, b:Order) => {
        //Convert the 'created' string to Date object
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
      
        //Sort the list - newest order first
        return dateB - dateA;
      });

      setOrders(sortedOrderList);
      }

      } catch (err) {
        console.log(err);
      }
    };

    return (
      <CartContext.Provider
        value={{
            cartProducts,
            setCartProducts,
            addToCart,
            getProductQuantity,
            calculateTotalPrice,
            cartQuantity,
            handlePayment,
            isPaymentVerified,
            verifyPayment,
            orders, setOrders,
            message, setMessage,
            getOrders,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };