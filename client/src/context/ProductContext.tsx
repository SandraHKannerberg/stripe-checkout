import {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";


interface Product {
    id: string,
    name: string,
    price: Price,
    description: string,
    images: [],
    default_price: Price,
  }


interface Price {
    id: string,
    unit_amount: string,
    currency: string,
}

interface CartItem {
    id: string, //Just for Stripe
    quantity: number, //Stripe and cart UI
    name: string, //Cart UI
    price: Price, //Cart UI
}


interface IProductContext {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    fetchProducts:  () => void,
    cartProducts: CartItem[];
    setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (id: string, name: string, price: Price) => void;
    getProductQuantity: (id: string) => void;
    cartQuantity: number,
  }
  

const defaultValues = {
    products: [],
    setProducts: () => {},
    fetchProducts:  () => {},
    cartProducts: [],
    setCartProducts: () => {},
    addToCart: () => '',
    getProductQuantity: () => {}, 
    cartQuantity: 0,
};
  
export const ProductContext = createContext<IProductContext>(defaultValues);


export const useProductContext = () => useContext(ProductContext);
  
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

    const fetchProducts = async () => {
        try {
          const response = await fetch(
            "api/products"
          );
          const data = await response.json();

          const productList = data.data.map((product : Product) => ({
            name: product.name,
            description: product.description,
            images: product.images,
            id: product.id,
            price: {
                currency: product.default_price.currency,
                unit_amount: (parseFloat(product.default_price.unit_amount) / 100).toFixed(2),
                id: product.default_price.id
            } 
        }));

        setProducts(productList);
   
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        fetchProducts()
      }, []);


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


    return (
      <ProductContext.Provider
        value={{
            products,
            setProducts,
            fetchProducts,
            cartProducts,
            setCartProducts,
            addToCart,
            getProductQuantity,
            cartQuantity
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };