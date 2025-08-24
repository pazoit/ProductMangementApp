import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from '../App'
import ProductDetails from '../components/axiosProduct/ProductDetails'

function AppRoute() {
  return (
    
    
     <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:id" element={<ProductDetails/>} />
    </Routes>
    

    
  )
}

export default AppRoute
