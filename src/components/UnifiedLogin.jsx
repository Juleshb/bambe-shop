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
          login(userData.user, 'admin');
          
          onSuccess && onSuccess(userData.user);
          onClose();
          
          // Redirect based on role
          if (userData.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (userData.user.role === 'agent') {
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

  return (
    <Modal show={showModal} onClose={onClose} size="md">
      <Modal.Header>
        <div className="flex items-center">
          <Icon icon="mdi:login" className="text-blue-600 text-2xl mr-2" />
          <span>Login to Your Account</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Login as:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleUserTypeChange('auto')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  userType === 'auto'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon icon="mdi:auto-fix" className="text-xl mx-auto mb-1" />
                <div className="text-xs font-medium">Auto Detect</div>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('admin')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  userType === 'admin'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon icon="mdi:account-cog" className="text-xl mx-auto mb-1" />
                <div className="text-xs font-medium">Admin/Agent</div>
              </button>
              <button
                type="button"
                onClick={() => handleUserTypeChange('client')}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  userType === 'client'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon icon="mdi:account" className="text-xl mx-auto mb-1" />
                <div className="text-xs font-medium">Client</div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <Icon icon="mdi:alert-circle" className="text-red-500 mr-2" />
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  onClose();
                  navigate('/client-register');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Register as Client
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <button
                onClick={() => {
                  onClose();
                  navigate('/forgot-password');
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UnifiedLogin; 