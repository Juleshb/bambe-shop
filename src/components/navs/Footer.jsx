import React from 'react'
import Logo from "../assets/logo-black.png";
import Qrcode from "../assets/Qrcode.png";
import Vector1 from "../assets/Vector1.png";
import Vector2 from "../assets/Vector2.png";
import Vector3 from "../assets/Vector3.png";
import Vector4 from "../assets/Vector4.png";

import delivery from "../assets/delivery.png";
import money from "../assets/money.png";
import Services from "../assets/Services.png";


function Footer() {
  return (
    <>
    <div className=' flex justify-center items-center  w-full'>
<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-14 '>

<div className=' mt-5 lg:mt-20 lg:mb-20 flex flex-col w-full justify-center items-center'>
  <img className=' w-14 mb-2' src={delivery}/>
  <p className=' font-bold'>FREE AND FAST DELIVERY</p>
  <p>Free delivery for all orders over $140</p>
</div>

<div className=' mt-10 lg:mt-20 lg:mb-20 flex flex-col w-full justify-center items-center'>
  <img className=' w-14 mb-2' src={Services}/>
  <p className=' font-bold'>24/7 CUSTOMER SERVICE</p>
  <p>Friendly 24/7 customer support</p>
</div>

<div className='mt-10 lg:mt-20 lg:mb-20 mb-10 flex flex-col w-full justify-center items-center'>
  <img className=' w-14 mb-2' src={money}/>
  <p className=' font-bold'>MONEY BACK GUARANTEE</p>
  <p>We reurn money within 30 days</p>
</div>




<div></div>
<div></div>

</div>
 </div>



    <div className='bg-[#3ccc3a] w-full flex justify-center '>
    <div className=' p-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:gap-32  text-white '>

      <div className='lg:pl-10'>
        <img src={Logo}/>
        <p className=' text-xl text-white mb-5'>Subscribe</p>
        <p className=' mb-5'>Get 10% off your order</p>
        <input className=' bg-transparent border rounded-md text-slate-700 p-2 focus:outline-none' placeholder='Enter your email '/>
      </div>

      <div>
        <p className=' text-xl text-white mb-5'>Support</p>
        <p className=' mb-5'>KGL stret 121</p>
        <p className=' mb-5'>bambeshop@gmail.com</p>
        <p className=' mb-5'>+25078444444</p>
      </div>
     
      <div>
        <p className=' text-xl text-white mb-5'>Account</p>
        <p className=' mb-5'>My account</p>
        <p className=' mb-5'>Login/ Register</p>
        <p className=' mb-5'>Cart</p>
        <p className=' mb-5'>Wishlist</p>
        <p className=' mb-5'>Shop</p>
      </div>
      
      <div>
        <p className=' text-xl text-white mb-5'>Quick Link</p>
        <p className=' mb-5'>Privacy Policy</p>
        <p className=' mb-5'>Team Of Use</p>
        <p className=' mb-5'>FAQ</p>
        <p className=' mb-5'>Contact</p>
      </div>
     
      <div>
        <p className=' text-xl text-white mb-5'>Download App</p>
        <p className=' mb-5'>Save $3 with App New User Only</p>

        <img src={Qrcode}/>

        <div className=' flex  mt-3 w-52 justify-evenly items-center'>
        <img src={Vector1}/>
        <img src={Vector2}/>
        <img src={Vector3}/>
        <img src={Vector4}/>


        </div>
        
      </div>
     


    </div>
     </div>
    </>

    

  )

}


export default Footer