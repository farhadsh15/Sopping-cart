import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import CheackoutPage from "./pages/CheackoutPage";
import PageNotFound from "./pages/PageNotFound";
import ProductsProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div>
      <CartProvider>
        <ProductsProvider>
          <Layout>
            <Routes>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<DetailsPage />} />
              <Route path="/cheackout" element={<CheackoutPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </ProductsProvider>
      </CartProvider>
    </div>
  );
}

export default App;
