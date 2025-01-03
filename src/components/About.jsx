import React from "react";
import buypr from "./assets/buypr.png"

import Footer from "./navs/Footer";

import Nav from "./navs/Nav";

function About() {
  return (
    <>
      {/* include navigations */}
      <Nav />

    <div className=" flex w-full mt-52 flex-col-reverse lg:flex-row  justify-center items-center">
      <div className=" w-full lg:w-1/2 ">
      <div className=" p-10 w-full lg:w-10/12 shadow-md shadow-slate-400 lg:shadow-md ">
      <p className=" text-5xl mb-10 font-semibold text-center">Our Story</p>
      <p className=" text-lg">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. 
        Supported by wide range of tailored marketing, data and service solutions, 
        Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
        
        <p className=" text-lg mt-5">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment
           in categories ranging  from consumer.</p>
      </div>
      </div>
      <div className=" w-10/12  lg:w-1/2 ">
      <img className=" rounded-lg shadow-xl shadow-slate-400 lg:shadow-md" src={buypr}/>
      </div>
    </div>
      

      {/* footer */}
      <Footer />
    </>
  );
}

export default About;
