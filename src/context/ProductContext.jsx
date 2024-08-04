import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/config";

const ProductContex = createContext();

function ProductsProvider({children}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
      const response = await api.get("/products");
      setProducts(response);
        } catch (error) {
      console.log(error.message);
        }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContex.Provider value={products}>{children}</ProductContex.Provider>
  );
}

const useProducts = () => {
    const products = useContext(ProductContex)
    return products;
}

const useProductDetails = id => {
  const products = useContext(ProductContex)
  const result = products.find(product => product.id ===id)
  return result;
}

export default ProductsProvider;
export {useProducts, useProductDetails}
