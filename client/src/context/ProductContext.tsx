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
    product: string, //price.........
    quantity: number,
}



interface IProductContext {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    fetchProducts:  () => void,
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (productId: string) => void;
  }
  

const defaultValues = {
    products: [],
    setProducts: () => {},
    fetchProducts:  () => {},
    cart: [],
    setCart: () => {},
    addToCart: (productId: string) => '',
};
  
export const ProductContext = createContext<IProductContext>(defaultValues);
  
export const useProductContext = () => useContext(ProductContext);
  
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    //BYGG PÅ MED FUNKTIONER HÄR!!!!!!!!

    async function fetchProducts() {

        const response = await fetch (
            'http://localhost:3000/api/products'
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
    }

    useEffect(() => {
        fetchProducts()
      }, []);

    function addToCart(productId:string) {
        
        console.log(productId)

        // const itemInCart = cart.find((item) => item.product === productId);

        // if(itemInCart) {
        //     setCart((prevCart) =>
        //     prevCart.map((item) =>
        //         item.product === productId
        //         ? {...item, quantity: item.quantity + 1}
        //         :item
        //     )
        // );
        // }
        // console.log(cart)
    }

      // Use useEffect to log the updated cart after the state has been updated
    useEffect(() => {
        console.log('Updated Cart:', cart);
    }, [cart]); // This will run whenever the cart state changes


    return (
      <ProductContext.Provider
        value={{
            products,
            setProducts,
            fetchProducts,
            cart,
            setCart,
            addToCart,
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };