import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from '../utils/axios';
import Nav from '../navs/Nav';
import Footer from '../navs/Footer';
import { useAuth } from '../context/AuthContext';

const AgentPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const agentId = location.state?.agentId;
  const [phone, setPhone] = useState(location.state?.phone || '');
  const [status, setStatus] = useState('idle'); // idle, pending, success, failed
  const [error, setError] = useState('');
  const [redirected, setRedirected] = useState(false);
  const [polling, setPolling] = useState(false);
  const { user, login } = useAuth();

  const handlePay = async (e) => {
    e.preventDefault();
    setStatus('pending');
    setError('');
    setRedirected(false);
    try {
      const res = await axios.post('/api/agent/pay', { agentId, phone });
      if (res.data.status === 'pending' && res.data.link) {
        setRedirected(true);
        window.location.href = res.data.link; // Redirect in same window
      } else {
        setStatus('failed');
        setError('Could not initiate payment.');
      }
    } catch (err) {
      setStatus('failed');
      setError('Payment initiation failed.');
    }
  };

  // Poll for payment status after redirect back
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('agentId')) {
      setPolling(true);
      const poll = setInterval(async () => {
        try {
          const check = await axios.get(`/api/agent/payment-status/${params.get('agentId')}`);
          if (check.data.status === 'success') {
            setStatus('success');
            setPolling(false);
            clearInterval(poll);
            // Update agent status in context/localStorage if logged in
            if (user && user.id === Number(params.get('agentId'))) {
              const updatedUser = { ...user, status: 'active' };
              login(updatedUser, 'agent');
              localStorage.setItem('userData', JSON.stringify(updatedUser));
            }
            setTimeout(() => navigate('/agent-dashboard'), 2000);
          } else if (check.data.status === 'failed') {
            setStatus('failed');
            setPolling(false);
            clearInterval(poll);
          }
        } catch {
          // ignore
        }
      }, 3000);
      return () => clearInterval(poll);
    }
  }, [navigate, user, login]);

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#f8f8f8] flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center">
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 mt-0" style={{backdropFilter: 'blur(2px)'}}>
            <div className="flex flex-col items-center mb-8">
              <Icon icon="mdi:cellphone-message" className="text-[#38B496] text-4xl mb-2" />
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Pay to Activate Agent Account</h2>
              <p className="text-xs text-gray-500 text-center">Pay 5000 RWF with Flutterwave to start listing products.</p>
            </div>
            <form onSubmit={handlePay} className="space-y-5">
              <div>
                <input type="tel" name="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 bg-[#f5f5f7] rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm placeholder-gray-400" placeholder="Phone Number" required disabled={polling || redirected} />
              </div>
              <div className="text-center text-lg font-semibold text-gray-700">Amount: <span className="text-[#38B496]">5000 RWF</span></div>
              {status === 'failed' && <div className="p-2 bg-red-50 rounded text-red-800 flex items-center gap-2 text-xs mt-2"><Icon icon="mdi:alert-circle" className="text-red-600" />{error}</div>}
              {status === 'success' && <div className="p-2 bg-green-50 rounded text-green-800 flex items-center gap-2 text-xs mt-2"><Icon icon="mdi:check-circle" className="text-green-600" />Payment successful! Redirecting...</div>}
              {!redirected && !polling && (
                <button type="submit" disabled={status==='pending'||status==='success'} className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow">
                  {status==='pending' ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Processing...</>) : (<>Pay with Flutterwave</>)}
                </button>
              )}
              {polling && <div className="text-center text-sm text-gray-500 mt-2">Waiting for payment confirmation...</div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentPayment; 