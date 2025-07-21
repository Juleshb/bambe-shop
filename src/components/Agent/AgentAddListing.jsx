import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import AgentSidebar from "./AgentSidebar";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../Admin/LocationPicker";
import { useAuth } from '../context/AuthContext';
import Nav from '../navs/Nav';
import Footer from '../navs/Footer';
import { HiUpload } from "react-icons/hi";

const AgentAddListing = () => {
  const navigate = useNavigate();
  const { user, userType } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [agentStatus, setAgentStatus] = useState('checking');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    coordinates: "",
    listing_type: "sale",
    category_id: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    status: "pending"
  });

  useEffect(() => {
    fetchCategories();
    // Check agent status
    const fetchAgentStatus = async () => {
      if (userType === 'agent' && user?.id) {
        try {
          const res = await axiosInstance.get(`/api/users/${user.id}`);
          setAgentStatus(res.data.status);
        } catch {
          setAgentStatus('unknown');
        }
      } else {
        setAgentStatus('unknown');
      }
    };
    fetchAgentStatus();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/propertycategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      setIsCategoryModalOpen(false);
      setNewCategoryName("");
      alert("Property category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    // Generate previews for all selected images
    const previews = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === selectedFiles.length) {
          setFilePreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (selectedFiles.length === 0) setFilePreviews([]);
  };

  const removeImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  const handleLocationSelect = (location, coordinates) => {
    setFormData(prev => ({
      ...prev,
      location,
      coordinates: `${coordinates.lat}, ${coordinates.lng}`
    }));
    setShowLocationPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agentStatus !== 'active') {
      alert('You must pay 5000 RWF to activate your agent account before adding products.');
      navigate('/agent-payment', { state: { agentId: user?.id, phone: user?.phone } });
      return;
    }
    
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    if (files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      
      // POST listing data as JSON (not FormData)
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
      // POST images as FormData
      if (files.length > 0) {
        const imageData = new FormData();
        for (let i = 0; i < files.length; i++) {
          imageData.append('images', files[i]);
        }
        imageData.append('listing_id', listingId);
        await axiosInstance.post("/api/listing-images", imageData);
      }
      alert("Listing created successfully!");
      setFilePreviews([]);
      setFiles([]);
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        coordinates: "",
        listing_type: "sale",
        category_id: "",
      });
      setIsModalOpen(false);
      navigate("/agent/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Error creating listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (agentStatus !== 'active' && agentStatus !== 'checking') {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-[#f8f8f8] flex flex-col justify-center items-center py-12 px-4">
          <div className="w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="bg-white/90 rounded-2xl shadow-lg p-10 mt-0" style={{backdropFilter: 'blur(2px)'}}>
              <div className="flex flex-col items-center mb-6">
                <Icon icon="mdi:alert-circle" className="text-[#F15C26] text-5xl mb-3" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Account Not Activated</h2>
                <p className="text-sm text-gray-500 text-center mb-4">To add products as an agent, you must activate your account by paying <span className='text-[#38B496] font-semibold'>5000 RWF</span> with Flutterwave.</p>
              </div>
              <button
                onClick={() => navigate('/agent-payment', { state: { agentId: user?.id, phone: user?.phone } })}
                className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed shadow mb-2"
              >
                <Icon icon="mdi:credit-card" className="mr-2 text-lg" />
                Go to Payment
              </button>
              <div className="mt-4 text-xs text-gray-400 text-center">
                Your account will be activated instantly after payment.<br />If you have already paid, please refresh this page.
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex">
      <AgentSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Listing</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm bg-[#38B496] rounded-md p-2 text-white pl-4 pr-4 hover:bg-[#2a8b7e] transition-all"
          >
            Add Listing
          </button>
        </div>
        {/* Modal-based Add Listing Form */}
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
                      onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                    <div className="flex gap-2 mt-1">
                      <input
                        id="coordinates"
                        name="coordinates"
                        value={formData.coordinates}
                        placeholder="Click to select location"
                        readOnly
                        className="block w-full border border-green-500 p-2 pl-3 rounded cursor-pointer"
                        onClick={() => setShowLocationPicker(true)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLocationPicker(true)}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                      >
                        <Icon icon="mdi:map-marker" width="20" height="20" />
                        Pick
                      </button>
                    </div>
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
                      </label>
                    </div>
                    {/* Show all selected image previews with remove option */}
                    {filePreviews.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {filePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img src={preview} alt={`Preview ${idx + 1}`} className="h-16 w-16 object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1 text-red-500 hover:text-red-700 group-hover:visible invisible"
                            >
                              <Icon icon="mdi:close" width="18" height="18" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    <Icon icon="hugeicons:cancel-circle" width="24" height="24" />
                  </button>
                  <button
                    type="submit"
                    className="text-xl bg-green-400 rounded-md p-2 text-white pl-4 pr-4 hover:bg-green-800 transition-all"
                    disabled={loading}
                  >
                    {loading ? <Icon icon="line-md:loading-loop" width="24" height="24" /> : <Icon icon="ic:outline-save" width="24" height="24" />}
                  </button>
                </div>
              </form>
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
        {/* Location Picker Modal */}
        {showLocationPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-96">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Pick Location</h3>
                <button
                  onClick={() => setShowLocationPicker(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="mdi:close" className="text-xl" />
                </button>
              </div>
              <LocationPicker
                value={formData.coordinates}
                onChange={(coords) => {
                  setFormData((prev) => ({ ...prev, coordinates: coords }));
                  setShowLocationPicker(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentAddListing; 