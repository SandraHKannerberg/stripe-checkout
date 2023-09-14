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
    id: string, //Just for Stripe
    quantity: number, //Stripe and cart UI
    name: string, //Cart UI
    price: Price, //Cart UI
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
    cartQuantity: number,
    handlePayment: () => void,
    isPaymentVerified: boolean,
    verifyPayment: () => void,
    orders: Order[];
    setOrders: Dispatch<SetStateAction<Order[]>>;
}

const defaultValues = {
    cartProducts: [],
    setCartProducts: () => {},
    addToCart: () => '',
    getProductQuantity: () => {}, 
    cartQuantity: 0,
    handlePayment: () => {},
    isPaymentVerified: false,
    verifyPayment: () => {},
    orders: [],
    setOrders: () => {},
};
  
export const CartContext = createContext<ICartContext>(defaultValues);


export const useCartContext = () => useContext(CartContext);
  
export const CartProvider = ({ children }: PropsWithChildren<{}>) => {

  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [isPaymentVerified, setIsPaymentverified] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

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

    const verifyPayment = async () => {

      try {
        const sessionId = localStorage.getItem("session-id")
  
        const response = await fetch("/api/verify-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({sessionId})
          })
  
          const { verified } = await response.json()
  
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

    const getOrders = async () => {
  
        try {
          const response = await fetch(
            "api/orders"
          );
          const orderData = await response.json();
          console.log(orderData); //Check på att vi får tillbaka ordern i consolen

          //CHECKA KUNDNAMN SÅ ATT RÄTT ORDER VISAS FÖR RÄTT KUND!!!!!!!

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
        console.log(orderList)
   
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
            cartQuantity,
            handlePayment,
            isPaymentVerified,
            verifyPayment,
            orders,
            setOrders
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };