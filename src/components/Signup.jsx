import React, { useState } from "react";
import LoginImg from "./assets/signup-img.webp";
import google from "./assets/google.webp";
import { Link } from "react-router-dom";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import axios from "axios";
function Signup() {

  const [message, setmessage] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
const handleSignup=async(e)=>{
    e.preventDefault();   
    try{
      const response =await axios.post("http://localhost:4800/api/register",{
        username,
        email,
        password
      })
      setmessage(response.data.message);

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setmessage(error.response.data.error);  
      } else {
        setmessage("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", error.message);
    }
  }
  return (
    <>
      {/* include navigations */}
      <Nav />

      <div className=" w-full flex mt-10   md:flex-col-reverse lg:flex-row  ml-10 lg:ml-0">
        <img
          className=" hidden lg:block w-96 lg:w-1/2 lg:h-1/3  "
          src={LoginImg}
        />

        <form onSubmit={handleSignup}>
          <div className="  md:ml-32 flex flex-col justify-center items-center ">
            <p className=" text-4xl mb-7 font-semibold">Create an account</p>
            <p className=" mb-3">Enter your details below</p>

            {message && <p className="text-green-500 mb-4">{message}</p>}

            <input
            value={username}
            onChange={(e)=>setusername(e.target.value)}
              className=" focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="text"
              placeholder="Full name"
            />{" "}
            <br />
            <input
               value={email}
               onChange={(e)=>setemail(e.target.value)}
              className=" focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="text"
              placeholder="Email or Phone Number"
            />
            <br />
            <input
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
              className=" focus:outline-none border-b-2 border-slate-400 pb-1  mb-5 w-80"
              type="password"
              placeholder="Password"
            />
            <br />
            <button
              type="submit"

              className=" bg-[#67c066] rounded-md mb-5 p-2 w-80 text-white"
              to=""
            >
              Create Account
            </button>{" "}
            <br />
            <button className=" hover:bg-[#67c066] hover:text-white mb-5 border flex w-80 justify-center items-center text-center p-2 rounded-md">
              <img src={google} />
              <span className=" ml-2">Signup with Google</span>
            </button>
            <p className=" text-slate-800">
              Already have account?{" "}
              <Link className=" underline  ml-2" to="/Login">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Signup;
