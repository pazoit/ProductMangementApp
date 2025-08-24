import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  images: string[];
  price: number;
  discountPercentage: number;
  onAddToCart: (id: number, title: string, quantity: number) => void;
}

function ProductCard({
  id,
  title,
  category,
  images,
  price,
  discountPercentage,
  onAddToCart,
}: ProductCardProps) {
  const [productTitle, setProductTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);



  // const handleSearch = async (query: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  //     const data = await res.json();
  //     setProducts(data.products || []);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // 🔹 Delete product
  const handleDelete = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Deleted product:", data);
      alert(`Product "${productTitle}" deleted successfully!`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔹 Update product title
  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT", // or PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await res.json();
      console.log("Updated product:", data);

      setProductTitle(data.title); // update UI
      setIsEditing(false);
      alert(`Product updated to "${data.title}"`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

   // 🔹 Add to cart (API + local state)
  const handleAddToCart = async () => {
    try {
      // 1. Call parent handler (keeps local cart state in sync)
      onAddToCart(id, productTitle, 1);

      // 2. Call DummyJSON API
      const res = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // simulate logged-in user
          products: [
            {
              id: id,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();
      console.log("Cart updated:", data);

      alert(`"${productTitle}" added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
       <Link to={`/products/${id}`}>
      <img src={images[0]} alt={title} className="h-32 object-contain mb-2" />

      {/* Title (editable) */}
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-1 rounded w-full mb-2"
        />
      ) : (
        <h3 className="font-bold text-lg">{productTitle}</h3>
      )}

      <p className="text-sm text-gray-500">{category}</p>
      <p className="text-green-600 font-semibold">${price}</p>
      <p className="text-xs text-red-500">-{discountPercentage}%</p>
      </Link>
      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
         onClick={handleAddToCart}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          cart
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
