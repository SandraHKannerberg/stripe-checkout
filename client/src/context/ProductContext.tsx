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
    price: DefaultPrice,
    description: string,
    images: [],
  }


interface DefaultPrice {
    id: string,
    unit_amount: number,//math()
    currency: string,
}


interface IProductContext {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    fetchProducts:  () => void,
  }
  

const defaultValues = {
    products: [],
    setProducts: () => {},
    fetchProducts:  () => {},
};
  
export const ProductContext = createContext<IProductContext>(defaultValues);
  
export const useProductContext = () => useContext(ProductContext);
  
export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
    const [products, setProducts] = useState<Product[]>([]);

    //BYGG PÅ MED FUNKTIONER HÄR!!!!!!!!

    function fetchProducts() {
        useEffect(() => {
            fetch('api/products')
              .then((response) => response.json())
              .then((data) => setProducts(data.data))
              .catch((error) => {
                console.error('Error fetching products:', error);
              })
          }, []);
    }
    
    return (
      <ProductContext.Provider
        value={{
            products,
            setProducts,
            fetchProducts
        }}
      >
        {children}
      </ProductContext.Provider>
    );
  };