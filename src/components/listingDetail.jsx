import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import MapComponent from "./MapComponent"; 
import Nav from './navs/Nav';
import Footer from './navs/Footer';
import { FormattedNumber } from "react-intl";
import { Popover, Modal, Button } from "flowbite-react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from 'react-share';
import { CartContext } from "./CartContext";
import InquiryForm from "./InquiryForm";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentInfo, setAgentInfo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { addToCart } = useContext(CartContext);

  const shareUrl = `${window.location.origin}${window.location.pathname}`;
  const title = "Check out this amazing property!";

  // Fetch listing data from API
  useEffect(() => {
    fetch(`http://localhost:4800/api/listings/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        // Set agent information directly from listing response
        if (data.agent) {
          setAgentInfo(data.agent);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching property:", error));
  }, [id]);

  // Toggle favorite
  const toggleFavorite = () => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38B496] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="mdi:home-off" className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Property Not Found</h2>
          <p className="text-gray-500">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Function to show next/prev image
  const showImage = (index) => setCurrentIndex(index);

  const shareContent = (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <div className="flex gap-5 px-3 py-2">
        <FacebookShareButton url={shareUrl} quote={title}>
          <span className="border-r border-r-stone-100 px-2">
            <Icon className="text-blue-600 hover:text-blue-700" icon="iconoir:facebook" width="24" height="24" />
          </span>
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <span className="border-r border-r-stone-100 px-2">
            <Icon className="text-blue-500 hover:text-blue-600" icon="si:twitter-line" width="24" height="24" />
          </span>
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl} title={title}>
          <span className="px-2">
            <Icon className="text-green-500 hover:text-green-600" icon="basil:whatsapp-outline" width="24" height="24" />
          </span>
        </WhatsappShareButton>

        <LinkedinShareButton url={shareUrl} title={title}>
          <span className="border-r border-r-stone-100 px-2">
            <Icon className="text-blue-700 hover:text-blue-800" icon="basil:linkedin-outline" width="24" height="24" />
          </span>
        </LinkedinShareButton>
      </div>
    </div>
  );

  return (
    <>
      <Nav/>
      <div className="min-h-screen bg-gray-50 pt-20">
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-[#38B496]">Home</a></li>
              <li><Icon icon="mdi:chevron-right" className="text-gray-400" /></li>
              <li><a href="/listings" className="hover:text-[#38B496]">Properties</a></li>
              <li><Icon icon="mdi:chevron-right" className="text-gray-400" /></li>
              <li className="text-gray-900 font-medium">{property.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#38B496] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {property.listing_type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        property.status?.toLowerCase() === "sold" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                      {property.name}
                    </h1>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Icon icon="mdi:map-marker" className="text-[#38B496]" />
                      <span>{property.location}</span>
                    </div>

                    {/* Property Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {property.bedrooms && (
                        <div className="text-center">
                          <Icon icon="mdi:bed" className="text-2xl text-[#38B496] mx-auto mb-1" />
                          <p className="text-sm text-gray-600">{property.bedrooms} Bedrooms</p>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="text-center">
                          <Icon icon="mdi:shower" className="text-2xl text-[#38B496] mx-auto mb-1" />
                          <p className="text-sm text-gray-600">{property.bathrooms} Bathrooms</p>
                        </div>
                      )}
                      {property.area && (
                        <div className="text-center">
                          <Icon icon="mdi:ruler-square" className="text-2xl text-[#38B496] mx-auto mb-1" />
                          <p className="text-sm text-gray-600">{property.area} sq ft</p>
                        </div>
                      )}
                      <div className="text-center">
                        <Icon icon="mdi:calendar" className="text-2xl text-[#38B496] mx-auto mb-1" />
                        <p className="text-sm text-gray-600">Listed {new Date(property.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl lg:text-4xl font-bold text-[#38B496]">
                      <FormattedNumber value={property.price} style="currency" currency="RWF" />
                    </div>
                    <p className="text-gray-500 text-sm">Price</p>
                  </div>
                </div>
              </motion.div>

              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative">
                  <img
                    src={`http://localhost:4800${property.images[currentIndex]?.url}`}
                    alt={`${property.name} - Image ${currentIndex + 1}`}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => showImage(currentIndex - 1 < 0 ? property.images.length - 1 : currentIndex - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    <Icon icon="mdi:chevron-left" className="text-xl" />
                  </button>
                  <button
                    onClick={() => showImage(currentIndex + 1 === property.images.length ? 0 : currentIndex + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    <Icon icon="mdi:chevron-right" className="text-xl" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {property.images.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => showImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          currentIndex === index
                            ? "border-[#38B496] ring-2 ring-[#38B496]/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={`http://localhost:4800${img.url}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Icon icon="mdi:file-document" className="mr-2 text-[#38B496]" />
                  Description
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              </motion.div>

              {/* Location Map */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Icon icon="mdi:map" className="mr-2 text-[#38B496]" />
                  Location
                </h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <MapComponent 
                    coordinates={property.coordinates}
                    image={property.images[0]?.url}
                    price={property.price}
                    beds={property.listing_type}
                    propertyAddress={property.location} 
                  />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex gap-3 mb-4">
                  <Popover content={shareContent} trigger="hover" arrow={false} placement="top">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors duration-300">
                      <Icon icon="mdi:share-variant" className="text-lg" />
                      <span className="font-medium">Share</span>
                    </button>
                  </Popover>

                  <button 
                    onClick={toggleFavorite}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors duration-300 ${
                      favorites.includes(id)
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Icon icon={favorites.includes(id) ? "mdi:heart" : "mdi:heart-outline"} className="text-lg" />
                    <span className="font-medium">
                      {favorites.includes(id) ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                <button 
                  onClick={() => setShowAgentModal(true)}
                  className="w-full bg-[#38B496] hover:bg-[#2e9c81] text-white py-4 px-6 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:phone" className="text-lg" />
                  Contact Agent
                </button>
              </motion.div>

              {/* Agent Information */}
              {agentInfo && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Icon icon="mdi:account-tie" className="mr-2 text-[#38B496]" />
                    Property Agent
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#38B496] to-[#F15C26] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:account" className="text-2xl text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{agentInfo.name || "Property Agent"}</h4>
                      <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {agentInfo.phone && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Icon icon="mdi:phone" className="text-[#38B496] text-xl" />
                        <span className="font-medium">Phone</span>
                        <a 
                          href={`tel:${agentInfo.phone}`}
                          className="text-[#38B496] hover:text-[#2e9c81] font-semibold"
                        >
                          {agentInfo.phone}
                        </a>
                      </div>
                    )}

                    {agentInfo.email && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon icon="mdi:email" className="text-[#38B496] text-xl" />
                          <span className="font-medium">Email</span>
                        </div>
                        <a 
                          href={`mailto:${agentInfo.email}`}
                          className="text-[#38B496] hover:text-[#2e9c81] font-semibold"
                        >
                          {agentInfo.email}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Inquiry Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Icon icon="mdi:message-text" className="mr-2 text-[#38B496]" />
                  Send Inquiry
                </h3>
                <InquiryForm 
                  propertyId={id}
                  propertyName={property.name}
                  agentInfo={agentInfo}
                  className="p-0"
                />
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Agent Contact Modal */}
      <Modal show={showAgentModal} onClose={() => setShowAgentModal(false)} size="md">
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Icon icon="mdi:account-tie" className="text-2xl text-[#38B496]" />
            <h3 className="text-xl font-bold">Contact Agent</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          {agentInfo ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#38B496] to-[#F15C26] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon="mdi:account" className="text-3xl text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{agentInfo.name || "Property Agent"}</h4>
                <p className="text-gray-600">Licensed Real Estate Agent</p>
              </div>

              <div className="space-y-4">
                {agentInfo.phone && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon icon="mdi:phone" className="text-[#38B496] text-xl" />
                      <span className="font-medium">Phone</span>
                    </div>
                    <a 
                      href={`tel:${agentInfo.phone}`}
                      className="text-[#38B496] hover:text-[#2e9c81] font-semibold"
                    >
                      {agentInfo.phone}
                    </a>
                  </div>
                )}

                {agentInfo.email && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon icon="mdi:email" className="text-[#38B496] text-xl" />
                      <span className="font-medium">Email</span>
                    </div>
                    <a 
                      href={`mailto:${agentInfo.email}`}
                      className="text-[#38B496] hover:text-[#2e9c81] font-semibold"
                    >
                      {agentInfo.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {agentInfo.phone && (
                  <a 
                    href={`tel:${agentInfo.phone}`}
                    className="flex-1 bg-[#38B496] hover:bg-[#2e9c81] text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon icon="mdi:phone" />
                    Call Now
                  </a>
                )}
                
                {agentInfo.email && (
                  <a 
                    href={`mailto:${agentInfo.email}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Icon icon="mdi:email" />
                    Send Email
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon icon="mdi:account-off" className="text-6xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Agent Information Unavailable</h4>
              <p className="text-gray-500">Contact information for this property's agent is not available at the moment.</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Footer/>
    </>
  );
}

export default PropertyDetails;
