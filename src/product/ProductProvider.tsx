import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const url = "https://dummyjson.com/products";

export interface Products {
  id:number;
  title: string;
  price: number;
  category: string;
  discountPercentage?: number;
  images: string[];
  
}

interface ContextType {
  products: Products[];
  searchProducts: (query: string) => Promise<void>;
  handleDelete: (id: number)=>void;
   handleUpdate: (id: number, updatedFields: Partial<Products>) => Promise<void>;
}

export const ProductContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    axios
      .get<{ products: Products[] }>(url) // Type Axios response
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const searchProducts = async (query: string) => {
    try {
      const res = await axios.get<{ products: Products[] }>(
        `${url}/search?q=${query}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

    const handleDelete = async (id: number) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });

    // update state in context
    setProducts((prev: any[]) => prev.filter((p) => p.id !== id));
  };
 
  const handleUpdate = async (id: number, updatedFields: Partial<Products>) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!res.ok) throw new Error("Failed to update product");

    const updatedProduct = await res.json();

    // update local state
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );

    console.log(`✅ Product ${id} updated:`, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};


  return (
    <ProductContext.Provider value={{ products, searchProducts, handleDelete, handleUpdate}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;