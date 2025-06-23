import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/whitelogo.png";
import { Icon } from "@iconify/react";

function Footer() {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const services = [
    {
      icon: "mdi:truck-delivery",
      title: "Professional Service",
      description: "Expert real estate guidance and support"
    },
    {
      icon: "mdi:headset",
      title: "24/7 Support",
      description: "Round-the-clock customer assistance"
    },
    {
      icon: "mdi:shield-check",
      title: "Trusted & Secure",
      description: "Safe and reliable property transactions"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/listings" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Map Search", path: "/map-search" }
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" }
  ];

  const socialLinks = [
    { icon: "mdi:facebook", url: "#", label: "Facebook" },
    { icon: "mdi:twitter", url: "#", label: "Twitter" },
    { icon: "mdi:instagram", url: "#", label: "Instagram" },
    { icon: "mdi:linkedin", url: "#", label: "LinkedIn" },
    { icon: "mdi:youtube", url: "#", label: "YouTube" }
  ];

  return (
    <>
      {/* Services Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Umuhuza</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exceptional real estate services with a commitment to excellence and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#38B496] to-[#F15C26] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon icon={service.icon} className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-gradient-to-r from-[#38B496] to-[#F15C26] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                <img src={Logo} alt="Umuhuza Logo" className="w-40 mb-4" />
                <p className="text-white/90 leading-relaxed mb-6">
                  Your trusted partner in finding the perfect property in Rwanda. We provide comprehensive real estate services with professionalism and integrity.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:map-marker" className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Kigali, Rwanda</p>
                    <p className="text-sm text-white/80">KGL Street 121</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:phone" className="text-white" />
                  </div>
                  <div>
                    <a 
                      href="tel:+250783224032"
                      className="font-medium hover:text-white/80 transition-colors"
                    >
                      +250 783 224 032
                    </a>
                    <p className="text-sm text-white/80">24/7 Support</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:email" className="text-white" />
                  </div>
                  <div>
                    <a 
                      href="mailto:umuhuza.store@gmail.com"
                      className="font-medium hover:text-white/80 transition-colors"
                    >
                      umuhuza.store@gmail.com
                    </a>
                    <p className="text-sm text-white/80">Get in touch</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <Icon icon="mdi:chevron-right" className="text-sm group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <Icon icon="mdi:chevron-right" className="text-sm group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6">Stay Connected</h3>
              
              {/* Newsletter */}
              <div className="mb-8">
                <p className="text-white/80 mb-4">Subscribe to our newsletter for updates</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-6 py-3 bg-white text-[#38B496] rounded-lg font-semibold hover:bg-white/90 transition-colors">
                    <Icon icon="mdi:send" />
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-white/80 mb-4">Follow us on social media</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon icon={social.icon} className="text-xl group-hover:scale-110 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white/80 text-sm"
              >
                © {currentYear} Umuhuza Real Estate. All rights reserved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 text-sm text-white/80"
              >
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
