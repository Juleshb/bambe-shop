import React, { useState } from "react";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
 
import axiosInstance from "../utils/axios";
const Dashboard = () => {
  return (
    <div className="flex bg-white text-black">
      <div className="">
        <div className="">
          <LatestTransactions />
        </div>
      </div>
    </div>
  );
}; 

const LatestTransactions = () => {

       const [products, setProducts] = useState([]);
       const [userproducts, setuserProducts] = useState([0]);
       const [category, setcategory] = useState([0]);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [categoriesRes, productsRes,userProductsRes] = await Promise.all([
            axiosInstance.get("/api/categories"),
            axiosInstance.get("/api/productorders"),
            axiosInstance.get("/api/products/userproduct")

          ]);
           setProducts(productsRes.data);
           setuserProducts(userProductsRes.data.length);
           setcategory(categoriesRes.data.length);
        } catch (err) {
          console.error("Error fetching data:", err.message);
        }
      };
  
      fetchData();
    }, []);

       
    
  return (
    <div>
  

      <div className="rounded-lg bg-slate-100 h-[100vh] p-4 shadow sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className=" mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-44 lg:gap-10">

            <div className="bg-white h-52 w-72 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Products</p>
                  <p className="text-4xl ml-2 font-semibold">{userproducts}</p>
                </div>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8.5 2.75H15.5V1.25H8.5V2.75ZM16.25 3.5V20.5H17.75V3.5H16.25ZM15.5 21.25H8.5V22.75H15.5V21.25ZM7.75 20.5V3.5H6.25V20.5H7.75ZM8.5 21.25C8.08579 21.25 7.75 20.9142 7.75 20.5H6.25C6.25 21.7426 7.25736 22.75 8.5 22.75V21.25ZM16.25 20.5C16.25 20.9142 15.9142 21.25 15.5 21.25V22.75C16.7426 22.75 17.75 21.7426 17.75 20.5H16.25ZM15.5 2.75C15.9142 2.75 16.25 3.08579 16.25 3.5H17.75C17.75 2.25736 16.7426 1.25 15.5 1.25V2.75ZM8.5 1.25C7.25736 1.25 6.25 2.25736 6.25 3.5H7.75C7.75 3.08579 8.08579 2.75 8.5 2.75V1.25Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M20.0195 4.25C19.6053 4.25 19.2695 4.58579 19.2695 5C19.2695 5.41421 19.6053 5.75 20.0195 5.75V4.25ZM20.0195 18.25C19.6053 18.25 19.2695 18.5858 19.2695 19C19.2695 19.4142 19.6053 19.75 20.0195 19.75V18.25ZM23.75 18V6H22.25V18H23.75ZM22 19.75C22.9665 19.75 23.75 18.9665 23.75 18H22.25C22.25 18.1381 22.1381 18.25 22 18.25V19.75ZM22 5.75C22.1381 5.75 22.25 5.86193 22.25 6H23.75C23.75 5.0335 22.9665 4.25 22 4.25V5.75ZM22 4.25H20.0195V5.75H22V4.25ZM20.0195 19.75H22V18.25H20.0195V19.75Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M3.97266 5.75C4.38687 5.75 4.72266 5.41421 4.72266 5C4.72266 4.58579 4.38687 4.25 3.97266 4.25V5.75ZM3.97266 19.75C4.38687 19.75 4.72266 19.4142 4.72266 19C4.72266 18.5858 4.38687 18.25 3.97266 18.25V19.75ZM1.75 18V6H0.25V18H1.75ZM2 18.25C1.86193 18.25 1.75 18.1381 1.75 18H0.25C0.25 18.9665 1.0335 19.75 2 19.75V18.25ZM2 4.25C1.0335 4.25 0.25 5.0335 0.25 6H1.75C1.75 5.86193 1.86193 5.75 2 5.75V4.25ZM2 5.75H3.97266V4.25H2V5.75ZM3.97266 18.25H2V19.75H3.97266V18.25Z"
                      fill="#9e9ef0"
                    />{" "}
                  </g>
                </svg>
              </div>
              <p className="mb-0 pb-0 ">Total Products added in store</p>
            </div>

            <div className="bg-white h-52 w-72 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Customers</p>
                  <p className="text-4xl ml-2 font-semibold">{products.length}</p>
                </div>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8.5 2.75H15.5V1.25H8.5V2.75ZM16.25 3.5V20.5H17.75V3.5H16.25ZM15.5 21.25H8.5V22.75H15.5V21.25ZM7.75 20.5V3.5H6.25V20.5H7.75ZM8.5 21.25C8.08579 21.25 7.75 20.9142 7.75 20.5H6.25C6.25 21.7426 7.25736 22.75 8.5 22.75V21.25ZM16.25 20.5C16.25 20.9142 15.9142 21.25 15.5 21.25V22.75C16.7426 22.75 17.75 21.7426 17.75 20.5H16.25ZM15.5 2.75C15.9142 2.75 16.25 3.08579 16.25 3.5H17.75C17.75 2.25736 16.7426 1.25 15.5 1.25V2.75ZM8.5 1.25C7.25736 1.25 6.25 2.25736 6.25 3.5H7.75C7.75 3.08579 8.08579 2.75 8.5 2.75V1.25Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M20.0195 4.25C19.6053 4.25 19.2695 4.58579 19.2695 5C19.2695 5.41421 19.6053 5.75 20.0195 5.75V4.25ZM20.0195 18.25C19.6053 18.25 19.2695 18.5858 19.2695 19C19.2695 19.4142 19.6053 19.75 20.0195 19.75V18.25ZM23.75 18V6H22.25V18H23.75ZM22 19.75C22.9665 19.75 23.75 18.9665 23.75 18H22.25C22.25 18.1381 22.1381 18.25 22 18.25V19.75ZM22 5.75C22.1381 5.75 22.25 5.86193 22.25 6H23.75C23.75 5.0335 22.9665 4.25 22 4.25V5.75ZM22 4.25H20.0195V5.75H22V4.25ZM20.0195 19.75H22V18.25H20.0195V19.75Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M3.97266 5.75C4.38687 5.75 4.72266 5.41421 4.72266 5C4.72266 4.58579 4.38687 4.25 3.97266 4.25V5.75ZM3.97266 19.75C4.38687 19.75 4.72266 19.4142 4.72266 19C4.72266 18.5858 4.38687 18.25 3.97266 18.25V19.75ZM1.75 18V6H0.25V18H1.75ZM2 18.25C1.86193 18.25 1.75 18.1381 1.75 18H0.25C0.25 18.9665 1.0335 19.75 2 19.75V18.25ZM2 4.25C1.0335 4.25 0.25 5.0335 0.25 6H1.75C1.75 5.86193 1.86193 5.75 2 5.75V4.25ZM2 5.75H3.97266V4.25H2V5.75ZM3.97266 18.25H2V19.75H3.97266V18.25Z"
                      fill="#9e9ef0"
                    />{" "}
                  </g>
                </svg>
              </div>
              <p className="mb-0 pb-0 ">Total Products added in store</p>
            </div>

            <div className="bg-white h-52 w-72 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Sales</p>
                  <p className="text-4xl ml-2 font-semibold">0</p>
                </div>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8.5 2.75H15.5V1.25H8.5V2.75ZM16.25 3.5V20.5H17.75V3.5H16.25ZM15.5 21.25H8.5V22.75H15.5V21.25ZM7.75 20.5V3.5H6.25V20.5H7.75ZM8.5 21.25C8.08579 21.25 7.75 20.9142 7.75 20.5H6.25C6.25 21.7426 7.25736 22.75 8.5 22.75V21.25ZM16.25 20.5C16.25 20.9142 15.9142 21.25 15.5 21.25V22.75C16.7426 22.75 17.75 21.7426 17.75 20.5H16.25ZM15.5 2.75C15.9142 2.75 16.25 3.08579 16.25 3.5H17.75C17.75 2.25736 16.7426 1.25 15.5 1.25V2.75ZM8.5 1.25C7.25736 1.25 6.25 2.25736 6.25 3.5H7.75C7.75 3.08579 8.08579 2.75 8.5 2.75V1.25Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M20.0195 4.25C19.6053 4.25 19.2695 4.58579 19.2695 5C19.2695 5.41421 19.6053 5.75 20.0195 5.75V4.25ZM20.0195 18.25C19.6053 18.25 19.2695 18.5858 19.2695 19C19.2695 19.4142 19.6053 19.75 20.0195 19.75V18.25ZM23.75 18V6H22.25V18H23.75ZM22 19.75C22.9665 19.75 23.75 18.9665 23.75 18H22.25C22.25 18.1381 22.1381 18.25 22 18.25V19.75ZM22 5.75C22.1381 5.75 22.25 5.86193 22.25 6H23.75C23.75 5.0335 22.9665 4.25 22 4.25V5.75ZM22 4.25H20.0195V5.75H22V4.25ZM20.0195 19.75H22V18.25H20.0195V19.75Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M3.97266 5.75C4.38687 5.75 4.72266 5.41421 4.72266 5C4.72266 4.58579 4.38687 4.25 3.97266 4.25V5.75ZM3.97266 19.75C4.38687 19.75 4.72266 19.4142 4.72266 19C4.72266 18.5858 4.38687 18.25 3.97266 18.25V19.75ZM1.75 18V6H0.25V18H1.75ZM2 18.25C1.86193 18.25 1.75 18.1381 1.75 18H0.25C0.25 18.9665 1.0335 19.75 2 19.75V18.25ZM2 4.25C1.0335 4.25 0.25 5.0335 0.25 6H1.75C1.75 5.86193 1.86193 5.75 2 5.75V4.25ZM2 5.75H3.97266V4.25H2V5.75ZM3.97266 18.25H2V19.75H3.97266V18.25Z"
                      fill="#9e9ef0"
                    />{" "}
                  </g>
                </svg>
              </div>
              <p className="mb-0 pb-0 ">Total Products added in store</p>
            </div>

            <div className="bg-white h-52 w-72 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Categories</p>
                  <p className="text-4xl ml-2 font-semibold">{category}</p>
                </div>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8.5 2.75H15.5V1.25H8.5V2.75ZM16.25 3.5V20.5H17.75V3.5H16.25ZM15.5 21.25H8.5V22.75H15.5V21.25ZM7.75 20.5V3.5H6.25V20.5H7.75ZM8.5 21.25C8.08579 21.25 7.75 20.9142 7.75 20.5H6.25C6.25 21.7426 7.25736 22.75 8.5 22.75V21.25ZM16.25 20.5C16.25 20.9142 15.9142 21.25 15.5 21.25V22.75C16.7426 22.75 17.75 21.7426 17.75 20.5H16.25ZM15.5 2.75C15.9142 2.75 16.25 3.08579 16.25 3.5H17.75C17.75 2.25736 16.7426 1.25 15.5 1.25V2.75ZM8.5 1.25C7.25736 1.25 6.25 2.25736 6.25 3.5H7.75C7.75 3.08579 8.08579 2.75 8.5 2.75V1.25Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M20.0195 4.25C19.6053 4.25 19.2695 4.58579 19.2695 5C19.2695 5.41421 19.6053 5.75 20.0195 5.75V4.25ZM20.0195 18.25C19.6053 18.25 19.2695 18.5858 19.2695 19C19.2695 19.4142 19.6053 19.75 20.0195 19.75V18.25ZM23.75 18V6H22.25V18H23.75ZM22 19.75C22.9665 19.75 23.75 18.9665 23.75 18H22.25C22.25 18.1381 22.1381 18.25 22 18.25V19.75ZM22 5.75C22.1381 5.75 22.25 5.86193 22.25 6H23.75C23.75 5.0335 22.9665 4.25 22 4.25V5.75ZM22 4.25H20.0195V5.75H22V4.25ZM20.0195 19.75H22V18.25H20.0195V19.75Z"
                      fill="#9e9ef0"
                    />{" "}
                    <path
                      d="M3.97266 5.75C4.38687 5.75 4.72266 5.41421 4.72266 5C4.72266 4.58579 4.38687 4.25 3.97266 4.25V5.75ZM3.97266 19.75C4.38687 19.75 4.72266 19.4142 4.72266 19C4.72266 18.5858 4.38687 18.25 3.97266 18.25V19.75ZM1.75 18V6H0.25V18H1.75ZM2 18.25C1.86193 18.25 1.75 18.1381 1.75 18H0.25C0.25 18.9665 1.0335 19.75 2 19.75V18.25ZM2 4.25C1.0335 4.25 0.25 5.0335 0.25 6H1.75C1.75 5.86193 1.86193 5.75 2 5.75V4.25ZM2 5.75H3.97266V4.25H2V5.75ZM3.97266 18.25H2V19.75H3.97266V18.25Z"
                      fill="#9e9ef0"
                    />{" "}
                  </g>
                </svg>
              </div>
              <p className="mb-0 pb-0 ">Total Products added in store</p>
            </div>
            
          </div>

          <h3 className="mb-2 text-xl font-bold text-black">
          Orders Details
          </h3>
          <span className="text-base font-normal text-gray-600">
            This is a list of Orders Details
          </span>
        </div>
        <div>
         
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
      <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Customer Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Location
                </th> <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Images
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Product
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Price
                </th>
               
                <th className=" hidden whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Status
                </th>
               </tr>
            </thead>
          <tbody className="divide-y divide-gray-200 text-center">
                     {products.map((product) => (
                       <tr key={product.id}>
                         <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                           {product.last_name}
                         </td> 
                         <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                           {product.city}
                         </td>
                           <td className=" flex items-center justify-center">
                          
                           <img
                           src={`https://bambe.shop${product.image_url}`}
                           alt={product.name}
                             className="w-16 h-16 object-cover"
                           />
                         </td> <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                           {product.name}
                         </td>
                        
                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                           {product.description}
                         </td>
                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                           {product.price}Fwf
                         </td>
       
                      
       
                         <td className="whitespace-nowrap px-4 hidden py-2">
                           <button
                             color="light"
                             onClick={() => handleViewProduct(product)}
                           >
                             <Icon icon="carbon:view" width="24" height="24" />
                           </button>
                           <button
                             color="failure"
                             onClick={() => handleDeleteProduct(product.id)}
                           >
                             <Icon
                               icon="weui:delete-outlined"
                               width="24"
                               height="24"
                             />
                           </button>
                           
                         </td>
                         <td className=" hidden whitespace-nowrap px-4 py-2 text-gray-700">
                          <button className="bg-green-400 p-1  rounded-md text-white w-32">Panding</button>
                         </td>
       
                       </tr>
                     ))}
                   </tbody>
      </table>
      </div>
    </div>
    </div>

    
  );
};

export default Dashboard;
