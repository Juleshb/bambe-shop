import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Autofill token from URL if present
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) setToken(urlToken);
  }, [location.search]);

  const tokenFromUrl = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://bambe.shop/api/client/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Password reset successful! You can now log in.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMsg(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setMsg("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-10">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#38B496]">Reset Password</h2>
          <label className="block mb-2 font-medium text-gray-700">Reset Token</label>
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
            required
            readOnly={!!tokenFromUrl}
          />
          <label className="block mb-2 font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
            required
          />
          <label className="block mb-2 font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-[#38B496] focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-[#38B496] text-white px-4 py-2 rounded w-full font-semibold hover:bg-[#2e9c81] transition-colors"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {msg && <div className="mt-4 text-center text-red-600 font-medium">{msg}</div>}
        </form>
      </div>
      <Footer />
    </>
  );
} 