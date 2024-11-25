import React from 'react'
import Footer from './navs/Footer'
import Nav from './navs/Nav'
import { Link } from 'react-router-dom'

import bgimage from "./assets/bgimage.png"
import iphonelogo from "./assets/iphonelogo.png"
import arrowright from "./assets/arrow-right.png"
import icons_arrow_left from "./assets/icons_arrow_left.png"
import icons_arrow_right from "./assets/arrow-right.png"
import star from "./assets/star.png"
import emptystar from "./assets/emptystar.png"

import Frame1 from "./assets/Frame1.png"


function Home() {
  return (
<>
<Nav/>

<div className=' pl-48 mr-48'>

  

{/* Ads section */}

<div className=' flex w-full  justify-between'>

<div className=' flex flex-col w-80 border-r-2 '>
  <Link className=' mb-4' to="/">Woman’s Fashion</Link>
  <Link className=' mb-4' to="/">Men’s Fashion</Link>
  <Link className=' mb-4' to="/">Electronics</Link>
  <Link className=' mb-4' to="/">Home & Lifestyle</Link>
  <Link className=' mb-4' to="/">Medicine</Link>
  <Link className=' mb-4' to="/">Sports & Outdoor</Link>
  <Link className=' mb-4' to="/">Baby’s & Toys</Link>
  <Link className=' mb-4' to="/">Groceries & Pets</Link>
  <Link className=' mb-4' to="/">Health & Beauty</Link>
</div>

<div className=' w-3/4  flex  justify-evenly  mb-3  bg-black text-white'>
  <div className=' p-10 flex flex-col'>
    <div className='  flex justify-center text-center space-x-5 text-xl items-center'>
        <img src={iphonelogo} />
      <p>iPhone 14 Series</p>
    </div>
    
      <p className=' text-4xl mt-10 mb-6'>Up to 10% <br/> off Voucher</p>
      <div className=' flex'>
         <Link className=' underline text-lg' to="/">Shop Now</Link>
         <img className=' ml-2' src={arrowright}/>
      </div>
     
  </div>
  <div>
    <img src={bgimage} />
  </div>
</div>
</div>

 
 <div>
{/* Flash seles  */}
<div className=' flex justify-stretch w-full mt-10'>
  <div className=' w-1/2'>
    <p className=' font-bold'>To day</p>
    <p className=' font-semibold text-2xl'>Flash Sales</p>
  </div>
  <div className=' w-1/2  flex justify-end'>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full mr-4' src={icons_arrow_left}/>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full' src={icons_arrow_right}/>
  </div>
  <div>
  </div>
</div>

<div className=' w-full  flex '>
<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32'>



<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>





</div>

</div>
<div className=' flex justify-center items-center mb-10'>
<button className=' bg-[#3ba139] w-60 rounded-md text-white p-3'>View All Products</button>
</div>
</div> 
 
 <div>
{/* Flash seles  */}
<div className=' flex justify-stretch w-full mt-10'>
  <div className=' w-1/2'>
    <p className=' font-bold'>Categories</p>
    <p className=' font-semibold text-2xl'>Browse By Category</p>
  </div>
  <div className=' w-1/2  flex justify-end'>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full mr-4' src={icons_arrow_left}/>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full' src={icons_arrow_right}/>
  </div>
  <div>
  </div>
</div>

<div className=' w-full  flex '>
<div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32'>



<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>

<div className=' mb-6 mt-5'>
  <div className='bg-slate-400 rounded-md w-52 flex flex-col justify-center items-center '>
    <p className=' bg-slate-600 text-white pl-3 pr-3 -ml-32 mt-2 rounded-md'>-40%</p>
     <img src={Frame1}/>
  <button className=' bg-[#3ba139] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>50K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div>





</div>

</div>
<div className=' flex justify-center items-center mb-10'>
<button className=' bg-[#3ba139] w-60 rounded-md text-white p-3'>View All Products</button>
</div>
</div> 



</div>

<Footer/>

</>
  )
}

export default Home