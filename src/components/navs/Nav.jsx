import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext.jsx";
import Logo from "../assets/logo-black.png";
import { Icon } from "@iconify/react";
import searchIcon from "../assets/search.png";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import UnifiedLogin from "../UnifiedLogin";

function Nav() {
  const { cart } = useCart();
  const { 
    user, 
    userType, 
    isAuthenticated, 
    isAdmin, 
    isAgent, 
    isClient, 
    getUserDisplayName, 
    getUserRole, 
    logout,
    getDashboardPath 
  } = useAuth();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [collectMenuOpen, setCollectMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const searchInputRef = useRef(null);

  const phoneNumber = '+250783224032';

  // Scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Focus input when mobile search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Keyboard accessibility for mobile search
  useEffect(() => {
    if (!searchOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
      if (e.key === 'Enter') handleSearch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search-results?query=${searchTerm}`);
      setSearchOpen(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    // Login handled by AuthContext
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const getRoleIcon = () => {
    if (isAdmin()) return "mdi:account-cog";
    if (isAgent()) return "mdi:account-tie";
    if (isClient()) return "mdi:account";
    return "mdi:account";
  };

  const getRoleColor = () => {
    if (isAdmin()) return "text-purple-600";
    if (isAgent()) return "text-blue-600";
    if (isClient()) return "text-green-600";
    return "text-gray-600";
  };

  // Create menu items based on user role
  const getCreateMenuItems = () => {
    const items = [];
    
    if (isAdmin()) {
      items.push(
        { label: "Add Property", icon: "mdi:home-plus", path: "/admin/add-property" },
        { label: "Create Category", icon: "mdi:tag-plus", path: "/admin/create-category" },
        { label: "Add User", icon: "mdi:account-plus", path: "/admin/add-user" },
        { label: "Create Promotion", icon: "mdi:gift", path: "/admin/create-promotion" }
      );
    } else if (isAgent()) {
      items.push(
        { label: "Add Listing", icon: "mdi:home-plus", path: "/agent/add-listing" },
        { label: "Create Report", icon: "mdi:file-plus", path: "/agent/create-report" }
      );
    } else if (isClient()) {
      items.push(
        { label: "Submit Inquiry", icon: "mdi:message-plus", path: "/inquiry" },
        { label: "Create Wishlist", icon: "mdi:heart-plus", path: "/client/wishlist" }
      );
    } else {
      // For non-authenticated users
      items.push(
        { label: "Submit Inquiry", icon: "mdi:message-plus", path: "/inquiry" },
        { label: "Register Account", icon: "mdi:account-plus", path: "/register" }
      );
    }
    
    return items;
  };

  // Collect menu items based on user role
  const getCollectMenuItems = () => {
    const items = [];
    
    if (isAdmin()) {
      items.push(
        { label: "View Reports", icon: "mdi:chart-line", path: "/admin/reports" },
        { label: "User Analytics", icon: "mdi:account-group", path: "/admin/analytics" },
        { label: "Revenue Data", icon: "mdi:cash-multiple", path: "/admin/revenue" },
        { label: "System Logs", icon: "mdi:file-document", path: "/admin/logs" }
      );
    } else if (isAgent()) {
      items.push(
        { label: "Client Inquiries", icon: "mdi:message-text", path: "/agent/inquiries" },
        { label: "Sales Reports", icon: "mdi:chart-bar", path: "/agent/reports" },
        { label: "Client Data", icon: "mdi:account-group", path: "/agent/clients" }
      );
    } else if (isClient()) {
      items.push(
        { label: "My Inquiries", icon: "mdi:message-text", path: "/client/inquiries" },
        { label: "Saved Properties", icon: "mdi:heart", path: "/client/saved" },
        { label: "View History", icon: "mdi:history", path: "/client/history" }
      );
    } else {
      // For non-authenticated users
      items.push(
        { label: "Browse Properties", icon: "mdi:home-search", path: "/listings" },
        { label: "View Map", icon: "mdi:map-search", path: "/map-search" }
      );
    }
    
    return items;
  };

  return (
    <>
      <nav className="bg-white fixed w-full top-0 z-50 left-0 shadow-md">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 animate-bounce flex justify-between right-4 bg-green-500 text-3xl hover:bg-green-600 text-white py-2 px-4 p-6 rounded-full z-[60]"
        >
          <Icon icon="akar-icons:whatsapp-fill" />
        </a>
        
        <div className="text-xs sm:text-sm w-full p-2 bg-[#38B496] text-white text-center">
          {t("saleBanner")}
        </div>

        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-24" />
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors">
              {t("home")}
            </Link>
            <Link to="/listings" className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors">
              Properties
            </Link>
            <Link to="/map-search" className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors flex items-center">
              Map Search
            </Link>
            
            {/* Create Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCreateMenuOpen(!createMenuOpen);
                  setCollectMenuOpen(false);
                }}
                className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors flex items-center"
              >
                <Icon icon="mdi:plus-circle" className="mr-1" />
                Create
                <Icon icon="mdi:chevron-down" className="ml-1 text-sm" />
              </button>
              
              {createMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  <div className="py-2">
                    {getCreateMenuItems().map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setCreateMenuOpen(false)}
                      >
                        <Icon icon={item.icon} className="mr-3 text-[#38B496]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Collect Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCollectMenuOpen(!collectMenuOpen);
                  setCreateMenuOpen(false);
                }}
                className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors flex items-center"
              >
                <Icon icon="mdi:folder-multiple" className="mr-1" />
                Collect
                <Icon icon="mdi:chevron-down" className="ml-1 text-sm" />
              </button>
              
              {collectMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  <div className="py-2">
                    {getCollectMenuItems().map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setCollectMenuOpen(false)}
                      >
                        <Icon icon={item.icon} className="mr-3 text-[#38B496]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors">
              {t("about")}
            </Link>
            <Link to="/contact" className="text-[#38B496] hover:text-[#F15C26] font-medium transition-colors">
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Search Bar */}
            <div className="hidden sm:flex relative items-center">
              <span className="absolute left-3 text-gray-400 pointer-events-none">
                <Icon icon="mdi:magnify" width="22" height="22" />
              </span>
              <input
                ref={searchInputRef}
                className="pl-10 pr-10 py-2 w-64 rounded-full border border-gray-200 bg-gray-100 focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all outline-none shadow-sm text-sm"
                placeholder={t("searchPlaceholder") || "Search for properties..."}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                aria-label="Search properties"
              />
              {searchTerm && (
                <button
                  className="absolute right-8 text-gray-400 hover:text-red-500 focus:outline-none"
                  onClick={() => setSearchTerm("")}
                  tabIndex={0}
                  aria-label="Clear search"
                >
                  <Icon icon="mdi:close-circle" width="20" />
                </button>
              )}
              <button
                className="absolute right-2 text-[#38B496] hover:text-[#F15C26] focus:outline-none"
                onClick={handleSearch}
                aria-label="Search"
              >
                <Icon icon="mdi:magnify" width="22" height="22" />
              </button>
            </div>
            
            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden text-[#38B496] hover:text-[#F15C26] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#38B496]"
              aria-label="Open search"
            >
              <Icon icon="mdi:magnify" width="28" height="28" />
            </button>
            
            {/* Cart */}
            <Link to="/Cart" className="relative text-[#38B496]">
              <Icon icon="mdi-light:cart" width="32" height="32" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F15C26] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* User Menu */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen((open) => {
                      if (!open) setMobileMenuOpen(false);
                      return !open;
                    });
                  }}
                  className="flex items-center space-x-2 text-[#38B496] hover:text-[#F15C26] p-2 rounded-lg"
                >
                  <Icon icon={getRoleIcon()} className={`text-xl ${getRoleColor()}`} />
                  <span className="hidden md:block text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <Icon icon="mdi:chevron-down" className="text-sm" />
                </button>
                
                {/* User Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border ${userMenuOpen ? 'block' : 'hidden'}`}>
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{getUserRole()}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Icon icon="mdi:view-dashboard" className="mr-2" />
                      Dashboard
                    </Link>
                    
                    {isClient() && (
                      <Link
                        to="/client/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Icon icon="mdi:account-edit" className="mr-2" />
                        Profile
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon icon="mdi:logout" className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-[#38B496] text-white px-4 py-2 rounded-lg hover:bg-[#2e9c81] transition-colors flex items-center"
              >
                <Icon icon="mdi:login" className="mr-1" />
                <span className="hidden md:block">Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen((open) => {
                  if (!open) setUserMenuOpen(false);
                  return !open;
                });
              }}
              className="md:hidden p-2 rounded-lg focus:outline-none hover:bg-gray-200"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Animated Dropdown) */}
        <div
          className={`sm:hidden fixed top-0 left-0 w-full z-[70] bg-white shadow-lg transition-transform duration-300 ${searchOpen ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ boxShadow: searchOpen ? '0 4px 24px rgba(56,180,150,0.08)' : 'none' }}
        >
          <div className="flex items-center px-4 py-3 gap-2">
            <span className="text-gray-400">
              <Icon icon="mdi:magnify" width="24" height="24" />
            </span>
            <input
              ref={searchInputRef}
              className="flex-1 px-3 py-2 rounded-full border border-gray-200 bg-gray-100 focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all outline-none shadow-sm text-base"
              placeholder={t("searchPlaceholder") || "Search for properties..."}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search properties"
            />
            {searchTerm && (
              <button
                className="text-gray-400 hover:text-red-500 focus:outline-none"
                onClick={() => setSearchTerm("")}
                tabIndex={0}
                aria-label="Clear search"
              >
                <Icon icon="mdi:close-circle" width="24" />
              </button>
            )}
            <button
              className="text-[#38B496] hover:text-[#F15C26] focus:outline-none px-2"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Icon icon="mdi:magnify" width="24" height="24" />
            </button>
            <button
              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <Icon icon="mdi:close" width="28" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? "block" : "hidden"} bg-white w-full border-t z-[70]`}>
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link to="/" className="text-[#38B496] hover:text-[#F15C26] font-medium">{t("home")}</Link>
            </li>
            <li>
              <Link to="/listings" className="text-[#38B496] hover:text-[#F15C26] font-medium">Properties</Link>
            </li>
            <li>
              <Link to="/map-search" className="text-[#38B496] hover:text-[#F15C26] font-medium flex items-center">
                <Icon icon="mdi:map-search" className="mr-1" />
                Map Search
              </Link>
            </li>
            
            {/* Mobile Create Menu */}
            <li className="w-full">
              <div className="text-center">
                <div className="text-[#38B496] font-medium mb-2 flex items-center justify-center">
                  <Icon icon="mdi:plus-circle" className="mr-1" />
                  Create
                </div>
                <div className="space-y-2">
                  {getCreateMenuItems().map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-sm text-gray-600 hover:text-[#38B496] py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon icon={item.icon} className="mr-2 inline" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            
            {/* Mobile Collect Menu */}
            <li className="w-full">
              <div className="text-center">
                <div className="text-[#38B496] font-medium mb-2 flex items-center justify-center">
                  <Icon icon="mdi:folder-multiple" className="mr-1" />
                  Collect
                </div>
                <div className="space-y-2">
                  {getCollectMenuItems().map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-sm text-gray-600 hover:text-[#38B496] py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon icon={item.icon} className="mr-2 inline" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            
            <li>
              <Link to="/about" className="text-[#38B496] hover:text-[#F15C26] font-medium">{t("about")}</Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#38B496] hover:text-[#F15C26] font-medium">{t("contact")}</Link>
            </li>
            <li><LanguageSwitcher /></li>
            {isAuthenticated() && (
              <li>
                <Link to={getDashboardPath()} className="text-[#38B496] hover:text-[#F15C26] flex items-center font-medium">
                  <Icon icon="mdi:view-dashboard" className="mr-1" />
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Unified Login Modal */}
      <UnifiedLogin 
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Nav;
