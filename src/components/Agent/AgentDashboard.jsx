import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AgentDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    pendingListings: 0,
    totalClients: 0,
    monthlyRevenue: 0,
    totalViews: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [listingsRes, inquiriesRes, customersRes] = await Promise.all([
        axiosInstance.get("/api/listings/userlistings"),
        axiosInstance.get("/api/inquiries/agent"),
        axiosInstance.get("/api/customers")
      ]);

      // Calculate stats
      const listings = listingsRes.data || [];
      const inquiries = inquiriesRes.data || [];
      const customers = customersRes.data || [];
      
      const activeListings = listings.filter(l => l.status === 'active').length;
      const pendingListings = listings.filter(l => l.status === 'pending').length;
      
      setStats({
        totalProperties: listings.length,
        activeListings,
        pendingListings,
        totalClients: customers.length,
        monthlyRevenue: calculateMonthlyRevenue(listings),
        totalViews: calculateTotalViews(listings)
      });

      setRecentListings(listings.slice(0, 5));
      setRecentInquiries(inquiries.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Set default values if API fails
      setStats({
        totalProperties: 0,
        activeListings: 0,
        pendingListings: 0,
        totalClients: 0,
        monthlyRevenue: 0,
        totalViews: 0
      });
      setRecentListings([]);
      setRecentInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyRevenue = (listings) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return listings
      .filter(listing => {
        const listingDate = new Date(listing.created_at);
        return listingDate.getMonth() === currentMonth && 
               listingDate.getFullYear() === currentYear;
      })
      .reduce((total, listing) => total + (listing.price || 0), 0);
  };

  const calculateTotalViews = (listings) => {
    return listings.reduce((total, listing) => total + (listing.views || 0), 0);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38B496]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
              <p className="text-gray-600">Manage your properties and clients</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#38B496]"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <Link
                to="/agent/add-listing"
                className="bg-[#38B496] text-white px-4 py-2 rounded-md hover:bg-[#2e9c81] transition-colors"
              >
                <Icon icon="mdi:plus" className="inline mr-2" />
                Add Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:home" className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:check-circle" className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:clock" className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingListings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:account-group" className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:currency-usd" className="text-indigo-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">RWF {stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:eye" className="text-red-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
                <Link
                  to="/agent/listings"
                  className="text-[#38B496] hover:text-[#2e9c81] text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentListings.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="mdi:home-outline" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No listings yet</p>
                  <Link
                    to="/agent/add-listing"
                    className="text-[#38B496] hover:text-[#2e9c81] text-sm font-medium"
                  >
                    Add your first property
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={`http://localhost:4800${listing.images[0].url}`}
                            alt={listing.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Icon icon="mdi:home" className="text-gray-400 text-xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {listing.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {listing.location}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-medium text-[#38B496]">
                            RWF {listing.price?.toLocaleString()}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                            {listing.status || 'Active'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Link
                          to={`/agent/listing/${listing.id}`}
                          className="text-[#38B496] hover:text-[#2e9c81]"
                        >
                          <Icon icon="mdi:arrow-right" className="text-xl" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Inquiries</h3>
                <Link
                  to="/agent/inquiries"
                  className="text-[#38B496] hover:text-[#2e9c81] text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentInquiries.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="mdi:email-outline" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No inquiries yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {inquiry.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {inquiry.email}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {inquiry.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(inquiry.created_at).toLocaleDateString()}
                            </span>
                            {inquiry.property_name && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {inquiry.property_name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <button className="text-[#38B496] hover:text-[#2e9c81]">
                            <Icon icon="mdi:reply" className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/agent/add-listing"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon icon="mdi:plus-circle" className="text-[#38B496] text-2xl mr-3" />
              <div>
                <p className="font-medium text-gray-900">Add Property</p>
                <p className="text-sm text-gray-500">Create new listing</p>
              </div>
            </Link>

            <Link
              to="/agent/listings"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon icon="mdi:format-list-bulleted" className="text-[#38B496] text-2xl mr-3" />
              <div>
                <p className="font-medium text-gray-900">Manage Listings</p>
                <p className="text-sm text-gray-500">View all properties</p>
              </div>
            </Link>

            <Link
              to="/agent/clients"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon icon="mdi:account-group" className="text-[#38B496] text-2xl mr-3" />
              <div>
                <p className="font-medium text-gray-900">Client Management</p>
                <p className="text-sm text-gray-500">Manage clients</p>
              </div>
            </Link>

            <Link
              to="/agent/reports"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon icon="mdi:chart-line" className="text-[#38B496] text-2xl mr-3" />
              <div>
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-sm text-gray-500">View analytics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard; 