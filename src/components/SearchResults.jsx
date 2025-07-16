import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../components/utils/axios";
import Footer from './navs/Footer'
import Nav from './navs/Nav'

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) return;
      try {
        const res = await axiosInstance.get(`/api/search?keyword=${searchTerm}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <>
      <Nav />
      <div className=' lg:pl-48  lg:mr-48'>
      <div className="container mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Search Results for: <span className="text-[#38B496]">{searchTerm}</span>
        </h2>

        {searchResults.length === 0 ? (
          <p className="text-center text-gray-600">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <Link to={item.type === "listing" ? `/listing/${item.id}` : `/product/${item.id}`}>
                  <img
                    className="h-36 sm:h-44 object-contain"
                    src={item.images?.length > 0 ? `http://localhost:4800${item.images[0].url}` : "placeholder-image-url"}
                    alt={item.name}
                  />
                  <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                  <p className="text-gray-600">{item.price} RWF</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchResults;
