import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from './context/ProductContext.tsx';
import { CustomerProvider } from './context/CustomerContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomerProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CustomerProvider>
  </BrowserRouter>
);
