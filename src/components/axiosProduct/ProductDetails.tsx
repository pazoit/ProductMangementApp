import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaCartArrowDown } from "react-icons/fa6";
// import SideBar from "./SideBar";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
  
}

interface ProductDetailsProps {
  cartCount: number;
 
}
function ProductDetails({ cartCount }: ProductDetailsProps) {
  
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  // 🔹 Fetch single product
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  // 🔹 Handle Delete
  const handleDelete = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Deleted product:", data);

      alert(`Product "${product?.title}" deleted successfully!`);
      navigate("/"); // redirect back to home
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;




  return (
    <div  className="flex flex-col">
      <Navbar cartCount={cartCount} /> 
      <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-64 object-contain mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-green-600 font-semibold text-lg">${product.price}</p>
        <p className="text-xs text-red-500">-{product.discountPercentage}%</p>
        <p className="text-sm">⭐ {product.rating} | Stock: {product.stock}</p>
        <div className=" flex gap-5">
                <button onClick={handleDelete}
                className="mt-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Delete Product
                </button>
                <button
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                  cart <FaCartArrowDown className=""/>
                </button>
        </div>
      </div>
       
    </div>
    
  );
}

export default ProductDetails;
