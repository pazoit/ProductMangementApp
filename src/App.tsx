import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/axiosProduct/Navbar";

import ProductDetails from "./components/axiosProduct/ProductDetails";
//import ProductSearch from "./components/axiosProduct/ProductSearch";
import ProductList from "./components/axiosProduct/productlist";


interface Product {
  id: number;
  title: string;
  category: string;
  images: string[];
  price: number;
  discountPercentage: number;
}
function App() {
  const [cartItems, setCartItems] = useState<{ id: number; title: string; quantity: number }[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
   const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  // 🔹 Add product to cart
  const handleAddToCart = (id: number, title: string, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, title, quantity }];
    });
  };

    // Fetch products once
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setDisplayedProducts(data.products); // initially show all
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setDisplayedProducts(allProducts); // show all if query empty
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };
  return (
    <Router>
      <Routes>
        {/* Home Page with product list */}
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-8">
              <NavBar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

              <p className="font-bold text-center text-2xl">
                Product Management Platform
              </p>

            
              <ProductList onAddToCart={handleAddToCart} />
            </div>
          }
        />

        {/* Product Details Page */}
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
