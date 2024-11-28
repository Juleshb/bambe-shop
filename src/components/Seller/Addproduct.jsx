import React from "react";
import Sidebar from "./Sidebar";
import keyboard from "../assets/keyboard.png"

import {
  Button,
 Checkbox,
 Label,
 Modal,
 Table,
  TextInput,
} from "flowbite-react";
 import { FaPlus } from "react-icons/fa";
import {

 HiOutlineExclamationCircle,
 HiPencilAlt,
 HiTrash,
 HiUpload,
} from "react-icons/hi";
import { useState } from "react";

export default function Addproduct() {
  return (
    <>
    <div className=" w-full  flex">
      {/* navigations */}
      <div className="w-[30%]">
      <Sidebar />
      </div>

      <div className=" w-full">

      <div className="flex w-full mt-20 ">
  <div className="py-4">
    <form>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full ">
        {/* Product Name Input */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product name
          </label>
          <input
            id="productName"
            name="productName"
            placeholder='Apple iMac 27"'
            className="block w-full mt-1  border border-green-500 p-2 pl-3 "
          />
        </div>

        {/* Category Input */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            placeholder="Electronics"
            className="block w-full mt-1  border border-green-500 p-2 pl-3 "
          />
        </div>

        {/* Brand Input */}
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            placeholder="Apple"
            className="block w-full mt-1  border border-green-500 p-2 pl-3 "
          />
        </div>

        {/* Price Input */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="$2300"
            className="block w-full mt-1  border border-green-500 p-2 pl-3 "
          />
        </div>

        {/* Product Details Textarea */}
        <div className="lg:col-span-2">
          <label
            htmlFor="productDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Product details
          </label>
          <textarea
            id="productDetails"
            name="productDetails"
            placeholder="e.g. 3.8GHz 8-core Intel Core i7 processor, Ram 16GB"
            className="block w-full mt-1  border border-green-500 p-2 pl-3 "
            rows={4}
          ></textarea>
        </div>
       
        {/* File Upload */}
        <div className="lg:col-span-2"> 
          <label
            htmlFor="productDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Product image
          </label>
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <HiUpload className="text-4xl text-gray-300" />
              <p className="py-1 text-sm text-gray-600">
                Upload a file or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
      <button className=" text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all ">Add product</button>
    </form>
  </div>
</div>

      
      </div>
      

    </div>
      



      
      
    </>
  )
}
