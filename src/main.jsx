
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </BrowserRouter>
  </StrictMode>
);
