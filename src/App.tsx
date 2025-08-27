import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/axiosProduct/Navbar";
import ProductDetails from "./components/axiosProduct/ProductDetails";
import ProductList from "./components/axiosProduct/productlist";
import Login from "./components/axiosProduct/Login";



// --- Protected Route Component ---
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" />;
}
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

  // 🔹 Increment quantity
  const handleIncrement = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🔹 Decrement quantity (remove if it goes to 0)
  const handleDecrement = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🔹 Fetch products once
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setDisplayedProducts(data.products); // initially show all
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);


// 🔹 Delete product
const handleDelete = async (id: number) => {
  try {
    await fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" });
    // update state so UI reflects deletion
    setAllProducts((prev) => prev.filter((p) => p.id !== id));
    setDisplayedProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

// 🔹 Edit product (example: update title)
const handleEdit = async (id: number, newTitle: string) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    const updated = await res.json();

    // update state so UI shows new title
    setAllProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: updated.title } : p))
    );
    setDisplayedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: updated.title } : p))
    );
  } catch (err) {
    console.error("Update failed:", err);
  }
};

  // 🔹 Search handler
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
           {/* 🔹 Login Page */}
         <Route path="/login" element={<Login />} />
        {/* Home Page with product list */}
        <Route
          path="/"
          element={

            <ProtectedRoute>
            <div className="flex flex-col gap-8">
              <NavBar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

              <p className="font-bold text-center text-2xl">
                Product Management Platform
              </p>

              {/* 🔹 Pass cart quantities & actions */}

              <ProductList
                products={displayedProducts}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDelete}   
                onEdit={handleEdit} 
              />
            </div>
            </ProtectedRoute>
          }
        />

        {/* Product Details Page */}
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
            <ProductDetails
              cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
