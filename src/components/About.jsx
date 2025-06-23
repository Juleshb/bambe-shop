import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Nav from './navs/Nav';
import Footer from './navs/Footer';

const About = () => {
  const values = [
    {
      icon: "mdi:shield-check",
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our dealings"
    },
    {
      icon: "mdi:account-tie",
      title: "Professionalism",
      description: "Delivering expert services with dedication and competence"
    },
    {
      icon: "mdi:clock-outline",
      title: "Time Management",
      description: "Respecting your time with efficient and timely services"
    },
    {
      icon: "mdi:heart",
      title: "Customer Care",
      description: "Putting our clients' needs first with personalized attention"
    },
    {
      icon: "mdi:star",
      title: "Excellence",
      description: "Striving for the highest quality in everything we do"
    }
  ];

  const stats = [
    { number: "1M+", label: "Tourists Annually", icon: "mdi:airplane" },
    { number: "100%", label: "Client Satisfaction", icon: "mdi:heart" },
    { number: "24/7", label: "Support Available", icon: "mdi:headset" },
    { number: "5+", label: "Years Experience", icon: "mdi:trophy" }
  ];

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#38B496] to-[#F15C26] py-20 mt-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About Umuhuza
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your trusted partner in finding the perfect property in Rwanda's dynamic real estate market
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Introduction</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Rwanda is a rapidly growing country, where the residents are settling in Kigali and other urban areas outside Kigali, joyfully, we are also a touristic country, as we welcome more than a million tourists every year making Rwanda to be among the very dynamic nations all over Africa. In fact, it is understood that we need connectors.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <div className="space-y-6 text-lg text-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#38B496] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:check" className="text-white text-sm" />
                    </div>
                    <p>
                      So, we are an estate company serving to help all these people find their own homes and plots, renting houses and apartments.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#F15C26] rounded-full flex items-center justify-center">
                      <Icon icon="mdi:check" className="text-white text-sm" />
                    </div>
                    <p>
                      As we are growing, we shall offer land acquisition and development, property management and property valuation services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#38B496] to-[#F15C26] rounded-2xl p-8 text-white">
                  <Icon icon="mdi:home-city" className="text-6xl mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Comprehensive Real Estate Solutions</h3>
                  <p className="text-white/90">
                    From finding your dream home to managing your investments, we provide end-to-end real estate services tailored to your needs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#38B496] to-[#2e9c81] rounded-2xl p-8 text-white"
              >
                <Icon icon="mdi:target" className="text-5xl mb-6" />
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  Helping clients to get information regarding buying, selling and renting properties in an easy way.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#F15C26] to-[#e04a1a] rounded-2xl p-8 text-white"
              >
                <Icon icon="mdi:eye" className="text-5xl mb-6" />
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  To be the most credible source of property information and the trusted leader in real estate services in Rwanda.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The core principles that guide everything we do and every decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#38B496] to-[#F15C26] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon icon={value.icon} className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-[#38B496] to-[#F15C26] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon={stat.icon} className="text-3xl text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#38B496] to-[#F15C26]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who have found their dream homes with Umuhuza
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/listings"
                  className="bg-white text-[#38B496] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                >
                  <Icon icon="mdi:home-search" className="mr-2" />
                  Browse Properties
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#38B496] transition-colors duration-300 flex items-center justify-center"
                >
                  <Icon icon="mdi:phone" className="mr-2" />
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
