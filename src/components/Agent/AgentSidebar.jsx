import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const AgentSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/agent/dashboard",
      icon: "mdi:view-dashboard",
      label: "Dashboard",
    },
    {
      path: "/agent/listings",
      icon: "mdi:home",
      label: "My Listings",
    },
    {
      path: "/agent/add-listing",
      icon: "mdi:plus-circle",
      label: "Add Listing",
    },
    {
      path: "/agent/clients",
      icon: "mdi:account-group",
      label: "Clients",
    },
    {
      path: "/agent/inquiries",
      icon: "mdi:email",
      label: "Inquiries",
    },
    {
      path: "/agent/appointments",
      icon: "mdi:calendar",
      label: "Appointments",
    },
    {
      path: "/agent/reports",
      icon: "mdi:chart-line",
      label: "Reports",
    },
    {
      path: "/agent/settings",
      icon: "mdi:cog",
      label: "Settings",
    },
  ];

  return (
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-0 z-40">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Agent Portal</h2>
        <p className="text-sm text-gray-600">Real Estate Management</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#38B496] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon icon={item.icon} className="mr-3 text-xl" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <Icon icon="mdi:logout" className="mr-3 text-xl" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AgentSidebar; 