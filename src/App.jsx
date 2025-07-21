import React from "react";
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet/dist/leaflet.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import Home from "./components/Home";
import Homerealestate from "./components/Homerealestate";
import Cart from "./components/Cart";
import AdminLayout from "./components/Admin/index";
import Createcategory from "./components/Admin/Createcategory";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import About from "./components/About";
import Contact from "./components/Contact";
import { AuthProvider } from "./components/context/AuthContext"; 
import { CartProvider } from "./components/CartContext";
import ProtectedRoute from "./components/contex/ProtectedRoute ";
import Invoice from "./components/Invoice";
import ListingDetails from "./components/listingDetail";
import { IntlProvider } from "react-intl";
import SearchResults from "./components/SearchResults";
import PropertyListing from "./components/listings";
import MapSearchPage from "./components/mapsearch";
import AgentDashboard from "./components/Agent/AgentDashboard";
import AgentListings from "./components/Agent/AgentListings";
import AgentAddListing from "./components/Agent/AgentAddListing";
import AgentClients from "./components/Agent/AgentClients";
import AgentInquiries from "./components/Agent/AgentInquiries";
import AgentReports from "./components/Agent/AgentReports";
import AgentRegister from "./components/Agent/AgentRegister";
import AgentPayment from "./components/Agent/AgentPayment";

// Client Components
import ClientDashboard from "./components/Client/ClientDashboard";
import ClientLogin from "./components/Client/ClientLogin";
import ClientRegister from "./components/ClientRegister";
import ClientInquiryDetail from "./components/Client/ClientInquiryDetail";

// Admin Management Components
import AdminUsers from "./components/Admin/AdminUsers";
import AdminInquiries from "./components/Admin/AdminInquiries";
import AdminProperties from "./components/Admin/AdminProperties";
import AdminReports from "./components/Admin/AdminReports";

import Logout from "./components/Admin/Logout";
import ResetPassword from "./components/ResetPassword";

function App() { 
  return (
    <IntlProvider locale="en">
      <AuthProvider>
        <CartProvider>
          <Routes>      
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} /> 
            <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="/listings" element={<PropertyListing />} />
            <Route path="/map-search" element={<MapSearchPage />} />

            {/* Public Agent Registration Route */}
            <Route path="/agent-register" element={<AgentRegister />} />
            {/* Public Agent Payment Route */}
            <Route path="/agent-payment" element={<AgentPayment />} />

            {/* Client Routes */}
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/client-register" element={<ClientRegister />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/client/inquiry/:id" element={<ClientInquiryDetail />} />

            {/* Protected Admin Routes - All using AdminLayout */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Addproduct" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Createcategory" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/inquiries" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/properties" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              } 
            />

            {/* Protected Agent Routes */}
            <Route 
              path="/agent-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/listings" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentListings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/add-listing" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentAddListing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/clients" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentClients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/inquiries" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentInquiries />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agent/reports" 
              element={
                <ProtectedRoute allowedRoles={['agent']}>
                  <AgentReports />
                </ProtectedRoute>
              } 
            />

            {/* Protected Client Routes */}
            <Route 
              path="/client-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/client/inquiry/:id" 
              element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientInquiryDetail />
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
