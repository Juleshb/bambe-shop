import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import Home from "./components/Home";
import Homerealestate from "./components/Homerealestate";
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
import Invoice from "./components/Invoice";
import ListingDetails from "./components/listingDetail";
import { IntlProvider } from "react-intl";
import SearchResults from "./components/SearchResults";

import Logout from "./components/Seller/Logout";

function App() { 
  return (
    <IntlProvider locale="en">
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
          <Route path="/Invoice" element={<Invoice />} />
          <Route path="/Homerealestate" element={<Homerealestate />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/search-results" element={<SearchResults />} />

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
    </IntlProvider>
  );
}

export default App;
