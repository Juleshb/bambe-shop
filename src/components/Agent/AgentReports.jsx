import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import AgentSidebar from "./AgentSidebar";

const AgentReports = () => {
  const [reports, setReports] = useState({
    listings: [],
    inquiries: [],
    clients: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalClients: 0,
    monthlyRevenue: 0,
    totalViews: 0
  });

  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const [listingsRes, inquiriesRes, clientsRes, inquiryStatsRes] = await Promise.all([
        axiosInstance.get("/api/listings/userlistings"),
        axiosInstance.get("/api/inquiries/agent"),
        axiosInstance.get("/api/customers"),
        axiosInstance.get("/api/inquiries/stats")
      ]);

      const listings = listingsRes.data || [];
      const inquiries = inquiriesRes.data || [];
      const clients = clientsRes.data || [];
      const inquiryStats = inquiryStatsRes.data || {};

      // Calculate stats
      const activeListings = listings.filter(l => l.status === 'active').length;
      const monthlyRevenue = calculateMonthlyRevenue(listings);
      const totalViews = calculateTotalViews(listings);

      setStats({
        totalListings: listings.length,
        activeListings,
        totalInquiries: inquiries.length,
        newInquiries: inquiryStats.new_inquiries || 0,
        totalClients: clients.length,
        monthlyRevenue,
        totalViews
      });

      setReports({
        listings,
        inquiries,
        clients
      });
    } catch (error) {
      console.error("Error fetching report data:", error);
      setStats({
        totalListings: 0,
        activeListings: 0,
        totalInquiries: 0,
        newInquiries: 0,
        totalClients: 0,
        monthlyRevenue: 0,
        totalViews: 0
      });
      setReports({
        listings: [],
        inquiries: [],
        clients: []
      });
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

  const getInquiryStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Track your performance and insights</p>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Performance Overview</h2>
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
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:home" className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                <p className="text-sm text-green-600">
                  {stats.activeListings} active
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:email" className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
                <p className="text-sm text-blue-600">
                  {stats.newInquiries} new
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:currency-usd" className="text-purple-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">RWF {stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">
                  +12% from last month
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:eye" className="text-indigo-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                <p className="text-sm text-green-600">
                  +8% from last month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Listings</h3>
            </div>
            <div className="p-6">
              {reports.listings.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="mdi:home-outline" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No listings found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.listings.slice(0, 5).map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                      <div className="flex-shrink-0">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={`https://bambe.shop${listing.images[0].image_url}`}
                            alt={listing.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Icon icon="mdi:home" className="text-gray-400" />
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Inquiries</h3>
            </div>
            <div className="p-6">
              {reports.inquiries.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="mdi:email-outline" className="text-gray-400 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No inquiries found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {inquiry.name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {inquiry.email || 'No email'}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {inquiry.message || 'No message'}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'Unknown'}
                            </span>
                            {inquiry.property_name && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {inquiry.property_name}
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInquiryStatusColor(inquiry.status)}`}>
                              {inquiry.status || 'New'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Listing Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Listings</span>
                  <span className="text-sm font-medium">{stats.activeListings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="text-sm font-medium">{stats.totalViews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Price</span>
                  <span className="text-sm font-medium">
                    RWF {reports.listings.length > 0 ? (reports.listings.reduce((sum, l) => sum + (l.price || 0), 0) / reports.listings.length).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Inquiry Performance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Inquiries</span>
                  <span className="text-sm font-medium">{stats.totalInquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Inquiries</span>
                  <span className="text-sm font-medium">{stats.newInquiries}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-medium">
                    {stats.totalInquiries > 0 ? Math.round((stats.totalInquiries - stats.newInquiries) / stats.totalInquiries * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Export Reports</h3>
          <div className="flex space-x-4">
            <button className="bg-[#38B496] text-white px-4 py-2 rounded-lg hover:bg-[#2e9c81] transition-colors flex items-center">
              <Icon icon="mdi:download" className="mr-2" />
              Export to PDF
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Icon icon="mdi:file-excel" className="mr-2" />
              Export to Excel
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
              <Icon icon="mdi:share" className="mr-2" />
              Share Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentReports; 