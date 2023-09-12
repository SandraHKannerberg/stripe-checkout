import Home from "../src/pages/Home"
import "./App.css"
import { ProductProvider } from './context/ProductContext.tsx';
import { CustomerProvider } from './context/CustomerContext.tsx';
import { CartProvider } from './context/CartContext.tsx';


function App() {
  return (
    <>
    <CartProvider>
      <CustomerProvider>
        <ProductProvider>
          <Home></Home>
        </ProductProvider>
      </CustomerProvider>
    </CartProvider>
    </>
  )
}

export default App
