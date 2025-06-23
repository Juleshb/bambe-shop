import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../utils/axios";
import AgentSidebar from "./AgentSidebar";
import { Modal, Button, Textarea } from "flowbite-react";

const AgentInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/inquiries/agent");
      setInquiries(response.data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    try {
      await axiosInstance.post(`/api/inquiries/${selectedInquiry.id}/reply`, {
        reply_message: replyMessage
      });
      setShowReplyModal(false);
      setReplyMessage("");
      setSelectedInquiry(null);
      fetchInquiries(); // Refresh the list
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const updateInquiryStatus = async (inquiryId, status) => {
    try {
      await axiosInstance.put(`/api/inquiries/${inquiryId}`, { status });
      fetchInquiries(); // Refresh the list
    } catch (error) {
      console.error("Error updating inquiry status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.property_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || inquiry.status === filterStatus;
    const matchesPriority = filterPriority === "all" || inquiry.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate stats
  const stats = {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'new').length,
    repliedInquiries: inquiries.filter(i => i.status === 'replied').length,
    highPriority: inquiries.filter(i => i.priority === 'high').length
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries</h1>
          <p className="text-gray-600">Manage property inquiries from potential clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:email" className="text-blue-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:clock" className="text-yellow-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">New</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newInquiries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:check-circle" className="text-green-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Replied</p>
                <p className="text-2xl font-bold text-gray-900">{stats.repliedInquiries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <Icon icon="mdi:alert" className="text-red-600 text-xl" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search inquiries..."
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
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-[#38B496] flex items-center justify-center">
                            <span className="text-white font-medium">
                              {inquiry.name?.charAt(0).toUpperCase() || 'I'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {inquiry.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inquiry.email || 'No email'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inquiry.phone || 'No phone'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inquiry.property_name || 'Unknown Property'}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {inquiry.property_id || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {inquiry.message || 'No message'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
                        {inquiry.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setShowReplyModal(true);
                          }}
                          className="text-[#38B496] hover:text-[#2e9c81]"
                          title="Reply"
                        >
                          <Icon icon="mdi:reply" className="text-xl" />
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                          className="text-gray-600 hover:text-gray-800"
                          title="Close"
                        >
                          <Icon icon="mdi:close" className="text-xl" />
                        </button>
                        <button
                          onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                          className="text-blue-600 hover:text-blue-800"
                          title="Email"
                        >
                          <Icon icon="mdi:email" className="text-xl" />
                        </button>
                        <button
                          onClick={() => window.open(`tel:${inquiry.phone}`, '_blank')}
                          className="text-green-600 hover:text-green-800"
                          title="Call"
                        >
                          <Icon icon="mdi:phone" className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <Icon icon="mdi:email-outline" className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No inquiries found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" || filterPriority !== "all"
                ? "Try adjusting your search or filters" 
                : "Inquiries from potential clients will appear here"
              }
            </p>
          </div>
        )}

        {/* Reply Modal */}
        <Modal show={showReplyModal} onClose={() => setShowReplyModal(false)} size="md">
          <Modal.Header>Reply to Inquiry</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">From: {selectedInquiry?.name} ({selectedInquiry?.email})</p>
                <p className="text-sm text-gray-600 mb-2">Property: {selectedInquiry?.property_name}</p>
                <p className="text-sm text-gray-600 mb-4">Message: {selectedInquiry?.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowReplyModal(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={handleReply} disabled={!replyMessage.trim()}>
              Send Reply
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AgentInquiries; 