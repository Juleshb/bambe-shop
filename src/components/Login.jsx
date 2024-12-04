import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Nav from './navs/Nav';
import Footer from './navs/Footer';

import axiosInstance from "./utils/axios";
import { AuthContext } from "./contex/authocontex";
import LoginImg from "./assets/signup-img.webp";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(false);
    setShowLoader(true);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/api/login", loginData);
      const { token, user } = response.data;

      if (response.status === 200 && token) {
        setAuthData({ token });
        localStorage.setItem('token', token);

        setShowButton(true);
        setShowLoader(false);

        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage("You have logged in successfully!");

        navigate("/Dashboard");
      } else {
        console.error("Login failed:", response.statusText);
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage("Failed to login: Invalid response from server.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("User not found. Please check your email.");
        } else if (error.response.status === 400) {
          setErrorMessage("Invalid credentials. Please check your password.");
        } else {
          setErrorMessage("Failed to login. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }

      console.error("Login error:", error);
      setShowFailureMessage(true);
      setShowSuccessMessage(false);
    } finally {
      setShowButton(true);
      setShowLoader(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const closeFailureMessage = () => {
    setShowFailureMessage(false);
  };

  return (
    <>
      <Nav />

      <div className="w-full flex md:flex-col-reverse lg:flex-row ml-10 lg:ml-0 mt-52 lg:mt-10">
        <img
          className="hidden lg:block w-96 lg:w-1/2 lg:h-1/3"
        src={LoginImg}
          alt="Login"
        />

        <form onSubmit={handleSubmit}>
          <div className="md:ml-32 flex flex-col justify-center items-center mt-52">
            {showSuccessMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
                <p className="items-center flex">{SuccessMessage}</p>
                <button onClick={closeSuccessMessage}>Close</button>
              </div>
            )}

            {showFailureMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 bg-red-100 text-center flex justify-between mt-4">
                <p className="items-center flex">{errorMessage}</p>
                <button onClick={closeFailureMessage}>Close</button>
              </div>
            )}

            <p className="text-4xl mb-4 font-semibold">Login to your account</p>
            <p className="mb-10">Enter your details below</p>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="email"
              placeholder="Enter Email Address"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-5 w-80"
              type="password"
              placeholder="Enter Password"
            />

            <div className="flex justify-around w-80 text-center">
              {showLoader && <p>Signing in...</p>}
              {showButton && (
                <button
                  type="submit"
                  className="bg-[#67c066] rounded-md mb-5 p-4 w-32 text-white"
                >
                  Login
                </button>
              )}
              <Link className="mt-2 hover:underline" to="/">
                Forget Password?
              </Link>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
