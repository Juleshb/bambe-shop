import React from "react";
import LoginImg from "./assets/signup-img.webp";
import google from "./assets/google.webp";
import { Link } from "react-router-dom";
import Footer from "./navs/Footer";

import Nav from "./navs/Nav";

function Login() {
  return (
    <>
      {/* include navigations */}
      <Nav />

      <div className=" flex justify-center  flex-col mt-24 mb-10 text-center  items-center ">
        <p className=" text-9xl ">404 Not Found</p>
        <p className="  mt-10 mb-5 text-xl ">Your visited page not found. You may go home page.</p>
        <Link className=' bg-[#67c066] rounded-md mb-5 w-80 text-white mt-14 p-5 hover:bg-[#3ccc3a]' to="/">Create Account</Link> <br/>

      </div>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Login;
