import React from 'react'
import Footer from './navs/Footer'
import Nav from './navs/Nav'
import { Link, Links } from 'react-router-dom'

import bgimage from "./assets/bgimage.png"
import iphonelogo from "./assets/iphonelogo.png"
import arrowright from "./assets/arrow-right.png"
import icons_arrow_left from "./assets/icons_arrow_left.png"
import icons_arrow_right from "./assets/arrow-right.png"
import star from "./assets/star.png"
import emptystar from "./assets/emptystar.png"
import Frame1 from "./assets/Frame1.png"
import Radio from "./assets/Radio.png"
import keyboard from "./assets/keyboard.png"
import chair from "./assets/chair.png"
import monitor from "./assets/monitor.png"

import phone from "./assets/phones.png"
import computer from "./assets/computer.png"
import SmartWatch from "./assets/SmartWatch.png"
import Camera from "./assets/Camera.png"
import gaming from "./assets/gaming.png"
import Headphone from "./assets/Headphone.png"
import bag from "./assets/bag.png"
import jacket from "./assets/jacket.png"
import smartbook from "./assets/smartbook.png"
import axiosInstance from './utils/axios'
import { useEffect,useState } from 'react'

function Home() {
  const [categories, setCategories] = useState(['']);
  const [products, setProducts] = useState([]);

    // Fetch categories and products on mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [categoriesRes, productsRes] = await Promise.all([
            axiosInstance.get("/api/categories"),
            axiosInstance.get("/api/products"),
          ]);
          setCategories(categoriesRes.data);
          setProducts(productsRes.data);
        } catch (err) {
          console.error("Error fetching data:", err.message);
        }
      };
  
      fetchData();
    }, []);
  


  return (
<>
<Nav/>

<div className=' lg:pl-48  lg:mr-48'>
{/* Ads section */}
<div className=' flex w-full  justify-between'>

<div className='  flex-col w-80 mt-20 pt-10 border-r-2 hidden lg:flex '>
  <p className=' text-xl font-bold mb-2 text-slate-700'>Categories</p>

  {
    categories.map((category)=>(
      <div key={category.id}>
  <Link className=' mb-4' to="/">{category.name}</Link>
      </div>
    ))
  }
  
  

</div>

<div className='  mt-32 lg:mt-28 w-full lg:w-3/4   flex-col md:flex-col  flex   justify-evenly text-center lg:text-start items-center lg:flex-row  mb-3  bg-black text-white'>
  <div className=' p-10 flex flex-col'>
    <div className='flex justify-center text-center space-x-5 text-xl items-center'>
        <img src={iphonelogo} />
      <p>iPhone 14 Series</p>
    </div>
    
      <p className=' text-4xl mt-4 mb-6'>Up to 10% <br/> off Voucher</p>
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

 
 


 <div className=' ml-5 flex flex-col justify-center items-center'>
{/* Flash seles  */}
<div className=' flex justify-stretch w-full mt-10'>
  <div className=' w-1/2'>
    <p className=' font-bold'>To day</p>
    <p className=' font-semibold text-3xl'>Flash Sales</p>
  </div>
  <div className=' w-1/2  flex justify-end'>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full mr-4' src={icons_arrow_left}/>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full' src={icons_arrow_right}/>
  </div>
  <div>
  </div>
</div>

<div className=' w-full  flex justify-center items-center  '>


<div className=' w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  lg:gap-x-32 '>



{products.map((product) => (
  <div className="w-96 lg:w-72 mb-6 mt-5" key={product.id}>
    <div className="bg-slate-400 rounded-md w-96 lg:w-72 flex flex-col justify-center items-center">
      <p className="bg-slate-600 text-white pl-3 pr-3 -ml-72 lg:-ml-52 mt-2 rounded-md">-40%</p>
      <img
        className="h-44"
        src={
          product.images && product.images.length > 0
            ? `http://localhost:4800${product.images[0].url}`  
            : 'placeholder-image-url' 
        }
        alt={product.name}
      />
      <button className="bg-[#2ac127] w-full rounded-md text-white p-1">Add To Cart</button>
    </div>

    <p className="mt-2 mb-2">{product.name}</p>
    <div className="flex space-x-2">
      <p>{product.price} RFW</p>
    </div>

    <div className="flex">
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={emptystar} alt="empty star" />
      <span className="text-slate-500 text-sm ml-2 -mt-1.2">(55)</span>
    </div>
  </div>
))}










{/* <div className=' mb-6 mt-5'>
<div className='bg-slate-400 rounded-md w-96 lg:w-72 flex flex-col justify-center items-center '>
<p className=' bg-slate-600 text-white pl-3 pr-3   -ml-72 lg:-ml-52 mt-2 rounded-md'>-40%</p>
     <img className=' h-44' src={keyboard}/>
  <button className=' bg-[#2ac127] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>AK-900 Wired Keyboard</p>
  <div className=' flex space-x-2'>
  <p>44K Frw</p>
  <p className=' text-[#3CCC3A]'>50K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div> */}

{/* <div className=' mb-6 mt-5'>
<div className='bg-slate-400 rounded-md w-96 lg:w-72 flex flex-col justify-center items-center '>
<p className=' bg-slate-600 text-white pl-3 pr-3 -ml-72 lg:-ml-52 mt-2 rounded-md'>-40%</p>
     <img className=' h-44' src={monitor}/>
  <button className=' bg-[#2ac127] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>IPS LCD Gaming Monitor</p>
  <div className=' flex space-x-2'>
  <p>200K Frw</p>
  <p className=' text-[#3CCC3A]'>250K Frw</p>
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
<div className='bg-slate-400 rounded-md w-96 lg:w-72 flex flex-col justify-center items-center '>
<p className=' bg-slate-600 text-white pl-3 pr-3 -ml-72 lg:-ml-52 mt-2 rounded-md'>-40%</p>
     <img className=' h-44' src={chair}/>
  <button className=' bg-[#2ac127] w-full rounded-md text-white p-1'>Add To Cart</button>
  </div>
 
  <p className=' mt-2 mb-2'>S-Series Comfort Chair </p>
  <div className=' flex space-x-2'>
  <p>17K Frw</p>
  <p className=' text-[#3CCC3A]'>20K Frw</p>
  </div>
  
  <div className=' flex'>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={star}/>
    <img className=' w-4 h-4' src={emptystar}/>
    <span className=' text-slate-500 text-sm ml-2 -mt-1.2'>(55)</span>
 </div>
</div> */}


</div>

</div>
<div className=' flex justify-center items-center mb-10'>
<button className=' bg-[#2ac127] w-60 rounded-md text-white p-3'>View All Products</button>
</div>
</div> 



{/* Flash seles  */}
<div className=' flex justify-stretch w-full mt-10 mb-7'>
  <div className=' w-1/2'>
    <p className=' font-bold'>Categoty</p>
    <p className=' font-bold text-3xl'>Browse By Category</p>

   </div>
  <div className=' w-1/2  flex justify-end'>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full mr-4' src={icons_arrow_left}/>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full' src={icons_arrow_right}/>
  </div>
  <div>
  </div>
</div>


<div className=' flex flex-col justify-center items-center '>
<div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-10 '>

  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center  w-72 md:w-full'>
    <img src={phone}/>
    <p>Phones</p>
  </div>
  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
    <img src={computer}/>
    <p>Computers</p>

  </div>
  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
    <img src={SmartWatch}/>
    <p>Smart Watch</p>

  </div>
  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
    <img src={Camera}/>
    <p>Camera</p>

  </div>
  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
    <img src={Headphone}/>
    <p>Headphone</p>

  </div>

  <div className=' border flex flex-col justify-center items-center cursor-pointer hover:bg-black hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
    <img src={gaming}/>
    <p>Gaming</p>

  </div>


</div>
</div>
 












<div className=' ml-5 flex flex-col justify-center items-center'>
{/* Flash seles  */}
<div className=' flex justify-stretch w-full mt-10'>
  <div className=' w-1/2'>
    <p className=' font-bold'>This Month</p>
    <p className=' font-semibold text-3xl'>Best Selling Products</p>
  </div>
  <div className=' w-1/2  flex justify-end'>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full mr-4' src={icons_arrow_left}/>
    <img className=' w-10 h-10 bg-slate-500 p-2 rounded-full' src={icons_arrow_right}/>
  </div>
  <div>
  </div>
</div>

<div className=' w-full  flex justify-center items-center  '>


<div className=' w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  lg:gap-x-32 '>



{products.map((product) => (
  <div className="w-96 lg:w-72 mb-6 mt-5" key={product.id}>
    <div className="bg-slate-400 rounded-md w-96 lg:w-72 flex flex-col justify-center items-center">
      <p className="bg-slate-600 text-white pl-3 pr-3 -ml-72 lg:-ml-52 mt-2 rounded-md">-40%</p>
      <img
        className="h-44"
        src={
          product.images && product.images.length > 0
            ? `http://localhost:4800${product.images[0].url}`  
            : 'placeholder-image-url' 
        }
        alt={product.name}
      />
      <button className="bg-[#2ac127] w-full rounded-md text-white p-1">Add To Cart</button>
    </div>

    <p className="mt-2 mb-2">{product.name}</p>
    <div className="flex space-x-2">
      <p>{product.price} RFW</p>
    </div>

    <div className="flex">
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={star} alt="star" />
      <img className="w-4 h-4" src={emptystar} alt="empty star" />
      <span className="text-slate-500 text-sm ml-2 -mt-1.2">(55)</span>
    </div>
  </div>
))}

 

</div>

</div>
<div className=' flex justify-center items-center mb-10'>
<button className=' bg-[#2ac127] w-60 rounded-md text-white p-3'>View All Products</button>
</div>
</div> 





















{/* category */}


<div className=' mb-20 w-full p-10 bg-[#2ac127] flex flex-col md:flex-row'>

<div className=' p-10'>
  <p className=' text-lg text-slate-100 font-bold mb-8'>Categories</p>
<p className=' text-4xl text-white font-bold mb-10'>Enhance Your Music Experience</p>

<Link className=' text-white bg-[#8af888] w-44 p-2 text-lg text-center  rounded-md'>Buy Now</Link>
</div>


<div>
  <img src={Radio}/>
  
</div>




</div>















 
</div>

<Footer/>

</>
  )
}

export default Home