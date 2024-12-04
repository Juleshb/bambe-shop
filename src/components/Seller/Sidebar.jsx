import React from 'react'
import {Link} from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
       <nav className="p-4 flex flex-col justify-between h-full">
      <ul>
        <li className="mb-2">
          <Link to="/Dashboard">
            <a className="block py-2 px-4 bg-gray-700 rounded">Dashboard</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/Addproduct">
            <a className="block py-2 px-4 hover:bg-gray-700 rounded">Add Products</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/createcategory">
            <a className="block py-2 px-4 hover:bg-gray-700 rounded">Create Categories</a>
          </Link>
        </li>
      </ul>
      <footer className="mt-auto">

        <button
           className=" justify-center items-center flex w-full py-2 px-4 text-left bg-red-300 text-black  rounded"
        ><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        
        <g id="SVGRepo_iconCarrier"> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/> </g>
        
        </svg>
          Logout
        </button>
      </footer>
    </nav>
    </aside>
  );
}

export default Sidebar