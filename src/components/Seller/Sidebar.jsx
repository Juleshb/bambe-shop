import React from 'react'
import {Link} from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <nav className="p-4">
        <ul>   <Link to="/Dashboard" >
             <a  className="block py-2 px-4 bg-gray-700 rounded">
              Dashboard
            </a>           </Link>

           <li className="mb-2">
           
           <Link to="/Addproduct" >
              <a
              
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
             Add Products
            </a>
           </Link>
         
          </li>

           <li className="mb-2">
           
           <Link to="/createcategory" >
              <a
              
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Create Categories
            </a>
           </Link>
         
          </li>
         
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar