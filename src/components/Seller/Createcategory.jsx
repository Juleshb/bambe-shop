import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import keyboard from "../assets/keyboard.png";
import {
  Button,
   Label,
  Modal,
  Table,
  TextInput
} from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import {
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload
} from "react-icons/hi";
import { useState } from "react";
import axios from "axios";


 
export default function Createcategory() {
  const [message, setmessage] = useState("");
  const [errrmessage, errrsetmessage] = useState("");
  const [name,setcategory]=useState("");
  const [CategoyList,setCategoyList]=useState("");
  
const APi="http://localhost:4800/api/categories";
  const createCategory=async(e)=>{
    e.preventDefault();
    try{
      const response =await axios.post(APi,{
        name
      })
      setmessage("Successfully created category");

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        errrsetmessage(error.response.data.error);  
      } else {
        errrsetmessage(response.data.message);
      }
      console.error("Error:", error.message);
    }

  }

  // display all categories

  useEffect(()=>{
    const fetchCategory = async () => {
      try {
        const response = await axios.get(APi);
        setCategoyList(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchCategory()
  },[])

  




  const EditProductModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        <button
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
                      <label
                        htmlFor="productName"
                        className="block text-sm font-medium"
                      >
                        Category name
                      </label>
                      <input
                        id="productName"
                        name="productName"
                        placeholder='Apple iMac 27"'
                        className="mt-1 block w-full border-green-400 focus:border-green-700 rounded-md p-3 border-2"
                       />
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
                <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                  Save all
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  const [isOpen, setOpen] = useState(false);
  const DeleteProductModal = () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <>
        
        <div className=" ">
          <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
            <Modal.Body className="px-6 pb-6 pt-0">
              <div className="flex flex-col items-center gap-y-6 text-center">
                <HiOutlineExclamationCircle className="text-7xl text-red-600" />
                <p className="text-lg  ">
                  Are you sure you want to delete this Category?
                </p>
                <div className="flex items-center gap-x-3">
                  <Button color=" " onClick={() => setOpen(false)}>
                    Yes, I'm sure
                  </Button>
                  <Button color=" " onClick={() => setOpen(false)}>
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

  const ProductsTable = () => {
    return (
      <Table className="min-w-full divide-y ">
        <Table.Head className="bg-gray-100 ">
          <Table.HeadCell>
           </Table.HeadCell>
          <Table.HeadCell>Category Name</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-[#ffffff] text-black">
        
        { CategoyList && CategoyList.map(category=>(
     
          <Table.Row key={category.id} className="hover:bg-gray-100 ">
            <Table.Cell className="w-4 p-4">
             </Table.Cell>
         
            <Table.Cell  className="whitespace-nowrap p-4 text-sm font-normal ">
              <div className="text-base font-semibold text-gray-900 ">
                {category.name}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400"></div>
            </Table.Cell>
    
            
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditProductModal />
                <Button  key={category.id} className=" text-red-500" onClick={() => setOpen(!isOpen)}>
          <HiTrash className="mr-2 text-lg text-black" />
          Delete Category
        </Button>              </div>
            </Table.Cell>


          </Table.Row>
        
          ))
        }
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
          <div className="flex w-full mt-20 ">
            <div className="">
              <p className=" text-xl font-bold mb-10 ">Create Category </p>

              {message && <p className="text-green-500 mb-4 text-xl">{message}</p>}
              {errrmessage && <p className="text-red-500 mb-4 text-xl">{errrmessage}</p>}

              <form onSubmit={createCategory}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full ">
                  {/* Product Name Input */}
                  <div>
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category name
                    </label>
                    <input
                    type="text"
                    onChange={(e)=>setcategory(e.target.value)}
                      id="productName"
                       placeholder='Phone'
                      className="block w-full mt-1  border border-green-500 p-2 pl-3 "
                    />
                  </div>
                </div>
                <button className=" text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all ">
                  Add product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                <strong className="text-lg">Delete Category</strong>
              </div>
              <div className="p-6 bg-white">
              <div className="flex flex-col items-center gap-y-6 text-center">
                <HiOutlineExclamationCircle className="text-7xl text-red-600" />
                <p className="text-lg  ">
                  Are you sure you want to delete this Category?
                </p>
                <div className="flex items-center gap-x-3">
                  <Button color=" " onClick={() => setOpen(false)}>
                    Yes, I'm sure
                  </Button>
                  <Button color=" " onClick={() => setOpen(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
              </div>
              <div className="flex justify-end gap-4 border-t p-4 bg-white">
                <button
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                 Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>



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
                  All categoies
                </h1>
              </div>
              <div className="block items-center sm:flex">
                <div className="flex w-full items-center sm:justify-end"></div>
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

    </>
  );
}
