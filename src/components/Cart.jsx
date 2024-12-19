import React from "react";
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";

import applewatch from "./assets/applewatch.png";
import imac from "./assets/imac.png";
import iphone12 from "./assets/iphone12.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <>
      <Nav />

      <div className="mt-60 lg:mt-32 ml-10  overflow-auto pr-10 md:pl-0 md:pr-0">
        <div class="relative  overflow-x-auto  rounded-md ">
          <table class="w-full text-sm text-left rtl:text-right text-green-500 ">
            <thead class="text-xs  uppercase bg-[#2ac127] text-white">
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
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="bg-[#2ac127] border border-white mb-10 border-b hover:bg-[#4df170] text-white"
                >
                  <td className="p-4">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? `http://localhost:4800${item.images[0].url}`
                          : "placeholder-image-url"
                      }
                      className="w-16 md:w-32 max-w-full max-h-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.price} RFW
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* payment */}
 
         <div className=" flex flex-col md:flex-row justify-between">
          <div>
            <input
              type="text"
              className=" border-2 border-slate-300  p-2 rounded-md mt-20 "
              placeholder="Coupon code"
            />
            <button className=" bg-green-400  md:pl-4 md:pr-4 ml-3 rounded-sm text-sm p-3 text-white font-semibold">
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
              <button className=" bg-green-400 p-2 rounded-md text-white">
                Process to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
