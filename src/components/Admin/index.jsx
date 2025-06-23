import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

// Import all admin components
import DashboardComponent from "./Dashboard";
import ListingManagement from "./listing";
import Createcategory from "./Createcategory";
import AdminUsers from "./AdminUsers";
import AdminInquiries from "./AdminInquiries";
import AdminProperties from "./AdminProperties";
import AdminReports from "./AdminReports";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/admin-dashboard":
        return "Dashboard";
      case "/Addproduct":
        return "Property Management";
      case "/Createcategory":
        return "Categories";
      case "/admin/users":
        return "Manage Users";
      case "/admin/inquiries":
        return "Client Inquiries";
      case "/admin/properties":
        return "Property Management";
      case "/admin/reports":
        return "Analytics & Reports";
      default:
        return "Admin Panel";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <AdminNavbar 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={toggleSidebar}
          user={user}
          pageTitle={getPageTitle()}
          onLogout={handleLogout}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* Render content based on current route */}
            {location.pathname === "/admin-dashboard" && <DashboardComponent />}
            {location.pathname === "/Addproduct" && <ListingManagement />}
            {location.pathname === "/Createcategory" && <Createcategory />}
            {location.pathname === "/admin/users" && <AdminUsers />}
            {location.pathname === "/admin/inquiries" && <AdminInquiries />}
            {location.pathname === "/admin/properties" && <AdminProperties />}
            {location.pathname === "/admin/reports" && <AdminReports />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
