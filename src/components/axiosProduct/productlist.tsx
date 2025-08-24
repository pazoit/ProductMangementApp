import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  category: string;
  images: string[];
  price: number;
  discountPercentage: number;
}

interface ProductListProps {
  onAddToCart: (id: number, title: string, quantity: number) => void;
}

function ProductList({ onAddToCart }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search ,setSearch] = useState('')

  // Fetch products from DummyJSON
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data.products || []); // API returns { products: [...] }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 

 const searchProduct = products.filter(product =>product.title.toLowerCase().includes(search.toLowerCase()))
  if (loading) {
    return <p className="p-5 text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="">
       <div className="justify-center text-center ">
        <input type="text"
        placeholder="searching....."
        value={search}  
        onChange={(e)=>setSearch(e.target.value)}
        className="p-2 rounded border border-blue-400"/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 p-5 gap-5">

      
     
      {searchProduct.length > 0 ? (
        searchProduct.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            images={product.images}
            price={product.price}
            discountPercentage={product.discountPercentage}
            onAddToCart={onAddToCart}
          />
        ))
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
