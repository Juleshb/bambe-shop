import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook
import Nav from "./navs/Nav";
import Footer from "./navs/Footer";
import axiosInstance from "./utils/axios";
import { AuthContext } from "./contex/authocontex";
import LoginImg from "./assets/signup-img.webp";

function Login() {
  const { t } = useTranslation(); // Initialize translation function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetLoading, setResetLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(false);
    setShowLoader(true);

    const loginData = { email, password };

    try {
      const response = await axiosInstance.post("/api/login", loginData);
      const { token, user } = response.data;

      if (response.status === 200 && token) {
        setAuthData({ token });
        localStorage.setItem("token", token);

        setShowButton(true);
        setShowLoader(false);

        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage(t("loginSuccess"));

        navigate("/Dashboard");
      } else {
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage(t("loginFailed"));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage(t("userNotFound"));
        } else if (error.response.status === 400) {
          setErrorMessage(t("invalidCredentials"));
        } else {
          setErrorMessage(t("loginError"));
        }
      } else {
        setErrorMessage(t("unknownError"));
      }

      setShowFailureMessage(true);
      setShowSuccessMessage(false);
    } finally {
      setShowButton(true);
      setShowLoader(false);
    }
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
    <>
      <Nav />

      <div className="w-full flex md:flex-col-reverse lg:flex-row ml-10 lg:ml-0 mt-52 lg:mt-10">
        <img className="hidden lg:block w-96 lg:w-1/2 lg:h-1/3" src={LoginImg} alt="Login" />

        <form onSubmit={handleSubmit}>
          <div className="md:ml-32 flex flex-col justify-center items-center mt-52">
            {showSuccessMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
                <p className="items-center flex">{SuccessMessage}</p>
                <button onClick={() => setShowSuccessMessage(false)}>Close</button>
              </div>
            )}

            {showFailureMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 bg-red-100 text-center flex justify-between mt-4">
                <p className="items-center flex">{errorMessage}</p>
                <button onClick={() => setShowFailureMessage(false)}>Close</button>
              </div>
            )}

            <p className="text-4xl mb-4 font-semibold">{t("loginTitle")}</p>
            <p className="mb-10">{t("loginSubtitle")}</p>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="email"
              placeholder={t("enterEmail")}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-5 w-80"
              type="password"
              placeholder={t("enterPassword")}
            />

            <div className="flex justify-around w-80 text-center">
              {showLoader && <p>{t("signingIn")}</p>}
              {showButton && (
                <button type="submit" className="bg-[#67c066] rounded-md mb-5 p-4 w-32 text-white">
                  {t("login")}
                </button>
              )}
            </div>
            {/* Forgot Password Button */}
            <button
              type="button"
              className="text-blue-500 hover:underline mt-2"
              onClick={() => setShowReset(true)}
            >
              Forgot Password?
            </button>
          </div>
        </form>
        {/* Password Reset Modal */}
        {showReset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => {
                  setShowReset(false);
                  setResetMsg("");
                  setResetEmail("");
                }}
              >
                &times;
              </button>
              <form onSubmit={handleResetSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-700">Enter your email to reset password:</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  placeholder="Email address"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  disabled={resetLoading}
                >
                  {resetLoading ? "Sending..." : "Send Reset Email"}
                </button>
                {resetMsg && <div className="mt-2 text-sm text-green-600">{resetMsg}</div>}
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Login;
