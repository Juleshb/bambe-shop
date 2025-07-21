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
      {/* Minimal Main Footer */}
      <footer className="bg-gradient-to-r from-[#38B496] to-[#F15C26] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Company Info */}
          <div className="flex items-center gap-4">
            <img src={Logo} alt="Umuhuza Logo" className="w-24" />
            <span className="font-semibold tracking-wide">Umuhuza Real Estate</span>
          </div>
            {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {quickLinks.map((link) => (
                    <Link
                    key={link.name}
                      to={link.path}
                className="hover:underline hover:text-white/90 transition-colors"
                    >
                      {link.name}
                    </Link>
            ))}
              </div>
              {/* Social Links */}
                <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                      key={social.label}
                      href={social.url}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={social.label}
                    >
                <Icon icon={social.icon} className="text-lg" />
              </a>
                  ))}
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/80">
            <span>© {currentYear} Umuhuza Real Estate. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:underline hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline hover:text-white">Terms of Service</Link>
              <Link to="/cookies" className="hover:underline hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
