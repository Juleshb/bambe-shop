import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import { Link } from "react-router-dom";
import hero1 from "./assets/1.jpg";
import hero2 from "./assets/2.png";
import hero3 from "./assets/3.jpeg";
import hero4 from "./assets/4.jpg";
import hero5 from "./assets/5.jpg";
import hero6 from "./assets/6.jpg";
import hero7 from "./assets/7.webp";

import featuredProperty from "./assets/nn2.jpg";
import axiosInstance from "./utils/axios";
import { CartContext } from "./CartContext";
import { Icon } from "@iconify/react";
import Logo from "./assets/whitelogo.png";
import { motion, AnimatePresence } from 'framer-motion';

function HomeModern() {
  const { t } = useTranslation();
  const { addToCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: ''
  });

  // Sliding hero images
  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);
  const handlePrevHero = () => setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  const handleNextHero = () => setHeroIndex((prev) => (prev + 1) % heroImages.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesRes = await axiosInstance.get("/api/listings");
        setProperties(propertiesRes.data);
        const categoriesRes = await axiosInstance.get("/api/propertycategories");
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
      finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  // Auto-slide for featured properties
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(properties.length / 3));
    }, 5000);
    return () => clearInterval(timer);
  }, [properties.length]);

  const handleSearch = () => {
    console.log('Search filters:', searchFilters);
  };

  const stats = [
    { number: "500+", label: "Properties Sold", icon: "mdi:home-city" },
    { number: "1000+", label: "Happy Clients", icon: "mdi:account-group" },
    { number: "50+", label: "Expert Agents", icon: "mdi:account-tie" },
    { number: "15+", label: "Years Experience", icon: "mdi:trophy" }
  ];

  const features = [
    { icon: "mdi:shield-check", title: "Verified Properties", desc: "All properties are verified by our expert team" },
    { icon: "mdi:handshake", title: "Trusted Partners", desc: "Work with certified real estate professionals" },
    { icon: "mdi:calculator", title: "Price Calculator", desc: "Get instant price estimates for properties" },
    { icon: "mdi:map-marker", title: "Location Insights", desc: "Detailed neighborhood and area information" }
  ];

  if (loading) {
    return (
      <div className="flex bg-gradient-to-br from-[#38B496] to-[#F15C26] justify-center items-center h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.img 
            src={Logo}
            alt="Loading..." 
            className="h-24 mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="text-white text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading amazing properties...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Apple-like Welcome with Sliding Photos */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
          {/* Sliding Photo Carousel */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={heroIndex}
                src={heroImages[heroIndex]}
                alt="Welcome Slide"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                Welcome to <span className="text-[#38B496]">Umuhuza Online</span>  Real Estate
              </h1>
              <p className="text-base text-white/90 mb-6 max-w-xl mx-auto">
                Discover Rwanda's best properties. Minimal, modern, and made for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Link 
                  to="/listings" 
                  className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center transition-all duration-300 shadow hover:shadow-lg"
                >
                  <Icon icon="mdi:home-search" className="mr-2 text-base" />
                  Explore Properties
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium text-sm border-2 border-white/30 flex items-center justify-center transition-all duration-300"
                >
                  <Icon icon="mdi:phone" className="mr-2 text-base" />
                  Contact Agent
                </Link>
              </div>
              {/* Carousel Arrows */}
              <div className="flex justify-center gap-4 mt-2">
                <button onClick={handlePrevHero} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all">
                  <Icon icon="mdi:chevron-left" className="text-2xl" />
                </button>
                <button onClick={handleNextHero} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all">
                  <Icon icon="mdi:chevron-right" className="text-2xl" />
                </button>
              </div>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-2">
                {heroImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${heroIndex === idx ? 'bg-[#38B496]' : 'bg-white/40'} inline-block`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advanced Search Section */}
        <section className="relative -mt-20 z-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="relative rounded-xl shadow-sm p-6 border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Liquid Grass Background */}
              <div className="absolute inset-0 z-0" style={{
                background: 'linear-gradient(135deg, #38B496 0%, #4fd67c 100%)',
                opacity: 0.18
              }} />
              {/* Wavy SVG overlay for liquid effect */}
              <svg className="absolute left-0 bottom-0 w-full h-12 z-0" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity: 0.25}}>
                <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="#38B496" />
              </svg>

              <div className="relative z-10 text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-1 tracking-tight">Find Your Perfect Property</h2>
                <p className="text-xs text-white">Use our advanced search to find exactly what you're looking for</p>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Icon icon="mdi:map-marker" className="mr-1" />
                    Location
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all text-sm"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  >
                    <option value="">Select Location</option>
                    <option value="kigali">Kigali</option>
                    <option value="musanze">Musanze</option>
                    <option value="rubavu">Rubavu</option>
                    <option value="huye">Huye</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Icon icon="mdi:home" className="mr-1" />
                    Property Type
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all text-sm"
                    value={searchFilters.propertyType}
                    onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                  >
                    <option value="">Select Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Icon icon="mdi:currency-usd" className="mr-1" />
                    Price Range
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all text-sm"
                    value={searchFilters.priceRange}
                    onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
                  >
                    <option value="">Select Price</option>
                    <option value="0-50000">RWF 0 - 50,000</option>
                    <option value="50000-100000">RWF 50,000 - 100,000</option>
                    <option value="100000-200000">RWF 100,000 - 200,000</option>
                    <option value="200000+">RWF 200,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Icon icon="mdi:bed" className="mr-1" />
                    Bedrooms
                  </label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all text-sm"
                    value={searchFilters.bedrooms}
                    onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                  >
                    <option value="">Any</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <motion.button 
                    className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white p-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                  >
                    <Icon icon="mdi:magnify" className="mr-2 text-base" />
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#38B496] to-[#F15C26] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon={stat.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium properties in the most sought-after locations
              </p>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {properties.slice(currentSlide * 3, (currentSlide + 1) * 3).map((property, index) => (
                    <motion.div 
                      key={property.listing_id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          src={property.images?.length > 0 ? `https://bambe.shop${property.images[0].image_url}` : featuredProperty}
                          alt={property.title}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#F15C26] text-white px-2 py-1 text-xs rounded-full font-medium shadow-lg">
                            {property.status || "New"}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-2 py-1 text-xs rounded-full font-semibold shadow-lg">
                            RWF {property.price?.toLocaleString()}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-5">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#38B496] transition-colors line-clamp-1">
                            {property.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <Icon icon="mdi:map-marker" className="mr-1 text-[#38B496] text-sm" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                            <Icon icon="mdi:bed" className="mr-1 text-[#38B496] text-sm" />
                            <span className="text-xs font-medium text-gray-700">{property.bedrooms || 0}</span>
                          </div>
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                            <Icon icon="mdi:shower" className="mr-1 text-[#38B496] text-sm" />
                            <span className="text-xs font-medium text-gray-700">{property.bathrooms || 0}</span>
                          </div>
                          <div className="flex items-center justify-center bg-gray-50 rounded-lg py-2 px-1">
                            <Icon icon="mdi:ruler-square" className="mr-1 text-[#38B496] text-sm" />
                            <span className="text-xs font-medium text-gray-700">{property.area || 0}m²</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-[#38B496]">
                              RWF {property.price?.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">Price</span>
                          </div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link 
                              to={`/listing/${property.listing_id}`} 
                              className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                            >
                              View
                              <Icon icon="mdi:arrow-right" className="ml-1 text-xs" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-[#38B496] w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/listings" 
                className="inline-flex items-center bg-gradient-to-r from-[#38B496] to-[#F15C26] hover:from-[#2e9c81] hover:to-[#e04b1a] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Properties
                <Icon icon="mdi:arrow-right" className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Property Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Explore Property Types
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Find the perfect property type that matches your lifestyle and preferences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <motion.div 
                  key={category.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-80"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={category.image || featuredProperty} 
                    alt={category.category_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#38B496] transition-colors">
                        {category.category_name}
                      </h3>
                      <p className="text-white/80 mb-4">{category.count} Properties</p>
                      <motion.div 
                        className="flex items-center text-[#38B496] font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Explore
                        <Icon icon="mdi:arrow-right" className="ml-2" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                We provide exceptional service and expertise to make your property journey seamless
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#38B496] to-[#F15C26] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon icon={feature.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#38B496] to-[#F15C26] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-base mb-6 text-white/90 max-w-2xl mx-auto">
                Join thousands of satisfied customers who found their perfect property with us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/listings" 
                    className="bg-white text-[#38B496] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                  >
                    <Icon icon="mdi:home-search" className="mr-2" />
                    Start Searching
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="border-2 border-white text-white hover:bg-white hover:text-[#38B496] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center"
                  >
                    <Icon icon="mdi:phone" className="mr-2" />
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default HomeModern; 