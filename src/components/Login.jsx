import React from 'react'
import LoginImg from "./assets/signup-img.webp";
import google from "./assets/google.webp";
import { Link } from "react-router-dom";
import Footer from './navs/Footer';

import Nav from './navs/Nav'

function Login() {
  return (
    <>
{/* include navigations */}
      <Nav/>


      <div className=' w-full flex     md:flex-col-reverse lg:flex-row  ml-10 lg:ml-0 mt-52 lg:mt-10'>
        <img className=' hidden lg:block w-96 lg:w-1/2 lg:h-1/3  ' src={LoginImg}/>

        <div className='  md:ml-32 flex flex-col justify-center items-center '>
          <p className=' text-4xl mb-7 font-semibold'>Create an account</p>
          <p className=' mb-3'>Enter your details below</p>
           <input className=' focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80' type='text' placeholder='Email or Phone Number'/><br/>
          <input className=' focus:outline-none border-b-2 border-slate-400 pb-1  mb-5 w-80' type='text' placeholder='Password'/><br/>

<div className=' flex justify-around   w-80 text-center '>

            <button className=' bg-[#67c066] rounded-md mb-5 p-4 w-32  text-white' to="">Login</button> <br/>

            <Link className=' mt-2 hover:underline' to="/">Forget Password?</Link>

</div>
       

           
        </div>

      </div>

<Footer/>



    </>
  
  ) 
}

export default Login