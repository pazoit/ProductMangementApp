import React, { useState } from 'react'
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
function SideBar () {

    const [clicked, setClicked] = useState(false);
  return (
    <div className='fixed  left-5 top-25 '>
    <Link
        to="/"
    >
     <IoHome
     onClick={() => setClicked(true)} // 👈 set state once
      className={clicked ? "bg-yellow-500 rounded-full h-10 w-10 p-1 shadow-md" : "bg-white h-10 w-10 p-1 shadow-md rounded-full"}/>
    </Link>
      
    </div>
  )
}

export default SideBar
