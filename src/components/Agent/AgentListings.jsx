import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import AgentSidebar from "./AgentSidebar";
import { Modal, Button } from "flowbite-react";

const AgentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/listings/userlistings");
      setListings(response.data || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/listings/${selectedListing.id}`);
      setListings(listings.filter(listing => listing.id !== selectedListing.id));
      setShowDeleteModal(false);
      setSelectedListing(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'rented': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || listing.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex">
        <AgentSidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38B496]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AgentSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            <button
              onClick={() => window.location.href = '/agent/add-listing'}
              className="bg-[#38B496] text-white px-6 py-2 rounded-lg hover:bg-[#2e9c81] transition-colors flex items-center"
            >
              <Icon icon="mdi:plus" className="mr-2" />
              Add Listing
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={`http://localhost:4800${listing.images[0].url}`}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Icon icon="mdi:home" className="text-gray-400 text-4xl" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                    {listing.status || 'Active'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {listing.listing_type || 'Sale'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {listing.name}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex items-center text-gray-500 mb-3">
                  <Icon icon="mdi:map-marker" className="mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-[#38B496]">
                    RWF {listing.price?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.location.href = `/agent/edit-listing/${listing.id}`}
                    className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <Icon icon="mdi:pencil" className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => window.location.href = `/listing/${listing.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Icon icon="mdi:eye" className="mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedListing(listing);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Icon icon="mdi:delete" className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Icon icon="mdi:home-outline" className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filters" 
                : "Get started by adding your first property listing"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={() => window.location.href = '/agent/add-listing'}
                className="bg-[#38B496] text-white px-6 py-3 rounded-lg hover:bg-[#2e9c81] transition-colors"
              >
                Add Your First Listing
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Header>Confirm Delete</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete "{selectedListing?.name}"? This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="gray" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AgentListings; 