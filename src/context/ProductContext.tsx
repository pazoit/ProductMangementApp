import { useContext } from "react";
import { ProductContext } from "../product/ProductProvider";



const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used inside a ProductProvider");
  }
  return context;
};

export default useProduct;