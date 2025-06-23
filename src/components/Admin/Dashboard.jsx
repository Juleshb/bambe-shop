import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalAgents: 0,
    totalClients: 0,
    totalInquiries: 0,
    totalCategories: 0,
    totalUsers: 0,
    recentInquiries: [],
    recentProperties: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [
        propertiesRes,
        agentsRes,
        clientsRes,
        inquiriesRes,
        categoriesRes,
        usersRes,
        recentInquiriesRes,
        recentPropertiesRes,
        recentUsersRes
      ] = await Promise.all([
        axios.get("/api/listings"),
        axios.get("/api/users"),
        axios.get("/api/customers"),
        axios.get("/api/inquiries"),
        axios.get("/api/propertycategories"),
        axios.get("/api/users"),
        axios.get("/api/inquiries?limit=5"),
        axios.get("/api/listings?limit=5"),
        axios.get("/api/users?limit=5")
      ]);

      // Filter agents from users
      const agents = usersRes.data.filter(user => user.role === 'agent');

      setStats({
        totalProperties: propertiesRes.data.length,
        totalAgents: agents.length,
        totalClients: clientsRes.data.length,
        totalInquiries: inquiriesRes.data.length,
        totalCategories: categoriesRes.data.length,
        totalUsers: usersRes.data.length,
        recentInquiries: recentInquiriesRes.data.slice(0, 5),
        recentProperties: recentPropertiesRes.data.slice(0, 5),
        recentUsers: recentUsersRes.data.slice(0, 5)
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.username || 'Admin'}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Icon icon="mdi:circle" className="w-2 h-2 mr-2" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            icon="mdi:home-city"
            color="blue"
            link="/admin/properties"
          />
          <StatCard
            title="Total Agents"
            value={stats.totalAgents}
            icon="mdi:account-tie"
            color="green"
            link="/admin/agents"
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon="mdi:account-group"
            color="purple"
            link="/admin/clients"
          />
          <StatCard
            title="Total Inquiries"
            value={stats.totalInquiries}
            icon="mdi:message-text"
            color="orange"
            link="/admin/inquiries"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                title="Add Property"
                description="Create a new property listing"
                icon="mdi:home-plus"
                color="blue"
                link="/Addproduct"
              />
              <QuickActionCard
                title="Manage Agents"
                description="View and manage agent accounts"
                icon="mdi:account-cog"
                color="green"
                link="/admin/agents"
              />
              <QuickActionCard
                title="View Inquiries"
                description="Check recent client inquiries"
                icon="mdi:message-reply-text"
                color="orange"
                link="/admin/inquiries"
              />
              <QuickActionCard
                title="System Settings"
                description="Configure platform settings"
                icon="mdi:cog"
                color="gray"
                link="/admin/settings"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
                <Link to="/admin/inquiries" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {stats.recentInquiries.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Icon icon="mdi:message-text" className="w-6 h-6 text-blue-600" />
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent inquiries</p>
              )}
            </div>
          </div>

          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
                <Link to="/admin/properties" className="text-blue-600 hover:text-blue-700 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {stats.recentProperties.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Icon icon="mdi:home" className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {property.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          ${property.price?.toLocaleString() || 'Price not set'}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent properties</p>
              )}
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalCategories}</div>
                <div className="text-sm text-gray-500">Property Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-500">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color, link }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <Link to={link} className="block p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
              <Icon icon={icon} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, color, link }) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    gray: "bg-gray-500 hover:bg-gray-600"
  };

  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
              <Icon icon={icon} className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
