import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  category: string;
  images: string[];
  price: number;
  discountPercentage: number;
}

interface CartItem {
  id: number;
  title: string;
  quantity: number;
}

interface ProductListProps {
  products: Product[];  // 👈 Accept products from parent
  onAddToCart: (id: number, title: string, quantity: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  cartItems: CartItem[];
  onDelete: (id: number) => void;                    
  onEdit: (id: number, newTitle: string) => void; 
}

function ProductList({ products, onAddToCart, onIncrement, onDecrement,  cartItems }: ProductListProps) {
  const [search, setSearch] = useState("");

  // 🔹 Filter products by search term
  const searchProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="justify-center text-center">
        <input
          type="text"
          placeholder="searching....."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border border-blue-400"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 p-5 gap-5">
        {searchProduct.length > 0 ? (
          searchProduct.map((product) => {
            const quantity =
              cartItems.find((item) => item.id === product.id)?.quantity || 0;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                category={product.category}
                images={product.images}
                price={product.price}
                discountPercentage={product.discountPercentage}
                onAddToCart={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                quantity={quantity}
                  
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
