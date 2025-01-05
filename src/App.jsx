import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Dashboard from "./components/Seller/index";
import Addproduct from "./components/Seller/Addproduct";
import Createcategory from "./components/Seller/Createcategory";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Contact from "./components/Contact";
import { AuthProvider } from "./components/contex/authocontex"; 
import { CartProvider } from "./components/CartContext";
import ProtectedRoute from "./components/contex/ProtectedRoute ";

import Logout from "./components/Seller/Logout";

function App() { 
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>      
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} /> 
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/Contact" element={<Contact />} /> 
          <Route path="/Cart" element={<Cart />} /> 
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route 
            path="/Dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/Addproduct" 
            element={
              <ProtectedRoute>
                <Addproduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/Createcategory" 
            element={
              <ProtectedRoute>
                <Createcategory />
              </ProtectedRoute>
            } 
          />

           <Route path="/*" element={<Notfound />} />
        </Routes> 
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
