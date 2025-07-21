import React, { useState, useEffect } from "react";
import { HiUpload } from "react-icons/hi";
import axiosInstance from "../utils/axios";
import { Icon } from "@iconify/react";
import { Modal, TextInput, Label, Select, Table } from "flowbite-react";
import { Button } from "primereact/button";

import axios from "axios";
export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    location: "",
    listing_type: "sale",
    coordinates: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [Newcategory, setNewCategory] = useState([]);
  const categoryAPI="https://bambe.shop/api/categories";


  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoryAPI);
      setNewCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

 



   useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, listingsRes] = await Promise.all([
          axiosInstance.get("/api/propertycategories"),
          axiosInstance.get("/api/listings"),
        ]);
        setCategories(categoriesRes.data);
        setProducts(listingsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
 
  const handleDeleteListing = async (listingId) => {
    try {
      await axiosInstance.delete(`/api/listings/${listingId}`);
      setProducts(products.filter((listing) => listing.listing_id !== listingId));
    } catch (err) {
      console.error("Error deleting listing:", err.message);
    }
  };

  const handleViewListing = (listing) => {
    setCurrentProduct(listing);
    setIsViewModalOpen(true);
  }; 


  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(files[0]); // Preview the first image
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const listingResponse = await axiosInstance.post("/api/listings", {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id),
        location: formData.location,
        listing_type: formData.listing_type,
        coordinates: formData.coordinates,
      });

      const listingId = listingResponse.data.id;

      if (formData.images && formData.images.length > 0) {
        const imageData = new FormData();
        for (let i = 0; i < formData.images.length; i++) {
          imageData.append('images', formData.images[i]);
        }
        imageData.append('listing_id', listingId);
        // Do NOT set Content-Type header manually
        await axiosInstance.post("/api/listing-images", imageData);
      }

      alert("Listing added successfully!");
      setFilePreview(null);

      const updatedListings = await axiosInstance.get("/api/listings");
      setProducts(updatedListings.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        category_id: "",
        location: "",
        listing_type: "sale",
        coordinates: "",
        images: null,
      });
    } catch (err) {
      console.error("Error adding listing:", err.message);
      alert("Error adding listing: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };
 
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/propertycategories", {
        category_name: newCategoryName.trim()
      });
      
      // Refresh categories list
      const categoriesResponse = await axiosInstance.get("/api/propertycategories");
      setCategories(categoriesResponse.data);
      
      // Auto-select the newly created category
      const newCategory = categoriesResponse.data.find(cat => cat.category_name === newCategoryName.trim());
      if (newCategory) {
        setFormData(prev => ({
          ...prev,
          category_id: newCategory.category_id.toString()
        }));
      }
      
      // Close modal and reset form
      setIsCategoryModalOpen(false);
      setNewCategoryName("");
      
      alert("Property category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    }
  };
 
  return (
   
    <div className="py-5 px-4">
    <div className="flex justify-between">
        <h1 className="lg:text-2xl font-semibold text-[#003049] mb-5">
          Listings Management
        </h1>
        <div className="flex gap-5 items-center">
        <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm mt-2 bg-[#38B496] rounded-md p-2 text-white pl-4 pr-4 hover:bg-[#2a8b7e] transition-all"
      > Add Listing</button>
        </div>
      </div>
          <div>
         

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Listing</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Listing Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Beautiful 3-bedroom house'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Property Category
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="block w-full mt-1 border border-green-500 p-2 pl-3"
                      required
                    >
                      <option value="">Select property category</option>
                      {categories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="mt-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Add New
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder='Kigali, Rwanda'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="listing_type" className="block text-sm font-medium text-gray-700">
                    Listing Type
                  </label>
                  <select
                    id="listing_type"
                    name="listing_type"
                    value={formData.listing_type}
                    onChange={handleChange}
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='500000'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Describe the property...'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
                    Coordinates (optional)
                  </label>
                  <input
                    id="coordinates"
                    name="coordinates"
                    value={formData.coordinates}
                    onChange={handleChange}
                    placeholder='-1.9441,30.0619'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Property Images
                  </label>
                  
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <HiUpload className="text-4xl text-gray-300" />
                      
                      <p className="py-1 text-sm text-gray-600">Upload a file or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <input type="file" name="images" className="hidden" onChange={handleFileChange} accept="image/*" multiple />
                      {filePreview && (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="h-24 w-24 object-cover rounded mb-4"
                        />
                      )}
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2  mt-2 rounded hover:bg-gray-400"
                >
                <Icon icon="hugeicons:cancel-circle" width="24" height="24" />
                </button>
              <button
                type="submit"
                className="text-xl mt-2 bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Icon icon="line-md:loading-loop" width="24" height="24" /> : <Icon icon="ic:outline-save" width="24" height="24" />}
              </button>
              </div>
            </form>
            </div>
        </div>
      )}
            <div className="mt-10">
              <p className="text-xl font-bold">My Listings</p>
            </div>

<div className="rounded-lg shadow overflow-hidden mt-5 bg-white">

<table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No listings found. Add your first listing!
                  </td>
                </tr>
              ) : (
                products.map((listing) => (
                  <tr key={listing.listing_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {listing.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {listing.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ${listing.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {listing.images && listing.images.length > 0 ? (
                        <div className="flex space-x-2">
                          {listing.images.map((image) => (
                            <img
                              key={image.id}
                              src={`https://bambe.shop${image.image_url}`}
                              alt={listing.title}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          color="light"
                          onClick={() => handleViewListing(listing)}
                        >
                          <Icon icon="carbon:view" width="24" height="24" />
                        </button>
                        <button
                          color="failure"
                          onClick={() => handleDeleteListing(listing.listing_id)}
                        >
                          <Icon icon="weui:delete-outlined" width="24" height="24" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
</div>
          </div>
      {isViewModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2  mt-2 rounded hover:bg-gray-400"
                >
                <Icon icon="hugeicons:cancel-circle" width="24" height="24" />
                </button>

            <h2 className="text-xl font-bold">{currentProduct.title}</h2>
            <p>{currentProduct.description}</p>
            <p>Price: ${currentProduct.price}</p>
            <p>Location: {currentProduct.location}</p>
            <p>Type: {currentProduct.listing_type}</p>
            <h3 className="text-lg font-semibold mt-4">Images</h3>
            <div className="flex space-x-2 mt-2">
              {currentProduct.images && currentProduct.images.map((image) => (
                <img
                  key={image.id}
                  src={`https://bambe.shop${image.image_url}`}
                  alt={currentProduct.title}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
        </div>
        </div>
      )}
      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Property Category</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label htmlFor="newCategoryName" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  id="newCategoryName"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="block w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryModalOpen(false);
                    setNewCategoryName("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
  );
}