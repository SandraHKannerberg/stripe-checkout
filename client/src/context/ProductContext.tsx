import {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";


export interface Product {
    id: string,
    name: string,
    price: Price,
    description: string,
    images: [],
    default_price: Price,
  }


export interface Price {
    id: string,
    unit_amount: string,
    currency: string,
}


export interface IProductContext {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    fetchProducts:  () => void,
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
    handlePayment: () => {},

};
  
export const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);
  
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {

    const [products, setProducts] = useState<Product[]>([]);

    //GET ALL PRODUCTS
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


    return (
      <ProductContext.Provider
        value={{
            products,
            setProducts,
            fetchProducts,
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };