import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from '../utils/axios';
import Nav from '../navs/Nav';
import Footer from '../navs/Footer';

const AgentRegister = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const response = await axios.post('/api/agent/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setSuccess('Registration successful! Redirecting to payment...');
      setTimeout(() => {
        navigate('/agent-payment', { state: { agentId: response.data.id, phone: formData.phone } });
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#f8f8f8] flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 mt-0" style={{backdropFilter: 'blur(2px)'}}>
            <div className="flex flex-col items-center mb-8">
              <Icon icon="mdi:account-tie" className="text-[#38B496] text-4xl mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Become an Agent</h2>
              <p className="text-xs text-gray-500 text-center">Register as an agent to list products after payment</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Full Name" required />
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Email Address" required />
              </div>
              <div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Phone Number" required />
              </div>
              <div>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Password" required />
              </div>
              <div>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Confirm Password" required />
              </div>
              {error && <div className="p-2 bg-red-50 rounded text-red-800 flex items-center gap-2 text-xs mt-2"><Icon icon="mdi:alert-circle" className="text-red-600" />{error}</div>}
              {success && <div className="p-2 bg-green-50 rounded text-green-800 flex items-center gap-2 text-xs mt-2"><Icon icon="mdi:check-circle" className="text-green-600" />{success}</div>}
              <button type="submit" disabled={loading} className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow">{loading ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Registering...</>) : (<>Register as Agent</>)}</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentRegister; 