import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  




  const transactions = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7zsaGnI-MnoYX3u4QtoQLvFPI0CMLJpAKw&s",
      description: "Macbook",
      date: "Apr 23, 2021",
      amount: "230,000Frw",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7zsaGnI-MnoYX3u4QtoQLvFPI0CMLJpAKw&s",

      description: "Macbook 2017 Pro",
      date: "Apr 25, 2021",
      amount: "230,000Frw",
      status: "Refunded",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7zsaGnI-MnoYX3u4QtoQLvFPI0CMLJpAKw&s",

      description: "Macbook 2020 Pro",
      date: "Apr 27, 2021",
      amount: "230,000Frw",
      status: "Pending",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ];

  return (
    <div>




















      <div className="rounded-lg bg-slate-100 h-[100vh] p-4 shadow sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className=" mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-44">

            <div className="bg-white h-52 w-80 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Products</p>
                  <p className="text-4xl ml-2 font-semibold">32</p>
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

            <div className="bg-white h-52 w-80 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Customers</p>
                  <p className="text-4xl ml-2 font-semibold">12</p>
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

            <div className="bg-white h-52 w-80 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Sales</p>
                  <p className="text-4xl ml-2 font-semibold">22</p>
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

            <div className="bg-white h-52 w-80 p-5  rounded-md shadow-2xl flex flex-col justify-between">
              <div className=" flex justify-between">
                <div>
                  <p className="text-lg text-slate-600">Total Categories</p>
                  <p className="text-4xl ml-2 font-semibold">5</p>
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
          Sales Details
          </h3>
          <span className="text-base font-normal text-gray-600">
            This is a list of Sales Details
          </span>
        </div>
        <div>
         
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-black">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-black">
                Product name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-black">
                Date &amp; Time
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-black">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-black">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-sm text-black">
                  <img className=" w-32" src={transaction.image}/>
                  
                </td>
                <td className="px-4 py-2 text-sm text-black">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-4 py-2 text-sm font-semibold text-black">
                  {transaction.amount}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${transaction.statusColor}`}
                  >
                    {transaction.status}
                  </span>
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
