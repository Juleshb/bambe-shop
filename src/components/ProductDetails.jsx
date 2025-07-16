import React, { useState, useEffect , useContext} from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import { useParams } from "react-router-dom";
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";
import { CartContext } from "./CartContext";

function ProductDetails() {
  const { t } = useTranslation(); // Initialize translation function
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
   const { addToCart } = useContext(CartContext);
  const API = `http://localhost:4800/api/products/single/${id}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-center">
        <p>{t("loadingProduct")}</p>
      </div>
    );
  }

  if (!product) {
    return <div>{t("productNotFound")}</div>;
  }

  return (
   <>
<Nav/>
   

    
 <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
                    <div className="swiper main-slide-carousel swiper-container relative mb-6">
                        <div className="swiper-wrapper">
                            
                            <div className="swiper-slide">
                                <div className="block">
                                <img 
                                src={`http://localhost:4800${product?.images?.[0]?.url}`}
                                
                                alt={product?.name}
                                         className="max-lg:mx-auto rounded-2xl object-cover"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-for-slider ">
                        <div className="swiper-wrapper">
                             
                            
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                        <div className="flex items-center justify-between gap-6 mb-6">
                            <div className="text">
                       
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">{product.name}
                                </h2>
                                <p className="font-normal text-base text-gray-500">{product.description}</p>
                            </div>
                            <button className="group transition-all duration-500 p-0.5">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        className="fill-indigo-50 transition-all duration-500 group-hover:fill-indigo-100"
                                        cx="30" cy="30" r="30" fill="" />
                                    <path
                                        className="stroke-[#38B496] transition-all duration-500 group-hover:stroke-[#38B496]"
                                        d="M21.4709 31.3196L30.0282 39.7501L38.96 30.9506M30.0035 22.0789C32.4787 19.6404 36.5008 19.6404 38.976 22.0789C41.4512 24.5254 41.4512 28.4799 38.9842 30.9265M29.9956 22.0789C27.5205 19.6404 23.4983 19.6404 21.0231 22.0789C18.548 24.5174 18.548 28.4799 21.0231 30.9184M21.0231 30.9184L21.0441 30.939M21.0231 30.9184L21.4628 31.3115"
                                        stroke="" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                            <div className="flex items-center">
                                <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">{product.price} Frw</h5>
                                <span className="ml-3 hidden font-semibold text-lg text-">30% off</span>
                            </div>
                            <svg className="mx-5 max-[400px]:hidden" xmlns="http://www.w3.org/2000/svg" width="2"
                                height="36" viewBox="0 0 2 36" fill="none">
                                <path d="M1 0V36" stroke="#E5E7EB" />
                            </svg>
                        
                        </div>
                        <p className="font-medium text-lg text-gray-900 mb-2">{t("color")}</p>
                        <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm">
                             

                            <div className="color-box group">
                                <div>
                                    <img src={`http://localhost:4800${product?.images?.[0]?.url}`} alt={product.name}
                                        className="border-2 border-gray-100 rounded-xl transition-all duration-500 group-hover:border-[#38B496] object-cover"
                                        />
                                    <p
                                        className="font-normal text-sm leading-6 text-gray-400 text-center mt-2 group-hover:text-[#38B496] ">
                                       {t("colorBeige")}</p>
                                </div>
                            </div>
                        </div>
                         
                        <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                            <div className=" flex items-center justify-center border border-gray-400 rounded-full">
                                <button
                                    className="group py-[14px] px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300">
                                    <svg className="stroke-black group-hover:stroke-black" width="22" height="22"
                                        viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                    </svg>
                                </button>
                                <input type="text"
                                    className="font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text--[#38B496] outline-0 hover:placeholder:text-[#38B496]"
                                    placeholder="1"/>
                                <button
                                    className="group py-[14px] px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300">
                                    <svg className="stroke-black group-hover:stroke-black" width="22" height="22"
                                        viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                className="group py-3 px-5 rounded-full bg-indigo-50 text-[#38B496] font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-100"
                                onClick={() => addToCart(product)}>
                                <svg className="stroke-[#38B496] transition-all duration-500 group-hover:stroke-[#38B496]"
                                    width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                        stroke="" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                                {t("addToCart")}</button>
                        </div>
                        <button
                            className="text-center w-full px-5 py-4 rounded-[100px] bg-[#38B496] flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 ">
                           {t("buyNow")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
 

 <Footer/>
                                            

   </>
  );
}

export default ProductDetails;
