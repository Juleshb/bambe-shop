import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Product from "./Addproduct";
import Category from "./Createcategory";
import DashboardComponent from "./Dashboard";
import Nav from "./nav";
import Logo from "../assets/logo-black.png";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardComponent />;
      case "Products":
        return <Product />;
      case "Categories":
        return <Category />;
      case "Orders":
        return <div>Orders Content</div>;
      case "Customers":
        return <div>Customers Content</div>;
      case "Account":
        return <div>Account Settings</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex h-screen font-Poppins">
      {/* Sidebar */}
      <div className="flex h-full flex-col bg-green-600 xs:w-16 sm:w-20 md:w-64 transition-all">
        {/* Header */}
        <div className="flex flex-col items-center py-4">
          <img src={Logo} alt="Logo" className="w-10 sm:w-16" />
        </div>

        {/* Navigation */}
        <ul className="space-y-1 flex-grow">
          {[
            { label: "Dashboard", icon: <DashboardIcon /> },
            { label: "Products", icon: <Inventory2Icon /> },
            { label: "Categories", icon: <CategoryIcon /> },
            { label: "Orders", icon: <GroupIcon /> }, // Placeholder for Orders
            { label: "Customers", icon: <GroupIcon /> },
            { label: "Account", icon: <AccountCircleIcon /> },
          ].map((tab) => (
            <li key={tab.label}>
              <button
                onClick={() => setActiveTab(tab.label)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.label
                    ? "bg-[#2ac127] text-white"
                    : "text-white hover:bg-[#4bc250] hover:text-gray-900"
                }`}
              >
                <span className="text-lg hidden xxs:block sm:text-2xl">{tab.icon}</span>
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button className="w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-[#4bc250] hover:text-gray-900">
          <LogoutIcon className="text-xl sm:text-2xl" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <Nav />
        <div className="bg-white p-4 mt-4 shadow-md rounded-md">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
