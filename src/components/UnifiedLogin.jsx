import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Modal, Button } from 'flowbite-react';
import axios from './utils/axios';
import { useAuth } from './context/AuthContext';

const UnifiedLogin = ({ showModal, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('auto'); // auto, admin, client
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      let userData;

      // Try admin/agent login first if userType is auto or admin
      if (userType === 'auto' || userType === 'admin') {
        try {
          response = await axios.post('/api/login', formData);
          userData = response.data;
          
          // Store admin/agent token and data
          localStorage.setItem('token', userData.token);
          localStorage.setItem('userData', JSON.stringify(userData.user));
          
          // Update auth context
          if (userData.user.role === 'admin') {
            login(userData.user, 'admin');
            localStorage.setItem('userType', 'admin');
            onSuccess && onSuccess(userData.user);
            onClose();
            navigate('/admin-dashboard');
          } else if (userData.user.role === 'agent') {
            login(userData.user, 'agent');
            localStorage.setItem('userType', 'agent');
            onSuccess && onSuccess(userData.user);
            onClose();
            navigate('/agent-dashboard');
          }
          return;
        } catch (adminError) {
          // If admin login fails and userType is auto, try client login
          if (userType === 'auto') {
            // Continue to client login
          } else {
            throw adminError;
          }
        }
      }

      // Try client login
      if (userType === 'auto' || userType === 'client') {
        response = await axios.post('/api/client/login', formData);
        userData = response.data;
        
        // Store client token and data
        localStorage.setItem('clientToken', userData.token);
        localStorage.setItem('clientData', JSON.stringify(userData.client));
        
        // Update auth context
        login(userData.client, 'client');
        
        onSuccess && onSuccess(userData.client);
        onClose();
        navigate('/client-dashboard');
        return;
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError('');
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMsg("");
    try {
      const res = await fetch("https://bambe.shop/api/client/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setResetMsg("Password reset instructions sent to your email.");
      } else {
        setResetMsg(data.error || "Failed to send reset email.");
      }
    } catch (err) {
      setResetMsg("Failed to send reset email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Modal show={showModal} onClose={onClose} size="md">
      <div className="bg-white/90 rounded-2xl shadow-lg p-6 max-w-md mx-auto relative" style={{backdropFilter: 'blur(2px)'}}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none text-xl"
          aria-label="Close"
        >
          <Icon icon="mdi:close" />
        </button>
        <div className="flex flex-col items-center mb-4">
          <Icon icon="mdi:login" className="text-[#38B496] text-3xl mb-1" />
          <h2 className="text-lg font-bold text-gray-900 mb-1 tracking-tight">Sign In to Your Account</h2>
        </div>
        {!showReset ? (
          <>
          {/* User Type Selection */}
            <div className="mb-4">
              <div className="flex justify-center gap-2 mb-1">
              <button
                type="button"
                onClick={() => handleUserTypeChange('auto')}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${userType === 'auto' ? 'bg-[#38B496] text-white' : 'bg-[#f5f5f7] text-gray-700 hover:bg-[#e5e5e7]'}`}
                >Auto Detect</button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('admin')}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${userType === 'admin' ? 'bg-[#38B496] text-white' : 'bg-[#f5f5f7] text-gray-700 hover:bg-[#e5e5e7]'}`}
                >Admin/Agent</button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('client')}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${userType === 'client' ? 'bg-[#38B496] text-white' : 'bg-[#f5f5f7] text-gray-700 hover:bg-[#e5e5e7]'}`}
                >Client</button>
              </div>
            </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                  className="w-full p-2 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400"
                  placeholder="Email Address"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                  className="w-full p-2 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400"
                  placeholder="Password"
                required
              />
            </div>
            {error && (
                <div className="p-2 bg-red-50 rounded text-red-800 flex items-center gap-2 text-xs mt-2">
                  <Icon icon="mdi:alert-circle" className="text-red-600" />
                  {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
                className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <Icon icon="mdi:login" className="mr-2" />
                  Login
                </>
              )}
            </button>
          </form>
            <div className="flex justify-between items-center mt-2">
              <button
                className="text-xs text-[#38B496] hover:text-[#2e9c81] font-medium"
                onClick={() => setShowReset(true)}
              >
                Forgot password?
              </button>
              <span className="text-xs text-gray-500">Don't have an account?{' '}
                <button
                   className="text-[#38B496] hover:text-[#2e9c81] font-medium"
                onClick={() => {
                  onClose();
                     window.location.href = '/client-register';
                   }}
                >Sign up</button>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-2">
              <Icon icon="mdi:lock-reset" className="text-[#38B496] text-2xl mb-1" />
              <h2 className="text-base font-bold text-gray-900 mb-1 tracking-tight">Reset Password</h2>
              <p className="text-xs text-gray-500 text-center">Enter your email to receive password reset instructions.</p>
            </div>
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  className="w-full p-2 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400"
                  placeholder="Email Address"
                  required
                />
              </div>
              {resetMsg && (
                <div className="p-2 bg-green-50 rounded text-green-800 flex items-center gap-2 text-xs mt-2">
                  <Icon icon="mdi:check-circle" className="text-green-600" />
                  {resetMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow"
              >
                {resetLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:email-send" className="mr-2" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
            <div className="flex justify-between items-center mt-2">
              <button
                className="text-xs text-[#38B496] hover:text-[#2e9c81] font-medium"
                onClick={() => setShowReset(false)}
              >
                Back to login
              </button>
            </div>
          </>
        )}
        </div>
    </Modal>
  );
};

export default UnifiedLogin; 