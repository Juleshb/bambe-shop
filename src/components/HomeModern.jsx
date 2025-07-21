import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import { Link } from "react-router-dom";
import heroImage from "./assets/nn.jpg";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesRes = await axiosInstance.get("/api/listings/listings/product");
        setProperties(propertiesRes.data);
        const categoriesRes = await axiosInstance.get("/api/categories");
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
        {/* Hero Section - Modern Design */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video/Image */}
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Luxury Property" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Find Your
                <span className="text-[#38B496] block">Dream Home</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Discover the perfect property in Rwanda's most desirable locations. 
                From luxury villas to modern apartments, we have everything you need.
              </p>
              
              {/* Hero Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/listings" 
                    className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Icon icon="mdi:home-search" className="mr-2 text-xl" />
                    Explore Properties
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon icon="mdi:phone" className="mr-2 text-xl" />
                    Contact Agent
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </section>

        {/* Advanced Search Section */}
        <section className="relative -mt-20 z-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Property</h2>
                <p className="text-gray-600">Use our advanced search to find exactly what you're looking for</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    <Icon icon="mdi:map-marker" className="mr-1" />
                    Location
                  </label>
                  <select 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
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
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
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
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
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
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#38B496] focus:border-[#38B496] transition-all"
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
                    className="w-full bg-gradient-to-r from-[#38B496] to-[#F15C26] hover:from-[#2e9c81] hover:to-[#e04b1a] text-white p-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                  >
                    <Icon icon="mdi:magnify" className="mr-2 text-xl" />
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
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          src={property.images?.length > 0 ? `https://bambe.shop${property.images[0].image_url}` : featuredProperty}
                          alt={property.title}
                        />
                        <div className="absolute top-4 left-4 bg-[#F15C26] text-white px-3 py-1 text-sm rounded-full font-medium">
                          {property.status || "New Listing"}
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-sm rounded-full font-medium">
                          RWF {property.price?.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#38B496] transition-colors">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <Icon icon="mdi:map-marker" className="mr-2 text-[#38B496]" />
                          <span>{property.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center">
                            <Icon icon="mdi:bed" className="mr-2 text-[#38B496]" />
                            <span className="text-sm font-medium">{property.bedrooms} Beds</span>
                          </div>
                          <div className="flex items-center">
                            <Icon icon="mdi:shower" className="mr-2 text-[#38B496]" />
                            <span className="text-sm font-medium">{property.bathrooms} Baths</span>
                          </div>
                          <div className="flex items-center">
                            <Icon icon="mdi:ruler-square" className="mr-2 text-[#38B496]" />
                            <span className="text-sm font-medium">{property.area} m²</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-[#38B496]">
                            RWF {property.price?.toLocaleString()}
                          </span>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link 
                              to={`/listing/${property.listing_id}`} 
                              className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center"
                            >
                              View Details
                              <Icon icon="mdi:arrow-right" className="ml-1" />
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Explore Property Types
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#38B496] transition-colors">
                        {category.name}
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
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