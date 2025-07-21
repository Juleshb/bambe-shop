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
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1 min-h-[48px]">
          {/* Left: Hamburger for mobile */}
          <div className="flex items-center md:hidden">
              <button
                onClick={() => {
                setMobileMenuOpen((open) => {
                  if (!open) setUserMenuOpen(false);
                  return !open;
                });
              }}
              className="p-2 rounded focus:outline-none hover:bg-gray-100"
            >
              <Icon icon="mdi:menu" width="28" height="28" />
              </button>
            </div>

          {/* Center: Logo and Links */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            <Link to="/" className="flex items-center justify-center">
              <img src={Logo} alt="Logo" className="w-16 h-16 object-contain" />
                      </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/listings" className="nav-link">Properties</Link>
              <Link to="/map-search" className="nav-link">Map Search</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>

          {/* Right: Cart, Language, Login/User */}
          <div className="flex items-center gap-4">
            <Link to="/Cart" className="relative text-gray-700 hover:text-black">
              <Icon icon="mdi-light:cart" width="28" height="28" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F15C26] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((open) => !open)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-black p-2 rounded-lg"
                >
                  <Icon icon={getRoleIcon()} className={`text-xl ${getRoleColor()}`} />
                  <span className="hidden md:block text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <Icon icon="mdi:chevron-down" className="text-sm" />
                </button>
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
                    {isAgent() && (
                      <Link
                        to="/agent/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Icon icon="mdi:account-tie" className="mr-2" />
                        My Profile
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
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center"
                >
                  <Icon icon="mdi:login" className="mr-1" />
                  <span className="hidden md:block">Login</span>
                </button>
                <Link
                  to="/agent-register"
                  className="bg-[#38B496] text-white px-4 py-2 rounded-lg hover:bg-[#2e9c81] transition-colors font-medium text-sm"
                >
                  Become an Agent
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? "block" : "hidden"} bg-white w-full border-t z-[70]`}>
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/listings" className="nav-link">Properties</Link></li>
            <li><Link to="/map-search" className="nav-link">Map Search</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li><LanguageSwitcher /></li>
            {isAuthenticated() && (
              <li>
                <Link to={getDashboardPath()} className="nav-link">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <style>{`
        .nav-link {
          color: #222;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.25rem 0.5rem;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: #38B496;
        }
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: #38B496;
          transition: width 0.2s;
          margin: 0 auto;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 80%;
        }
      `}</style>
      <UnifiedLogin 
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Nav;
