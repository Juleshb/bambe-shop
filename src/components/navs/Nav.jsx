import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext.jsx";
import Logo from "../assets/logo-black.png";
import { Icon } from "@iconify/react";
import search from "../assets/search.png";

function Nav() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const phoneNumber = '+250792445913';

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 shadow-md">
    <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 animate-bounce flex justify-between right-4 bg-green-500 text-3xl hover:bg-green-600 text-white py-2 px-4 p-6 rounded-full z-10"
              >
             {/* <p className="text-sm m-2 md:hidden">Contact our support team</p>  */}
              <Icon icon="akar-icons:whatsapp-fill" />
              </a>
      <div className="text-xs sm:text-sm w-full p-2 bg-[#38B496] text-white text-center">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-24" />
        </Link>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex">
            <input
              className="border p-2 bg-gray-200 w-64 rounded-md focus:outline-none"
              placeholder="What are you looking for?"
              type="text"
            />
            <img className="absolute right-2 top-2 w-5" src={search} alt="Search" />
          </div>

          <Link to="/Cart" className="relative text-[#38B496]">
          <Icon icon="mdi-light:cart" width="32" height="32" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F15C26] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
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
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
    <Link to="/" className="text-[#38B496] hover:text-[#F15C26]">Home</Link>

      <li>
      <Link to="/contact" className="text-[#38B496] hover:text-[#F15C26]">Contact</Link>
      </li>
      <li>
      <Link to="/about" className="text-[#38B496] hover:text-[#F15C26]">About</Link>
      </li>
      <li>
      <Link to="/signup" className="text-[#38B496] hover:text-[#F15C26]">Signup / Login</Link>
      </li>
    </ul>
  </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ${menuOpen ? "block" : "hidden"} bg-white w-full`}>
        <ul className="flex flex-col items-center space-y-4 py-4">
          <li>
            <Link to="/" className="text-[#38B496] hover:text-[#F15C26]">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="text-[#38B496] hover:text-[#F15C26]">Contact</Link>
          </li>
          <li>
            <Link to="/about" className="text-[#38B496] hover:text-[#F15C26]">About</Link>
          </li>
          <li>
            <Link to="/signup" className="text-[#38B496] hover:text-[#F15C26]">Signup / Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
