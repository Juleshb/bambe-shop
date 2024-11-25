import React from "react";
import Logo from "../assets/logo-black.png";
import buy from "../assets/buy.png";
import search from "../assets/search.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <div>
        <div className="text-lg text-white w-full p-2 bg-[#2ac127] text-center flex justify-center items-center">
          <p className="">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
        </div>

        <div className="p-4">
  <div className="container mx-auto flex justify-between items-center">
    <img src={Logo} alt="Logo" className="w-20" />

    <nav className="flex space-x-24">
      <Link to="/" className="text-gray-800 hover:text-green-600">Home</Link>
      <Link to="/contact" className="text-gray-800 hover:text-green-600">Contact</Link>
      <Link to="/about" className="text-gray-800 hover:text-green-600">About</Link>
      <Link to="/signup" className="text-gray-800 hover:text-green-600">Signup</Link>
    </nav>
    
    <div className=" flex">
      
    <input className=" border p-2 bg-slate-300 w-72" placeholder="What are you looking for?" type="text"/>
    <img className=" absolute ml-64 mt-3" src={search}/>
    <img className=" mt-1 ml-5" src={buy}/>




    </div>

  </div>
</div>
      </div>
    </>
  );
}

export default Nav;
