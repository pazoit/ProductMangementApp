import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidCartAdd } from "react-icons/bi";

interface ProductCardProps {
  id: number;
  title: string;
  category: string;
  images: string[];
  price: number;
  discountPercentage: number;
  quantity: number; // 👈 comes from ProductList
  onAddToCart: (id: number, title: string, quantity: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  category,
  images,
  price,
  discountPercentage,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [productTitle, setProductTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // 🔹 Add to Cart
  const handleAddToCart = () => {
    onAddToCart(id, productTitle, 1);
    alert(`${productTitle} added to cart!`);
  };

  // 🔹 Delete Product
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

  // 🔹 Update Product Title
  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT", // or PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      const data = await res.json();
      console.log("Updated product:", data);

      setProductTitle(data.title); 
      setIsEditing(false);
      alert(`Product updated to "${data.title}"`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-md hover:shadow-lg transition">
      {/* Product Image */}
      <Link to={`/products/${id}`} className="text-blue-500 hover:underline">
      <img
        src={images[imgIndex]}
        alt={productTitle}
        className="w-full h-40 object-cover rounded-lg"
      />
      </Link>
      {/* Product Info */}
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-1 rounded w-full mt-2"
        />
      ) : (
        <h2 className="text-lg font-bold mt-2">{productTitle}</h2>
      )}

      <p className="text-gray-500 text-sm">{category}</p>
      <p className="text-green-600 font-semibold">${price}</p>
      <p className="text-red-500 text-sm">{discountPercentage}% off</p>

      {/* Product Actions */}
      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-yellow-600"
        >
          Add to Cart   <BiSolidCartAdd className="h-[2rem] w-[2rem] "/>
        </button>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDecrement(id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            -
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            onClick={() => onIncrement(id)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            +
          </button>
        </div>

        {/* View Product */}

       

        {/* Delete Product */}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>

        {/* Edit / Save */}
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
};

export default ProductCard;
