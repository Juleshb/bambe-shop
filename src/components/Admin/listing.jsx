import React, { useState, useEffect } from "react";
import { HiUpload, HiX, HiEye, HiTrash, HiPlus } from "react-icons/hi";
import axiosInstance from "../utils/axios";
import { Modal, Spinner, Alert } from "flowbite-react";
import { Button } from "primereact";
import { Icon } from "@iconify/react";
import LocationPicker from "./LocationPicker";

export default function ListingManagement() {
  // State management
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [Newcategory, setNewCategory] = useState([]);
  

  // Form data
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    location: "",
    listing_type: "sale",
    coordinates: ""
  });

  // Listing types for dropdown
  const listingTypes = [
    { label: "For Sale", value: "sale" },
    { label: "For Rent", value: "rent" }
  ];

  // Fetch categories separately like in AddProduct component
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/propertycategories");
      setNewCategory(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch listings
  const fetchListings = async () => {
    try {
      const response = await axiosInstance.get("/api/listings/userlistings");
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchListings();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file size (max 10MB each)
    const oversizedFiles = selectedFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Some files exceed 10MB limit");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setFiles(selectedFiles);
    
    // Create previews
    const previews = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === selectedFiles.length) {
          setFilePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove a file preview
  const removeFilePreview = (index) => {
    const newPreviews = [...filePreviews];
    const newFiles = [...files];
    newPreviews.splice(index, 1);
    newFiles.splice(index, 1);
    setFilePreviews(newPreviews);
    setFiles(newFiles);
  };

  // Submit new listing
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate category selection - using the same approach as AddProduct
    if (!formData.category_id) {
      setError("Please select a category");
      return;
    }

    try {
      setIsLoading(true);
      // First create the listing
      const listingResponse = await axiosInstance.post("/api/listings", {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        listing_type: formData.listing_type,
        coordinates: formData.coordinates,
        category_id: formData.category_id // Using the direct value like in AddProduct
      });
      
      const listingId = listingResponse.data.id;

      // Then upload images if any
      if (files.length > 0) {
        const formDataImages = new FormData();
        formDataImages.append("listing_id", listingId);
        files.forEach(file => {
          formDataImages.append("images", file);
        });

        await axiosInstance.post("/api/listing-images", formDataImages, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // Refresh listings
      await fetchListings();

      // Reset form and show success
      setSuccess("Listing created successfully!");
      setTimeout(() => setSuccess(null), 3000);
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err.response?.data?.message || "Failed to create listing. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a listing
  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/api/listings/${listingId}`);
      setListings(listings.filter(listing => listing.id !== listingId));
      setSuccess("Listing deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error deleting listing:", err);
      setError("Failed to delete listing. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  // View listing details
  const handleViewListing = (listing) => {
    setCurrentListing(listing);
    setIsViewModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      category_id: "",
      title: "",
      description: "",
      price: "",
      location: "",
      listing_type: "sale",
      coordinates: ""
    });
    setFilePreviews([]);
    setFiles([]);
  };

  return (
    <div className="py-5 px-4">
      <div className=" bg-green-100 text-green-800 p-4 flex justify-between">
        <h1 className="lg:text-2xl font-semibold text-[#003049] mb-5">
          Listings Management
        </h1>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm mt-2 bg-[#38B496] rounded-md p-2 text-white pl-4 pr-4 hover:bg-[#2a8b7e] transition-all"
          > 
            Add Listing
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert color="success" className="mb-4">
          {success}
        </Alert>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Listing</h2>
            <form >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 w-full">
                {/* Title */}
                <div className="lg:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Listing Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Luxury Apartment in New York'
                    className="block w-full mt-1 border border-green-500 p-2 pl-3 rounded"
                    required
                  />
                </div>

                {/* Category - Updated to match AddProduct approach */}
                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="block w-full mt-1 border border-green-500 p-2 pl-3"
                    required
                  >
                    <option value="">Select Category</option>
                    {Newcategory.map((category) => (
                      <option key={category.category_id} value={category.category_id}>
                      {category.category_name || category.name}
                      </option>
                    ))}

                  </select>
                </div>

                {/* Listing Type */}
                <div>
                  <label htmlFor="listing_type" className="block text-sm font-medium text-gray-700">
                    Listing Type
                  </label>
                  <select
                    id="listing_type"
                    name="listing_type"
                    value={formData.listing_type}
                    onChange={handleChange}
                    className="block w-full mt-1 border border-green-500 p-2 pl-3 rounded"
                    required
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                {/* Price */}
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
                    placeholder="RWF 250,000"
                    className="block w-full mt-1 border border-green-500 p-2 pl-3 rounded"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York"
                    className="block w-full mt-1 border border-green-500 p-2 pl-3 rounded"
                    required
                  />
                </div>

                {/* Coordinates */}
                <div>
                  <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700">
                    Coordinates
                  </label>
                  <LocationPicker 
  value={formData.coordinates}
  onChange={(coords) => setFormData({...formData, coordinates: coords})}
/>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="3-bedroom apartment with amazing views of Central Park..."
                    className="block w-full mt-1 border border-green-500 p-2 pl-3 rounded"
                    rows={4}
                    required
                  ></textarea>
                </div>

                {/* Images */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Property Images
                  </label>
                  <div className="flex items-center justify-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600">Upload files or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB each (max 15 files)</p>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange} 
                        multiple
                        accept="image/*"
                      />
                    </label>
                  </div>
                  
                  {/* Image Previews */}
                  {filePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {filePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeFilePreview(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <HiX className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-all"
                >
                  <HiX className="h-5 w-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="line-md:loading-loop" width="24" height="24" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon icon="ic:outline-save" width="24" height="24" />
                      Save Listing
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-full bg-green-100 text-green-800 p-4 flex items-center justify-between">
        <Icon icon="mdi:home-search" className="h-6 w-6 mr-2" />
        <p className="text-sm font-bold">My Listings</p>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mt-5">
        {isLoading && listings.length === 0 ? (
          <div className="flex justify-center items-center p-8">
            <Spinner size="xl" />
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No listings found. Create your first listing!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                      {listing.images?.length > 0 ? (
                        <div className="flex items-center">
                          <img
                            src={`http://localhost:4800${listing.images[0].url}`}
                            alt={listing.title}
                            className="h-10 w-10 object-cover rounded"
                            onClick={() => handleViewListing(listing)}
                          />
                          {listing.images.length > 1 && (
                            <span className="ml-1 text-xs bg-gray-100 rounded-full px-2 py-1">
                              +{listing.images.length - 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">No images</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 max-w-xs truncate">
                      {listing.title || listing.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {categories.find(c => c.id === listing.category_id)?.name || 
                       categories.find(c => c.id === listing.category_id)?.category_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        listing.listing_type === 'sale' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {listing.listing_type === 'sale' ? 'Sale' : 'Rent'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      RWF {listing.price?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {listing.location}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewListing(listing)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="View"
                        >
                          <HiEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <Spinner size="sm" />
                          ) : (
                            <HiTrash className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Listing Modal */}
      <Modal show={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} size="4xl">
        {currentListing && (
          <>
            <Modal.Header>{currentListing.name}</Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Listing Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="mt-1 text-gray-900">{currentListing.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Category</p>
                        <p className="mt-1 text-gray-900">
                          {categories.find(c => c.id === currentListing.category_id)?.name || 
                           categories.find(c => c.id === currentListing.category_id)?.category_name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            currentListing.listing_type === 'sale' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {currentListing.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p className="mt-1 text-gray-900">RWF {currentListing.price?.toLocaleString() || '0'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1 text-gray-900">{currentListing.location}</p>
                      </div>
                    </div>

                    {currentListing.coordinates && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Coordinates</p>
                        <p className="mt-1 text-gray-900">{currentListing.coordinates}</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Images Gallery */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
                  {currentListing.images?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {currentListing.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`http://localhost:4800${image.url}`}
                            alt={`${currentListing.title} - ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-gray-500">
                      No images available
                    </div>
                  )}
                </div>

              
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => setIsViewModalOpen(false)}
                label="Close"
                severity="secondary"
              />
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}