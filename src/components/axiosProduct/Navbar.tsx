import React, { useEffect, useRef, useState } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { FiUser } from "react-icons/fi";
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

interface NavBarProps {
  cartCount: number;
    // carts: { id: number; title: string; quantity: number }[];
    
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

interface Cart {
  id: number;
  total: number;
  totalQuantity: number;
  products: CartProduct[];
}


function Navbar({ cartCount = 0 }: NavBarProps) {

   const [carts, setCarts] = useState<Cart[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
 const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userId = 1;

  useEffect(() => {
    fetch(`https://dummyjson.com/carts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched carts:", data.carts);
        setCarts(data.carts || []);
      })
      .catch((err) => console.error("Error fetching carts:", err));
  }, []);

    // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <div className="flex justify-end items-center shadow-md h-[4rem]">
        <nav className="flex justify-between w-[10rem] h-[4rem] p-3">
          <div className="relative  focus:outline-none"
             onClick={() => setIsCartOpen((prev) => !prev)}
          >
         
          <TiShoppingCart className="h-[2rem] w-[2rem] bg-gray-400 text-gray-500 rounded-full p-1" />
            <p className="bg-yellow-600 absolute w-[1.5rem] h-[1.5rem] flex items-center justify-center text-white text-xs font-bold rounded-full top-0 right-0">
              {cartCount}
            </p>
              {isCartOpen && (
              <div
                ref={cartRef}
                className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-3 z-50"
              >
                <h4 className="font-bold border-b pb-1 mb-2">Cart Details</h4>
                {carts.length > 0 ? (
                  carts.map((cart) => (
                    <div key={cart.id} className="mb-4">
                      <p className="font-semibold text-sm mb-1">
                        Cart #{cart.id} – {cart.totalQuantity} items
                      </p>
                      <ul className="pl-4 text-xs text-gray-600">
                        {cart.products.map((p) => (
                          <li key={p.id}>
                            {p.title} x {p.quantity} (${p.total})
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-right font-semibold text-gray-800 mt-1">
                        Total: ${cart.total}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No carts available</p>
                )}
              </div>
            )}
          </div>
           
          
          <div>
              <FiUser className="h-[2rem] w-[2rem] bg-gray-400 text-gray-500 rounded-full p-1"   onClick={() => setIsUserMenuOpen((prev) => !prev)}/>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-gray-100 rounded"
                >
                  <span className='font-semibold text-gray-500'>Logout</span><IoIosLogOut className='text-gray-500'/>
                </button>
              </div>
            )}
          </div>
          
        </nav>
      </div>
      <SideBar />
    </div>
  );
}


export default Navbar
