import React from 'react'
import Footer from './navs/Footer'
import Nav from './navs/Nav'
function Contact() {
  return (

    <>
    {/* include navigations */}
    <Nav />

  <div className=" flex w-full mt-52 flex-col-reverse    lg:flex-row  justify-center items-center">
    <div className=" w-full lg:w-2/5  ">
    <div className=" p-10 w-full lg:w-4/5 bg-green-400">
    <div className=' border-b w-80 pb-2'>
    <p className=' text-white font-semibold  text-lg mb-3'>Call To Us</p>
    <p className=' text-white mb-4'>We are available 24/7, 7 days a week.</p>
    <a className=' text-white' href="tel:+250 783 224 032">Phone: +250 783 224 032</a>    
    </div>

    <p className=' text-lg font-semibold text-white'>Write To us</p>
    <p className=' text-white mb-4'>Fill out our form and we will contact you within 24 hours.</p>

    <a className=' text-white mt-2' href="mailto:umuhuza.store@gmail.com">Email: umuhuza.store@gmail.com</a>
    </div>
    </div>
    <div className=" w-10/12  lg:w-1/2 bg-green-500 p-10 ">

    <div className=' flex flex-col justify-center items-center lg:flex-row'>
      <input className=' p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl' placeholder='Your Names'/>
      <input className=' p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl' placeholder='Your Email'/>
      <input className=' p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl' placeholder='Your Phone'/>
    </div>
    <textarea className=' h-28 focus:outline-none text-start p-2 shadow-xl rounded-md w-full mb-5 mt-5' placeholder='Your Message'/>
    <button className=' p-2 bg-green-600 text-white rounded-md '>Send Message</button>
     </div>
  </div>
    

    {/* footer */}
    <Footer />
  </>
  )
}

export default Contact