import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const ClientInquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    if (!token) {
      navigate('/client-login');
      return;
    }

    fetchInquiryDetail();
  }, [id, navigate]);

  const fetchInquiryDetail = async () => {
    try {
      console.log('Fetching inquiry detail for ID:', id);
      const response = await axios.get(`/api/inquiries/client/${id}`);
      console.log('Inquiry detail response:', response.data);
      setInquiry(response.data);
    } catch (error) {
      console.error('Error fetching inquiry:', error);
      setError('Failed to load inquiry details');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    setSendingReply(true);
    try {
      console.log('Sending client reply:', replyMessage);
      const response = await axios.post(`/api/inquiries/client/${id}/reply`, 
        { client_message: replyMessage }
      );
      console.log('Reply response:', response.data);
      
      setReplyMessage('');
      fetchInquiryDetail(); // Refresh the inquiry data
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-[#38B496] bg-opacity-10 text-[#38B496]';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'client_replied': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'New';
      case 'replied': return 'Agent Replied';
      case 'client_replied': return 'Client Replied';
      case 'closed': return 'Closed';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#38B496]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/client-dashboard')}
            className="bg-[#38B496] text-white px-4 py-2 rounded hover:bg-[#F15C26] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inquiry Not Found</h2>
          <button
            onClick={() => navigate('/client-dashboard')}
            className="bg-[#38B496] text-white px-4 py-2 rounded hover:bg-[#F15C26] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/client-dashboard')}
            className="flex items-center text-[#38B496] hover:text-[#F15C26] mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Name</label>
                  <p className="mt-1 text-sm text-gray-900">{inquiry.property_name || 'N/A'}</p>
                </div>
                {inquiry.price && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <p className="mt-1 text-sm text-gray-900">RWF {inquiry.price.toLocaleString()}</p>
                  </div>
                )}
                {inquiry.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 text-sm text-gray-900">{inquiry.location}</p>
                  </div>
                )}
                {inquiry.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900 line-clamp-3">{inquiry.description}</p>
                  </div>
                )}
                {inquiry.bedrooms && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <p className="mt-1 text-sm text-gray-900">{inquiry.bedrooms}</p>
                  </div>
                )}
                {inquiry.bathrooms && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <p className="mt-1 text-sm text-gray-900">{inquiry.bathrooms}</p>
                  </div>
                )}
                {inquiry.square_feet && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Square Feet</label>
                    <p className="mt-1 text-sm text-gray-900">{inquiry.square_feet.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Inquiry Details</h2>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                    {getStatusLabel(inquiry.status)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Original Inquiry */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Your Original Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{inquiry.message}</p>
                    <p className="text-sm text-gray-500 mt-2">Sent: {formatDate(inquiry.created_at)}</p>
                  </div>
                </div>

                {/* Agent Reply */}
                {inquiry.reply_message && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Agent's Reply</h3>
                    <div className="bg-[#38B496] bg-opacity-5 rounded-lg p-4 border border-[#38B496] border-opacity-20">
                      <p className="text-gray-700">{inquiry.reply_message}</p>
                      <p className="text-sm text-[#38B496] mt-2">Replied: {formatDate(inquiry.replied_at)}</p>
                    </div>
                  </div>
                )}

                {/* Client Reply */}
                {inquiry.client_reply && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Your Reply</h3>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-gray-700">{inquiry.client_reply}</p>
                      <p className="text-sm text-gray-500 mt-2">Replied: {formatDate(inquiry.client_replied_at)}</p>
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                {(inquiry.status === 'replied' || inquiry.status === 'new') && !inquiry.client_reply && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Reply to Agent</h3>
                    <form onSubmit={handleReply} className="space-y-4">
                      <div>
                        <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
                          Your Reply
                        </label>
                        <textarea
                          id="reply"
                          rows={4}
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#38B496] focus:border-[#38B496]"
                          placeholder="Type your reply to the agent..."
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sendingReply || !replyMessage.trim()}
                        className="bg-[#38B496] text-white px-4 py-2 rounded hover:bg-[#F15C26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingReply ? 'Sending...' : 'Send Reply'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Status Messages */}
                {inquiry.status === 'new' && !inquiry.reply_message && (
                  <div className="bg-[#38B496] bg-opacity-5 border border-[#38B496] border-opacity-20 text-[#38B496] px-4 py-3 rounded">
                    Your inquiry is being reviewed by the agent. You'll receive a reply soon.
                  </div>
                )}

                {inquiry.status === 'replied' && inquiry.reply_message && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    The agent has replied to your inquiry. You can now send a reply if needed.
                  </div>
                )}

                {inquiry.status === 'client_replied' && (
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
                    Your reply has been sent to the agent. Waiting for their response.
                  </div>
                )}

                {inquiry.status === 'closed' && (
                  <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded">
                    This inquiry has been closed.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInquiryDetail; 