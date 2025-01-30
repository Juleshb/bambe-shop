import React from "react";
import Logo from "../assets/whitelogo.png";
import buy from "../assets/buy.png";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext.jsx";
import { useContext } from "react";
function Nav() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
 
  return (
    <>
      <div>
      

        <div className="p-4">
  <div className="container mx-auto flex justify-between items-center">
 
     

    <nav class="bg-white  fixed w-full z-20 top-0 start-0 "> 
       <div className="text-lg text-white w-full p-2 bg-[#38B496] text-center flex justify-center items-center">
          <p className="">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
        </div>
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
 
  <img src={Logo} alt="Logo" className="w-20" />

    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
   
    <div className=" flex">
      
    <input className=" border p-2 bg-slate-300 w-72" placeholder="What are you looking for?" type="text"/>
    <img className=" absolute ml-64 mt-3" src={search}/>
    
    <Link to="/Cart">
    <img className=" mt-1 ml-5" src={buy}/>
    <span className="absolute -mt-12 bg-orange-400 w-6 text-center rounded-full ml-10">
                      {totalItems}
                    </span>

            </Link>
   

    </div>
      <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
    <Link to="/" className="text-gray-800 hover:text-green-600">Home</Link>

      <li>
      <Link to="/contact" className="text-gray-800 hover:text-green-600">Contact</Link>
      </li>
      <li>
      <Link to="/about" className="text-gray-800 hover:text-green-600">About</Link>
      </li>
      <li>
      <Link to="/signup" className="text-gray-800 hover:text-green-600">Signup / Login</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>













  </div>
</div>
      </div>
    </>
  );
}

export default Nav;
