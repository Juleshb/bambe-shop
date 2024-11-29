import React, { useState,useEffect } from "react";
import LoginImg from "./assets/signup-img.webp";
import { useNavigate } from 'react-router-dom'; 
import google from "./assets/google.webp";
import { Link } from "react-router-dom";
import Footer from './navs/Footer';
import Nav from './navs/Nav'
import axios from "axios";




function Login() {
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
 const [password, setpassword] = useState("");
 const navigate = useNavigate(); 
  const handleLogin=async(e)=>{
    e.preventDefault();   
    try{
      const response =await axios.post("http://localhost:4800/api/categories",{
        email, 
        password 
      })
      navigate('/dashboards');

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setmessage(error.response.data.error);  
      } else {
        setmessage(response.data.message);
      }
      console.error("Error:", error.message);
    }
  }
  return (
    <>
{/* include navigations */}
      <Nav/>


      <div className=' w-full flex     md:flex-col-reverse lg:flex-row  ml-10 lg:ml-0 mt-52 lg:mt-10'>
        <img className=' hidden lg:block w-96 lg:w-1/2 lg:h-1/3  ' src={LoginImg}/>

<form onSubmit={handleLogin}>


        <div className='  md:ml-32 flex flex-col justify-center items-center mt-52 '>
          <p className=' text-4xl  mb-4 font-semibold'>Create an account</p>
          <p className=' mb-10'>Enter your details below</p>

          {message && <p className="text-red-500 mb-4">{message}</p>}

           <input 
            onChange={(e)=>setemail(e.target.value)}

           className=' focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80' type='text' placeholder='Email or Phone Number'/><br/>
          <input
                            onChange={(e)=>setpassword(e.target.value)}

          className=' focus:outline-none border-b-2 border-slate-400 pb-1  mb-5 w-80' type='password' placeholder='Password'/><br/>

<div className=' flex justify-around   w-80 text-center '>

            <button type='submit' className=' bg-[#67c066] rounded-md mb-5 p-4 w-32  text-white' to="">Login</button> <br/>

            <Link className=' mt-2 hover:underline' to="/">Forget Password?</Link>

</div>
       

           
        </div>
        </form>

      </div>

<Footer/>



    </>
  
  ) 
}

export default Login