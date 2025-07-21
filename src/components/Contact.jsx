import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch("https://bambe.shop/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });
      if (res.ok) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const contactInfo = [
    {
      icon: "mdi:phone",
      title: "Call Us",
      details: "+250 783 224 032",
      action: "tel:+250783224032",
      color: "bg-blue-500"
    },
    {
      icon: "mdi:email",
      title: "Email Us",
      details: "umuhuza.store@gmail.com",
      action: "mailto:umuhuza.store@gmail.com",
      color: "bg-green-500"
    },
    {
      icon: "mdi:map-marker",
      title: "Visit Us",
      details: "Kigali, Rwanda",
      action: "#",
      color: "bg-orange-500"
    },
    {
      icon: "mdi:clock",
      title: "Business Hours",
      details: "Mon - Fri: 8AM - 6PM",
      action: "#",
      color: "bg-purple-500"
    }
  ];

  const features = [
    {
      icon: "mdi:account-group",
      title: "Expert Team",
      description: "Our experienced real estate professionals are here to help you find your perfect property."
    },
    {
      icon: "mdi:shield-check",
      title: "Trusted Service",
      description: "We provide reliable and trustworthy real estate services with years of experience."
    },
    {
      icon: "mdi:headset",
      title: "24/7 Support",
      description: "Get assistance anytime with our round-the-clock customer support team."
    },
    {
      icon: "mdi:home-city",
      title: "Wide Selection",
      description: "Browse through our extensive collection of properties across Rwanda."
    }
  ];

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#38B496] to-[#F15C26] py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Contact Umuhuza
              </h1>
              <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                We're here to help you find your perfect property. Reach out to us and our team will get back to you soon.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
            <h2 className="text-xl font-semibold text-gray-900 mb-1 tracking-tight text-center">Send us a Message</h2>
            <p className="text-xs text-gray-500 text-center mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm"
                      placeholder="What is this about?"
                    />
                  </div>
                </div>
                <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  rows="5"
                  className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] text-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-2 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                    </>
                  ) : (
                    <>
                    <Icon icon="mdi:send" className="text-base mr-1" />
                      Send Message
                    </>
                  )}
                </button>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  className="p-2 bg-green-50 border border-green-200 rounded text-green-800 flex items-center gap-2 text-xs mt-2"
                  >
                    <Icon icon="mdi:check-circle" className="text-green-600" />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 bg-red-50 border border-red-200 rounded text-red-800 flex items-center gap-2 text-xs mt-2"
                >
                  <Icon icon="mdi:alert-circle" className="text-red-600" />
                  Sorry, there was a problem sending your message. Please try again later.
                  </motion.div>
                )}
              </form>
            </motion.div>
        </div>

        {/* Minimal Contact Info Section */}
        <div className="max-w-2xl mx-auto px-4 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:map-marker" className="text-[#38B496]" /> Kigali, Rwanda
              </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:phone" className="text-[#38B496]" /> +250 783 224 032
          </div>
            <div className="flex items-center gap-2">
              <Icon icon="mdi:email" className="text-[#38B496]" /> umuhuza.store@gmail.com
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
