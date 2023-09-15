import {
    createContext,
    useContext,
    useState,
    useEffect,
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
  totalPricePerProduct: number
}

export interface Order {
  created: string,
  customer: string,
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
        
        //GET THE QUANTITY
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
        //PRODUCT IS NOT IN CART
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
            //PRODUCT IS ALREADY IN CART
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
        const { url, sessionId } = await response.json()
        localStorage.setItem("session-id", sessionId)
        window.location = url;
    }

    //VERIFY PAYMENT
    const verifyPayment = async () => {

      try {
        //CATCH THE SESSION ID
        const sessionId = localStorage.getItem("session-id")
  
        const response = await fetch("/api/verify-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({sessionId})
          })

          const { verified } = await response.json()
  
          //CHECK IF THE PAYMENT IS VERIFIED
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
          } 

          if ( response.status === 200 ) {

          //CREATE ORDERLIST
          const orderList = orderData.map((order : Order) => ({

            created: order.created,
            customer: order.customer,

            products: order.products.map((product) => ({

              product: product.product,
              price: product.price,
              currency: product.currency,
              quantity: product.quantity,
              totalPricePerProduct: product.totalPricePerProduct

            })),

            totalOrderPrice: order.totalOrderPrice
        }));

        setOrders(orderList);

        }

        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        getOrders()
      }, []);


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
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };