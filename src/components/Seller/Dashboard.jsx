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
 
export default function Dashboard() {

 
  
    const EditProductModal=()=>{
  
    const [isOpen, setOpen] = useState(false);
  
    return (
      <>
      <button
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setOpen(!isOpen)}
      >
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
            <div className="border-b p-6 bg-white">
              <strong className="text-lg">Edit product</strong>
            </div>
            <div className="p-6 bg-white">
              <form>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label htmlFor="productName" className="block text-sm font-medium">
                      Product name
                    </label>
                    <input
                      id="productName"
                      name="productName"
                      placeholder='Apple iMac 27"'
                      className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium">
                      Category
                    </label>
                    <input
                      id="category"
                      name="category"
                      placeholder="Electronics"
                      className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium">
                      Brand
                    </label>
                    <input
                      id="brand"
                      name="brand"
                      placeholder="Apple"
                      className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium">
                      Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="$2300"
                      className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label htmlFor="productDetails" className="block text-sm font-medium">
                      Product details
                    </label>
                    <input
                      id="productDetails"
                      name="productDetails"
                      placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                      className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                    />
                  </div>
                  <div className="flex space-x-5">
                    {["apple-imac-1.png" ].map(
                      (src, index) => (
                        <div key={index} className="relative bg-white">
                          <img
                            alt={`Product ${index + 1}`}
                            src={keyboard}
                            className="h-24 rounded"
                          />
                          <button
                            className="absolute -top-2 -right-2 text-red-600"
                            type="button"
                          >
                            <HiTrash className="text-2xl" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <div className="flex w-full items-center justify-center">
                      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 p-6 hover:bg-gray-50 bg-white">
                        <HiUpload className="text-4xl text-gray-300" />
                        <p className="py-1 text-sm text-gray-600">
                          Upload a file or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-end gap-4 border-t p-4 bg-white">
              <button
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                Save all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    );
  };

  
  const DeleteProductModal=()=>{
   
    const [isOpen, setOpen] = useState(false);
  
    return (
      <>
        <Button  className=" text-red-500" onClick={() => setOpen(!isOpen)}>
          <HiTrash className="mr-2 text-lg text-black" />
          Delete item
        </Button>
        <div className=" ">
   <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          
          <Modal.Body className="px-6 pb-6 pt-0">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-600" />
              <p className="text-lg  ">
                Are you sure you want to delete this product?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color=" " onClick={() => setOpen(false)}>
                  Yes, I'm sure
                </Button>
                <Button  color=" " onClick={() => setOpen(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        </div>
     
      </>
    );
  };
  
  const ProductsTable=()=>{
  
    return (
      <Table className="min-w-full divide-y ">
        <Table.Head className="bg-gray-100 ">
          <Table.HeadCell>
            <span className="sr-only">Toggle selected</span>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-[#ffffff] text-black">
          <Table.Row className="hover:bg-gray-100 ">
            <Table.Cell className="w-4 p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal ">
              <div className="text-base font-semibold text-gray-900 ">
keyboard              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
               </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 ">
            Computer Keyboards
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 ">
              #194556
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 ">
              $49
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditProductModal />
                <DeleteProductModal />
              </div>
            </Table.Cell>
          </Table.Row>
  
  
  
  
        </Table.Body>
      </Table>
    );
  };
  
  
   

  return (
    <>
    <div className=" w-full  flex">
      {/* navigations */}
      <div className="w-[30%]">
      <Sidebar />
      </div>

      <div className=" w-full">
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4  sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">

            <h1 className="text-xl font-semibold text-gray-900  sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">

            <div className="flex w-full items-center sm:justify-end">
             </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
      </div>
      

    </div>
      



      
      
    </>
  );





}
