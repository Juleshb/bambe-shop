import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";

function NotFound() {
  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* 404 Number */}
            <motion.h1 
              className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#38B496] to-[#F15C26] bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              404
            </motion.h1>
            
            {/* Error Message */}
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Oops! Page Not Found
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, we'll help you get back on track!
            </motion.p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12"
          >
            <div className="relative w-64 h-64 mx-auto">
              {/* House illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-[#38B496]/20 to-[#F15C26]/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#38B496]/30 to-[#F15C26]/30 rounded-full flex items-center justify-center">
                    <svg className="w-20 h-20 text-[#38B496]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 9v11h20V9l-10-7zm0 2.5L19 10v9H5v-9l7-5.5z"/>
                      <path d="M9 14h6v6H9z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-8 w-4 h-4 bg-[#F15C26] rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-4 w-3 h-3 bg-[#38B496] rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-8 w-2 h-2 bg-[#F15C26] rounded-full opacity-40"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center"
          >
            <Link 
              to="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#38B496] to-[#38B496]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#38B496]/90 to-[#38B496] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/listings"
              className="group relative px-8 py-4 bg-white text-[#38B496] font-semibold rounded-lg border-2 border-[#38B496] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Browse Properties
              </span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="group relative px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </span>
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-500 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-[#38B496] hover:text-[#F15C26] transition-colors duration-300">
                About Us
              </Link>
              <Link to="/contact" className="text-[#38B496] hover:text-[#F15C26] transition-colors duration-300">
                Contact
              </Link>
              <Link to="/listings" className="text-[#38B496] hover:text-[#F15C26] transition-colors duration-300">
                All Properties
              </Link>
              <Link to="/login" className="text-[#38B496] hover:text-[#F15C26] transition-colors duration-300">
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;
