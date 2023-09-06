import {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    useEffect,
    Dispatch,
    SetStateAction,
    ReactNode
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
    id: string, //price.........
    quantity: number,
}



interface IProductContext {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    fetchProducts:  () => void,
    cartProducts: CartItem[];
    setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
    addToCart: (id: string) => void;
    getProductQuantity: (id: string) => void;
  }
  

const defaultValues = {
    products: [],
    setProducts: () => {},
    fetchProducts:  () => {},
    cartProducts: [],
    setCartProducts: () => {},
    addToCart: (id : string) => '',
    getProductQuantity: (id: string) => '', 
};
  
export const ProductContext = createContext<IProductContext>(defaultValues);


export const useProductContext = () => useContext(ProductContext);
  
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

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

    //Handle the quantity of every product in the shoppingcart

    function getProductQuantity(id : string) {

        const quantity = cartProducts.find(product => product.id === id)?.quantity //Check the quantity if the product are in the cart

        if (quantity === undefined) {
            return 0;
        }

        return quantity
    }

    function addToCart(id : string) {
        
        const quantity = getProductQuantity(id); //Get the quantity

        if (quantity === 0) {
        //Product is not in cart
        setCartProducts(
            [
                ...cartProducts,
                {
                    id: id,
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

    // Use useEffect to log the updated cart after the state has been updated
    useEffect(() => {
        console.log('Updated Cart:', cartProducts);
    }, [cartProducts]); // This will run whenever the cart state changes


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
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };