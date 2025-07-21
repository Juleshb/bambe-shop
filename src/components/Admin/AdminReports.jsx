import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import axios from '../utils/axios';

const AdminReports = () => {
  const [reports, setReports] = useState({
    properties: [],
    inquiries: [],
    users: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days

  useEffect(() => {
    fetchReportData();
  }, [timeRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      
      const [propertiesRes, inquiriesRes, usersRes, categoriesRes] = await Promise.all([
        axios.get('/api/listings'),
        axios.get('/api/inquiries'),
        axios.get('/api/users'),
        axios.get('/api/propertycategories')
      ]);

      setReports({
        properties: propertiesRes.data,
        inquiries: inquiriesRes.data,
        users: usersRes.data,
        categories: categoriesRes.data
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPropertyStats = () => {
    const total = reports.properties.length;
    const active = reports.properties.filter(p => p.status === 'active').length;
    const inactive = reports.properties.filter(p => p.status === 'inactive').length;
    const pending = reports.properties.filter(p => p.status === 'pending').length;
    
    return { total, active, inactive, pending };
  };

  const getUserStats = () => {
    const total = reports.users.length;
    const admins = reports.users.filter(u => u.role === 'admin').length;
    const agents = reports.users.filter(u => u.role === 'agent').length;
    const clients = reports.users.filter(u => u.role === 'client').length;
    
    return { total, admins, agents, clients };
  };

  const getInquiryStats = () => {
    const total = reports.inquiries.length;
    const newInquiries = reports.inquiries.filter(i => i.status === 'new').length;
    const replied = reports.inquiries.filter(i => i.status === 'replied').length;
    const closed = reports.inquiries.filter(i => i.status === 'closed').length;
    
    return { total, new: newInquiries, replied, closed };
  };

  const getTopProperties = () => {
    return reports.properties
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  };

  const getRecentInquiries = () => {
    return reports.inquiries
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  };

  const getCategoryStats = () => {
    const categoryCounts = {};
    reports.properties.forEach(property => {
      const category = property.category_name || 'Uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const propertyStats = getPropertyStats();
  const userStats = getUserStats();
  const inquiryStats = getInquiryStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow-sm border rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-600">Platform insights and performance metrics</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>
                <button
                  onClick={fetchReportData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Icon icon="mdi:refresh" className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon icon="mdi:home-city" className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-semibold text-gray-900">{propertyStats.total}</p>
                <p className="text-xs text-green-600">+{propertyStats.active} active</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon icon="mdi:account-group" className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{userStats.total}</p>
                <p className="text-xs text-blue-600">{userStats.agents} agents</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon icon="mdi:message-text" className="w-8 h-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-semibold text-gray-900">{inquiryStats.total}</p>
                <p className="text-xs text-orange-600">{inquiryStats.new} new</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon icon="mdi:tag-multiple" className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-semibold text-gray-900">{reports.categories.length}</p>
                <p className="text-xs text-purple-600">Property types</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Property Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <span className="text-sm font-medium">{propertyStats.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Inactive</span>
                  </div>
                  <span className="text-sm font-medium">{propertyStats.inactive}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="text-sm font-medium">{propertyStats.pending}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Distribution */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">User Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Admins</span>
                  </div>
                  <span className="text-sm font-medium">{userStats.admins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Agents</span>
                  </div>
                  <span className="text-sm font-medium">{userStats.agents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Clients</span>
                  </div>
                  <span className="text-sm font-medium">{userStats.clients}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {getTopProperties().map((property) => (
                  <div key={property.listing_id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Icon icon="mdi:home" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {property.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${property.price?.toLocaleString() || 'Price not set'}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500">
                        {new Date(property.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {getRecentInquiries().map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Icon icon="mdi:message-text" className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {inquiry.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {inquiry.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Property Categories</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCategoryStats().map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-600">{category.count} properties</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <Icon icon="mdi:trending-up" className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Response Rate</h3>
              <p className="text-3xl font-bold text-green-600">
                {inquiryStats.total > 0 ? Math.round((inquiryStats.replied / inquiryStats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500">Inquiries responded to</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <Icon icon="mdi:home-check" className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Active Listings</h3>
              <p className="text-3xl font-bold text-blue-600">
                {propertyStats.total > 0 ? Math.round((propertyStats.active / propertyStats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500">Properties currently active</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <Icon icon="mdi:account-multiple" className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900">Agent Ratio</h3>
              <p className="text-3xl font-bold text-purple-600">
                {userStats.total > 0 ? Math.round((userStats.agents / userStats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500">Agents vs total users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports; 