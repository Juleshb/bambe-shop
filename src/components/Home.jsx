import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import { Link } from "react-router-dom";
import bgimage from "./assets/bgimage.png";
import iphonelogo from "./assets/iphonelogo.png";
import arrowright from "./assets/arrow-right.png";
import icons_arrow_left from "./assets/icons_arrow_left.png";
import icons_arrow_right from "./assets/arrow-right.png";
import star from "./assets/star.png";
import emptystar from "./assets/emptystar.png";
import Radio from "./assets/Radio.png";
import axiosInstance from "./utils/axios";
import { CartContext } from "./CartContext";
import { Icon } from "@iconify/react";

function Home() {
  const { t } = useTranslation(); // Initialize translation
  const { addToCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axiosInstance.get("/api/products");
        setProducts(productsRes.data);
        const categoriesRes = await axiosInstance.get("/api/categories");
        setCategories(categoriesRes.data);
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
<div className="flex w-full justify-between">
          <div className="flex-col w-80 mt-20 pt-10 border-r-2 hidden lg:flex">
            <p className="text-xl font-bold mb-2 text-slate-700">{t("categories")}</p>
            {categories.map((category) => (
              <div key={category.id}>
                <Link className="mb-4 hover:text-[#F15C26]" to="/">
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

{/* Hero Section */}
<div className="mt-32 lg:mt-28 w-full lg:w-3/4 flex flex-col justify-evenly text-center lg:text-start items-center lg:flex-row mb-3 bg-black text-white">
            <div className="p-10 flex flex-col">
              <div className="flex justify-center text-center space-x-5 text-xl items-center">
                <img src={iphonelogo} />
                <p>{t("iphoneSeries")}</p>
              </div>
              <p className="text-4xl mt-4 mb-6">{t("discountOffer")}</p>
              <div className="flex">
                <Link className="underline text-lg" to="/">
                  {t("shopNow")}
                </Link>
                <img className="ml-2" src={arrowright} />
              </div>
            </div>
            <div>
              <img src={bgimage} className="animate-pulse" />
            </div>
          </div>
        </div>

        {/* Flash Sales */}
        <div className="ml-2 sm:ml-5 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row justify-between w-full mt-6 sm:mt-10 px-4 sm:px-0">
            <div className="w-full sm:w-1/2 text-center sm:text-left">
              <p className="font-bold text-sm sm:text-base">{t("today")}</p>
              <p className="font-semibold text-2xl sm:text-3xl">{t("flashSales")}</p>
            </div>
            <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mt-3 sm:mt-0">
              <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_left} alt="Prev" />
              <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_right} alt="Next" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full flex justify-center items-center mt-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
              {products.map((product) => (
                <div className="w-full sm:w-72 mb-6" key={product.id}>
                  <div className="bg-slate-400 rounded-md flex flex-col items-center p-4">
                    <p className="bg-slate-600 text-white px-3 py-1 text-xs rounded-md self-start">-40%</p>
                    <Link to={`/product/${product.id}`}>
                      <img
                        className="h-36 sm:h-44 object-contain"
                        src={product.images?.length > 0 ? `https://bambe.shop${product.images[0].url}` : "placeholder-image-url"}
                        alt={product.name}
                      />
                    </Link>
                    <button className="bg-[#38B496] hover:bg-[#F15C26] w-full rounded-md text-white py-2 mt-3" onClick={() => addToCart(product)}>
                    
                      {t("addToCart")}
                    </button>
                  </div>
                  <p className="mt-2 mb-2 text-center">{product.name}</p>
                  <p className="text-center">{product.price} RFW</p>
                </div>
              ))}
            </div>
          </div>

      <div className="flex justify-center items-center mb-10 mt-4">
        <button className="bg-[#38B496] w-48 sm:w-60 rounded-md text-white py-3">{t("viewAllProducts")}</button>
      </div>
    </div>



<div className="flex flex-col sm:flex-row justify-between w-full mt-6 mb-6 sm:mt-10 px-4 sm:px-0">
        <div className="w-full sm:w-1/2 text-center sm:text-left">
        <p className="font-bold text-sm sm:text-base">{t("category")}</p>
            <p className="font-semibold text-2xl sm:text-3xl">{t("browseByCategory")}</p>
          </div>
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mt-3 sm:mt-0">
          <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_left} alt="Prev" />
          <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_right} alt="Next" />
        </div>
      </div>


<div className=' flex flex-col justify-center items-center '>
<div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-10 '>

  <div className=' border flex flex-col justify-center text-[#38B496] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center  w-72 md:w-full'>
  <Icon icon="wpf:iphone" width="52" height="52" />
    <p>{t("phones")}</p>
  </div>
  <div className=' border flex flex-col justify-center text-[#38B496] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
  <Icon icon="iconoir:pc-check" width="52" height="52" />
    <p>{t("computers")}</p>

  </div>
  <div className=' border flex flex-col justify-center text-[#38B496] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
  <Icon icon="solar:watch-square-outline" width="52" height="52" />
    <p>{t("smartWatch")}</p>

  </div>
  <div className=' border flex flex-col justify-center text-[#F15C26] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
  <Icon icon="circum:camera" width="52" height="52" />
    <p>{t("camera")}</p>

  </div>
  <div className=' border flex flex-col justify-center text-[#38B496] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
  <Icon icon="fluent:headphones-24-regular" width="52" height="52" />
    <p>{t("headphone")}</p>

  </div>

  <div className=' border flex flex-col justify-center text-[#38B496] items-center cursor-pointer hover:bg-[#F15C26] hover:transition-all hover:shadow-lg  rounded-md p-8 hover:text-white text-center w-72 md:w-full '>
  <Icon icon="streamline:ai-gaming-spark" width="52" height="52" />
    <p>{t("gaming")}</p>

  </div>


</div>
</div>
   


   <div className="ml-2 sm:ml-5 flex flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-between w-full mt-6 sm:mt-10 px-4 sm:px-0">
      <div className="w-full sm:w-1/2 text-center sm:text-left">
              <p className="font-bold text-sm sm:text-base">{t("thisMonth")}</p>
              <p className="font-semibold text-2xl sm:text-3xl">{t("bestSellingProducts")}</p>
            </div>
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mt-3 sm:mt-0">
          <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_left} alt="Prev" />
          <img className="w-10 h-10 bg-slate-500 p-2 rounded-full mx-2" src={icons_arrow_right} alt="Next" />
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
              {products.map((product) => (
                <div className="w-full sm:w-72 mb-6" key={product.id}>
                  <div className="bg-slate-400 rounded-md flex flex-col items-center p-4">
                    <p className="bg-slate-600 text-white px-3 py-1 text-xs rounded-md self-start">-40%</p>
                    <Link to={`/product/${product.id}`}>
                      <img
                        className="h-36 sm:h-44 object-contain"
                        src={product.images?.length > 0 ? `https://bambe.shop${product.images[0].url}` : "placeholder-image-url"}
                        alt={product.name}
                      />
                    </Link>
                    <button className="bg-[#38B496] hover:bg-[#F15C26] w-full rounded-md text-white py-2 mt-3" onClick={() => addToCart(product)}>
                      {t("addToCart")}
                    </button>
                  </div>
                  <p className="mt-2 mb-2 text-center">{product.name}</p>
                  <p className="text-center">{product.price} RFW</p>
                </div>
              ))}
            </div>
          </div>

      <div className="flex justify-center items-center mb-10 mt-4">
        <button className="bg-[#38B496] w-48 sm:w-60 rounded-md text-white py-3">{t("viewAllProducts")}</button>
      </div>
    </div>

<div className=' mb-20 w-full p-10 bg-[#38B496] flex flex-col md:flex-row'>

<div className="p-10">
            <p className="text-lg text-slate-100 font-bold mb-8">{t("categories")}</p>
            <p className="text-3xl sm:text-4xl text-white font-bold mb-10">{t("enhanceMusic")}</p>
            <Link className="text-white bg-[#F15C26] w-44 p-2 text-lg text-center rounded-md">
              {t("buyNow")}
            </Link>
          </div>


<div>
<img src={Radio} className="animate-[bounce_3s_ease-in-out_infinite]" />
  
</div>


</div>

 
</div>

<Footer/>

</>
  )
}

export default Home