import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const InquiryForm = ({ propertyId, propertyName, agentInfo, onSuccess, className = "" }) => {
  const { user, userType, isClient } = useAuth();
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCustomerPromptModal, setShowCustomerPromptModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();

  // Auto-fill form for logged-in clients
  useEffect(() => {
    if (isClient() && user) {
      setInquiryForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user, isClient]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle registration form changes
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    
    // Different validation for logged-in vs non-logged-in users
    if (isClient()) {
      // For logged-in clients, only validate message
      if (!inquiryForm.message.trim()) {
        setErrorMessage('Please enter your message');
        setShowErrorModal(true);
        return;
      }
    } else {
      // For non-logged-in users, validate all required fields
      if (!inquiryForm.name.trim() || !inquiryForm.email.trim() || !inquiryForm.message.trim()) {
        setErrorMessage('Please fill in all required fields (Name, Email, and Message)');
        setShowErrorModal(true);
        return;
      }

      // Email validation for non-logged-in users
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inquiryForm.email)) {
        setErrorMessage('Please enter a valid email address');
        setShowErrorModal(true);
        return;
      }
    }

    setSubmitting(true);

    try {
      const response = await fetch('https://bambe.shop/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isClient() && { 'Authorization': `Bearer ${localStorage.getItem('clientToken')}` })
        },
        body: JSON.stringify({
          name: inquiryForm.name.trim(),
          email: inquiryForm.email.trim(),
          phone: inquiryForm.phone.trim(),
          message: inquiryForm.message.trim(),
          property_id: parseInt(propertyId)
        })
      });

      if (response.ok) {
        const result = await response.json();
        setInquiryId(result.id);
        
        if (isClient()) {
          // For logged-in clients, show success directly
          setShowSuccessModal(true);
        } else {
          // For non-logged-in users, show customer prompt modal
          setShowCustomerPromptModal(true);
        }
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to submit inquiry. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle customer registration choice
  const handleCustomerChoice = (wantsToRegister) => {
    setShowCustomerPromptModal(false);
    
    if (wantsToRegister) {
      setShowRegistrationModal(true);
    } else {
      // Just show success message without registration
      setShowSuccessModal(true);
    }
  };

  // Handle client registration
  const handleClientRegistration = async (e) => {
    e.preventDefault();
    
    if (!registrationForm.password || !registrationForm.confirmPassword) {
      setErrorMessage('Please fill in all password fields');
      setShowErrorModal(true);
      return;
    }

    if (registrationForm.password !== registrationForm.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setShowErrorModal(true);
      return;
    }

    if (registrationForm.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setShowErrorModal(true);
      return;
    }

    setRegistering(true);

    try {
      const response = await fetch('https://bambe.shop/api/client/register-from-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiry_id: inquiryId,
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          password: registrationForm.password
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Store client token and data
        localStorage.setItem('clientToken', result.token);
        localStorage.setItem('clientData', JSON.stringify(result.client));
        localStorage.setItem('userType', 'client');
        
        // Close registration modal and show success
        setShowRegistrationModal(false);
        setShowSuccessModal(true);
        
        // Reset forms
        setInquiryForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setRegistrationForm({
          password: '',
          confirmPassword: ''
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create client account. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Error registering client:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
      setShowErrorModal(true);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <>
      <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {propertyName ? `Inquire about ${propertyName}` : 'Contact Agent'}
        </h3>
        
        {/* Show user info for logged-in clients */}
        {isClient() && user && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <Icon icon="mdi:account-check" className="text-green-600 text-xl mr-2" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Logged in as: {user.name || user.email}
                </p>
                <p className="text-xs text-green-700">
                  Your inquiry will be linked to your account
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmitInquiry} className="space-y-4">
          {/* Name field - hidden for logged-in clients */}
          {!isClient() && (
            <div>
              <input
                type="text"
                name="name"
                value={inquiryForm.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
                placeholder="Your Name *"
                required
              />
            </div>
          )}
          
          {/* Email field - hidden for logged-in clients */}
          {!isClient() && (
            <div>
              <input
                type="email"
                name="email"
                value={inquiryForm.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
                placeholder="Your Email *"
                required
              />
            </div>
          )}
          
          {/* Phone field - always shown but pre-filled for logged-in clients */}
          <div>
            <input
              type="tel"
              name="phone"
              value={inquiryForm.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
              placeholder="Your Phone Number"
            />
          </div>
          
          <div>
            <textarea
              name="message"
              value={inquiryForm.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
              placeholder="Your Message *"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#38B496] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2e9c81] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Icon icon="ion:send" width="16" height="16" />
                <span className="ml-2">
                  {isClient() ? 'Send Inquiry' : 'Submit Inquiry'}
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Customer Prompt Modal - only for non-logged-in users */}
      <Modal show={showCustomerPromptModal} onClose={() => setShowCustomerPromptModal(false)} size="lg">
        <Modal.Header>Become Our Valued Customer!</Modal.Header>
        <Modal.Body>
          <div className="text-center mb-6">
            <Icon icon="mdi:account-plus" className="text-blue-500 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Would you like to become our customer?
            </h3>
            <p className="text-gray-600 mb-6">
              Your inquiry has been submitted successfully! Now, let us tell you about the amazing benefits of becoming our customer.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">🌟 Customer Benefits:</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Track All Your Inquiries</p>
                  <p className="text-sm text-gray-600">View and manage all your property inquiries in one place</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Direct Communication with Agents</p>
                  <p className="text-sm text-gray-600">Reply to agent messages and continue conversations</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Priority Support</p>
                  <p className="text-sm text-gray-600">Get faster responses and personalized assistance</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Property Updates</p>
                  <p className="text-sm text-gray-600">Receive notifications about new properties matching your criteria</p>
                </div>
              </div>
              <div className="flex items-start">
                <Icon icon="mdi:check-circle" className="text-green-500 text-xl mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Save Time & Effort</p>
                  <p className="text-sm text-gray-600">No need to re-enter your information for future inquiries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              It only takes 30 seconds to create your account and unlock all these benefits!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex space-x-3 w-full">
            <button 
              onClick={() => handleCustomerChoice(false)}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              No Thanks, Just Send Message
            </button>
            <button 
              onClick={() => handleCustomerChoice(true)}
              className="flex-1 bg-[#38B496] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#2e9c81] transition-colors"
            >
              Yes, Create My Account
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Registration Modal */}
      <Modal show={showRegistrationModal} onClose={() => setShowRegistrationModal(false)}>
        <Modal.Header>Create Your Customer Account</Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <Icon icon="mdi:account-plus" className="text-blue-500 text-6xl mx-auto mb-4" />
            <p className="text-gray-700 mb-4">
              Create your password to complete your customer account setup.
            </p>
          </div>
          
          <form onSubmit={handleClientRegistration} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={registrationForm.password}
                onChange={handleRegistrationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registrationForm.confirmPassword}
                onChange={handleRegistrationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={registering}
              className="w-full bg-[#38B496] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2e9c81] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registering ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <Modal.Header>Inquiry Submitted Successfully!</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Icon icon="mdi:check-circle" className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Thank you for your inquiry!
            </h3>
            <p className="text-gray-600 mb-4">
              {isClient() 
                ? "Your inquiry has been submitted and linked to your account. Our agents will review it and get back to you soon."
                : "Your inquiry has been submitted successfully. Our agents will review it and get back to you soon."
              }
            </p>
            {isClient() && (
              <p className="text-sm text-blue-600">
                You can track this inquiry in your <button 
                  onClick={() => navigate('/client-dashboard')}
                  className="underline font-medium hover:text-blue-800"
                >
                  client dashboard
                </button>.
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button 
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-[#38B496] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#2e9c81] transition-colors"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <Modal.Header>Error</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Icon icon="mdi:alert-circle" className="text-red-500 text-6xl mx-auto mb-4" />
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button 
            onClick={() => setShowErrorModal(false)}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InquiryForm; 