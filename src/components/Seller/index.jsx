import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Product from "./Addproduct";
import Category from "./Createcategory";
import Listings from "./listing";
import DashboardComponent from "./Dashboard";
import Nav from "./nav";
import Logo from "../assets/whitelogo.png";
import Order from "./Order";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardComponent />;
      case "Products":
        return <Product />;
      case "Listings":
        return <Listings/>;
      case "Categories":
        return <Category />;
      case "Orders":
        return <Order />;
      case "Customers":
        return <div>Customers Content</div>;
      case "Account":
        return <div>Account Settings</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    navigate("/Login");
  };

  return (
    <div className="flex flex-col h-screen font-Poppins lg:flex-row">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`
          fixed 
          top-0 
          left-0 
          h-full 
          bg-slate-600
          text-white 
          shadow-md 
          w-52
          transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 
          z-30 
          lg:static 
          lg:translate-x-0 
          lg:w-52
        `}
      >
        <div className="flex items-center justify-between py-6 px-4">
          <div className="flex  items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-24 object-contain"
            />
          </div>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <Icon icon="mdi:close" className="text-2xl" />
          </button>
        </div>

        <nav className="flex-grow space-y-2 px-2">
          {[
            { label: "Dashboard", icon: <DashboardIcon /> },
            { label: "Products", icon: <Inventory2Icon /> },
            { label: "Listings", icon: <BroadcastOnHomeIcon /> },
            { label: "Categories", icon: <CategoryIcon /> },
            { label: "Orders", icon: <GroupIcon /> },
            { label: "Customers", icon: <GroupIcon /> },
            { label: "Account", icon: <AccountCircleIcon /> },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => {
                setActiveTab(label);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
                activeTab === label
                  ? "bg-[#38B496] text-white"
                  : "hover:bg-[#F15C26] hover:text-white"
              }`}
              aria-current={activeTab === label ? "page" : undefined}
            >
              {icon}
              <span className="ml-2">{label}</span>
            </button>
          ))}
          <button
            onClick={handleLogOut}
            className="w-full mx-auto space-y-2 flex items-center gap-4 px-4 py-3 text-sm rounded-md font-medium text-white hover:bg-red-700 hover:text-white transition"
          >
            <LogoutIcon />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </aside>

      <header className="flex items-center justify-between bg-[#38B496] text-white p-4 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none"
          aria-label="Open Sidebar"
        >
          <Icon icon="mdi:menu" className="text-2xl" />
        </button>
        <div className="flex items-center">
          <img src={Logo} className="w-24 h-8 object-contain" alt="Logo" />
        </div>
        <div className="w-8 h-8"></div>
      </header>

      <main className="flex-1 bg-gray-100 h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;