import React from "react";
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";

import applewatch from "./assets/applewatch.png";
import imac from "./assets/imac.png";
import iphone12 from "./assets/iphone12.png";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <>
      <Nav />

      <div className="mt-60 lg:mt-32 ml-10  overflow-auto pr-10 md:pl-0 md:pr-0">
        <div class="relative  overflow-x-auto  rounded-md ">
          <table class="w-full text-sm text-left rtl:text-right text-green-500 ">
            <thead class="text-xs text-green-700 uppercase bg-[#9CFF2C]">
              <tr>
                <th scope="col" class="px-16 py-3">
                  <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                  Product
                </th>
                <th scope="col" class="px-6 py-3">
                  Qty
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-[#9CFF2C] border border-white  mb-10 text-black border-b  hover:bg-[#4df170] ">
                <td class="p-4 ">
                  <img
                    src={applewatch}
                    class="w-16 md:w-32 max-w-full max-h-full"
                  />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  Apple Watch
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <button
                      class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400  dark:focus:ring-[#2ac127]"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        class="bg-gray-50 w-14 border border-gray-300 text-green-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-green-100 "
                        placeholder="1"
                        required
                      />
                    </div>
                    <button
                      class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>

                <td class="px-6 py-4 font-semibold text-gray-900 ">$599</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr class="bg-[#9CFF2C] border border-white  mb-10 text-black border-b  hover:bg-[#4df170] ">
                <td class="p-4">
                  <img src={imac} class="w-16 md:w-32 max-w-full max-h-full" />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">iMac 27"</td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <button
                      class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div class="ms-3">
                      <input
                        type="number"
                        id="first_product"
                        class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-green-100 "
                        placeholder="1"
                        required
                      />
                    </div>
                    <button
                      class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">$2499</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
              <tr class="bg-[#9CFF2C] border border-white  mb-10 text-black border-b  hover:bg-[#4df170] ">
                <td class="p-4">
                  <img
                    src={iphone12}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="iPhone 12"
                  />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  IPhone 12
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <button
                      class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div class="ms-3">
                      <input
                        type="number"
                        id="first_product"
                        class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-green-100 "
                        placeholder="1"
                        required
                      />
                    </div>
                    <button
                      class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Quantity button</span>
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">$999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* payment */}
        <Link>Back to Shop</Link> <br />
        <div className=" flex flex-col md:flex-row justify-between">
          <div>
            <input
              type="text"
              className=" border-2 border-slate-300  mt-6 "
              placeholder="Coupon code"
            />
            <button className=" bg-green-400  md:pl-4 md:pr-4 ml-3 rounded-sm text-sm p-1 text-white font-semibold">
              Apply Coupon
            </button>
          </div>

          <div className=" border-2  border-slate-500 p-3 lg:w-96 mt-10">
            <p className=" font-bold mb-2">Cart Total</p>
            <div className="flex  w-full justify-between border-b-2 border-slate-400 pb-2">
              <p>Subtotal:</p>
              <p>$122</p>
            </div>
            <div className="flex  w-full justify-between border-b-2 border-slate-400 pb-2">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex  w-full justify-between  pb-2">
              <p>Total:</p>
              <p>$122</p>
            </div>
            <div className=" flex justify-center items-center mt-5">
                   <button className=" bg-green-400 p-2 rounded-md text-white">Process to Checkout</button>

            </div>

          </div>
        
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
