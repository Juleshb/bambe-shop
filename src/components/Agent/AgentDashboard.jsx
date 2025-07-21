import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AgentSidebar from "./AgentSidebar";
import { useAuth } from '../context/AuthContext';
import Logo from "../assets/logo-black.png";

const AgentDashboard = () => {
  const { user, login } = useAuth();
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
    // Fetch latest agent status
    const fetchAgentStatus = async () => {
      if (user && user.id) {
        try {
          const res = await axiosInstance.get(`/api/users/${user.id}`);
          if (res.data.status && res.data.status !== user.status) {
            const updatedUser = { ...user, status: res.data.status };
            login(updatedUser, 'agent');
            localStorage.setItem('userData', JSON.stringify(updatedUser));
          }
        } catch (err) {
          // ignore
        }
      }
    };
    fetchAgentStatus();
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
    <div className="min-h-screen bg-[#f8f8f8] font-[Inter,system-ui,sans-serif]">
      {/* Logo above sidebar */}
      <div className="fixed top-0 left-0 z-50 w-64 flex items-center justify-center bg-white border-b border-gray-100 h-20">
        <img src={Logo} alt="Logo" className="h-12 object-contain" />
      </div>
      {/* Sidebar */}
      <AgentSidebar />
      <div className="ml-64 flex-1 p-8">
        {/* Welcome Banner */}
        <div className="bg-white/90 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center justify-between mb-8" style={{backdropFilter: 'blur(2px)'}}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight" style={{fontFamily:'Inter,system-ui,sans-serif'}}>Welcome, {user?.username || 'Agent'}!</h1>
            <p className="text-gray-500 text-sm">Manage your properties, clients, and performance.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#38B496]/10 text-[#38B496] border border-[#38B496]">{user?.status === 'active' ? 'Active' : user?.status === 'pending' ? 'Pending Activation' : (user?.status || 'Unknown')}</span>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:account-tie" className="text-[#38B496] text-3xl" />
              <span className="text-gray-700 font-medium text-base">Agent</span>
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 rounded-2xl shadow p-6 flex flex-col items-center">
            <Icon icon="mdi:home" className="text-[#38B496] text-3xl mb-2" />
            <div className="text-2xl font-bold text-gray-900" style={{fontFamily:'Inter,system-ui,sans-serif'}}>{stats.totalProperties}</div>
            <div className="text-xs text-gray-500 mt-1">Total Properties</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow p-6 flex flex-col items-center">
            <Icon icon="mdi:account-group" className="text-[#38B496] text-3xl mb-2" />
            <div className="text-2xl font-bold text-gray-900" style={{fontFamily:'Inter,system-ui,sans-serif'}}>{stats.totalClients}</div>
            <div className="text-xs text-gray-500 mt-1">Clients</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow p-6 flex flex-col items-center">
            <Icon icon="mdi:currency-rwf" className="text-[#38B496] text-3xl mb-2" />
            <div className="text-2xl font-bold text-gray-900" style={{fontFamily:'Inter,system-ui,sans-serif'}}>RWF {stats.monthlyRevenue?.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Revenue (This Month)</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow p-6 flex flex-col items-center">
            <Icon icon="mdi:eye" className="text-[#38B496] text-3xl mb-2" />
            <div className="text-2xl font-bold text-gray-900" style={{fontFamily:'Inter,system-ui,sans-serif'}}>{stats.totalViews}</div>
            <div className="text-xs text-gray-500 mt-1">Total Views</div>
          </div>
        </div>
        {/* Recent Listings & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <div className="bg-white/90 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily:'Inter,system-ui,sans-serif'}}>Recent Listings</h3>
            {recentListings.length === 0 ? (
              <div className="text-center py-8">
                <Icon icon="mdi:home-outline" className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-400">No listings yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex-shrink-0">
                      {listing.images && listing.images.length > 0 ? (
                        <img
                          src={`https://bambe.shop${listing.images[0].image_url}`}
                          alt={listing.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                          <Icon icon="mdi:home" className="text-gray-400 text-xl" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-gray-900 truncate" style={{fontFamily:'Inter,system-ui,sans-serif'}}>
                        {listing.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
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
          {/* Recent Inquiries */}
          <div className="bg-white/90 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily:'Inter,system-ui,sans-serif'}}>Recent Inquiries</h3>
            {recentInquiries.length === 0 ? (
              <div className="text-center py-8">
                <Icon icon="mdi:email-outline" className="text-gray-300 text-5xl mx-auto mb-4" />
                <p className="text-gray-400">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-base font-medium text-gray-900" style={{fontFamily:'Inter,system-ui,sans-serif'}}>
                          {inquiry.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {inquiry.email}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
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
    </div>
  );
};

export default AgentDashboard; 