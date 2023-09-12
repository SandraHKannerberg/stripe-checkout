import Home from "../src/pages/Home"
import Confirmation from "../src/pages/Confirmation.tsx"
import "./App.css"
import { ProductProvider } from "./context/ProductContext.tsx";
import { CustomerProvider } from "./context/CustomerContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <CartProvider>
      <CustomerProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </ProductProvider>
      </CustomerProvider>
    </CartProvider>
    </>
  )
}

export default App
