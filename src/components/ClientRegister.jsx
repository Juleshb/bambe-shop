import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from './utils/axios';
import { useAuth } from './context/AuthContext';
import Nav from './navs/Nav';
import Footer from './navs/Footer';

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/client/register-from-inquiry', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      const userData = response.data;
      localStorage.setItem('clientToken', userData.token);
      localStorage.setItem('clientData', JSON.stringify(userData.client));
      login(userData.client, 'client');
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/client-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#f8f8f8] flex flex-col lg:flex-row items-center justify-center py-12 px-4 gap-y-8 lg:gap-y-0 lg:gap-x-16">
        {/* Registration Form Card */}
        <div className="w-full max-w-md flex flex-col justify-center">
          <div className="bg-white/90 rounded-2xl shadow-lg p-10" style={{backdropFilter: 'blur(2px)'}}>
            <div className="flex flex-col items-center mb-10">
              <Icon icon="mdi:account-plus" className="text-[#38B496] text-5xl mb-3" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Your Account</h2>
              <p className="text-sm text-gray-500 text-center">Join our real estate platform as a client</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-base placeholder-gray-400"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-base placeholder-gray-400"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-base placeholder-gray-400"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-base placeholder-gray-400"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-base placeholder-gray-400"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              {error && (
                <div className="p-2 bg-red-50 rounded text-red-800 flex items-center gap-2 text-xs mt-2">
                  <Icon icon="mdi:alert-circle" className="text-red-600" />
                  {error}
                </div>
              )}
              {success && (
                <div className="p-2 bg-green-50 rounded text-green-800 flex items-center gap-2 text-xs mt-2">
                  <Icon icon="mdi:check-circle" className="text-green-600" />
                  {success}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed shadow"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:account-plus" className="mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </form>
            <div className="mt-8 text-center">
              <span className="text-sm text-gray-500">Already have an account?</span>
              <button
                onClick={() => navigate('/')} 
                className="ml-2 text-[#38B496] hover:text-[#2e9c81] font-medium text-sm"
              >
                Sign in to your account
              </button>
            </div>
          </div>
        </div>
        {/* Tips/Info Section */}
        <div className="w-full max-w-sm flex-shrink-0">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col justify-center h-full">
            <h3 className="text-lg font-bold text-[#38B496] mb-3 flex items-center">
              <Icon icon="mdi:lightbulb-on-outline" className="mr-2 text-xl" />
              Tips for Registration
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Use your real name for a professional profile.</li>
              <li>Provide a valid email address to receive notifications.</li>
              <li>Choose a strong password (at least 6 characters).</li>
              <li>Double-check your phone number for accuracy.</li>
              <li>After registration, you’ll be logged in automatically.</li>
            </ul>
            <h3 className="text-lg font-bold text-[#38B496] mb-3 mt-6 flex items-center">
              <Icon icon="mdi:login" className="mr-2 text-xl" />
              Login Tips
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
              <li>Use the same email and password you registered with.</li>
              <li>If you forget your password, use the “Forgot Password?” link on the login page.</li>
              <li>Your account is private and secure.</li>
              <li>Contact support if you have trouble logging in.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        @media (min-width: 1024px) {
          .client-register-layout {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            gap: 48px;
            min-height: 80vh;
          }
        }
        @media (max-width: 1023px) {
          .client-register-layout {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default ClientRegister; 