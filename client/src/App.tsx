import Home from "../src/pages/Home"
import Confirmation from "../src/pages/Confirmation.tsx"
import Orders from "./pages/Orders.tsx";
import "./App.css"
import { ProductProvider } from "./context/ProductContext.tsx";
import { CustomerProvider } from "./context/CustomerContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
      <CartProvider>
        <CustomerProvider>
          <ProductProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </ProductProvider>
        </CustomerProvider>
      </CartProvider>
    </BrowserRouter>
    </>
  )
}

export default App
