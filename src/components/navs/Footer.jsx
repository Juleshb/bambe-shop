import React from "react";
import Logo from "../assets/whitelogo.png";
import { Icon } from "@iconify/react";
import delivery from "../assets/delivery.png";
import money from "../assets/money.png";
import Services from "../assets/Services.png";

function Footer() {
  return (
    <>
      <div className="flex justify-center items-center w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl text-center">
          <div className="mt-5 lg:mt-20 flex flex-col items-center">
            <img className="w-14 mb-2" src={delivery} alt="Free Delivery" />
            <p className="font-bold">FREE AND FAST DELIVERY</p>
            <p className="text-sm text-gray-600">Free delivery for all orders over $140</p>
          </div>

          <div className="mt-5 lg:mt-20 flex flex-col items-center">
            <img className="w-14 mb-2" src={Services} alt="Customer Service" />
            <p className="font-bold">24/7 CUSTOMER SERVICE</p>
            <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
          </div>

          <div className="mt-5 lg:mt-20 mb-10 flex flex-col items-center">
            <img className="w-14 mb-2" src={money} alt="Money Back" />
            <p className="font-bold">MONEY BACK GUARANTEE</p>
            <p className="text-sm text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </div>

      <div className="bg-[#F15C26] w-full flex justify-center">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-20 text-white w-full max-w-6xl">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img src={Logo} alt="Logo" className="w-32 mb-4" />
          </div>

          {/* Support */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">Support</p>
            <p className="text-sm">KGL Street 121</p>
            <a className="block text-sm mt-2" href="mailto:umuhuza.store@gmail.com">umuhuza.store@gmail.com</a>
            <a className="block text-sm" href="tel:+250783224032">+250 783 224 032</a>
          </div>

          {/* Account */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">Account</p>
            <p className="text-sm mb-2">My Account</p>
            <p className="text-sm mb-2">Login / Register</p>
            <p className="text-sm mb-2">Cart</p>
            <p className="text-sm mb-2">Wishlist</p>
            <p className="text-sm">Shop</p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">Quick Links</p>
            <p className="text-sm mb-2">Privacy Policy</p>
            <p className="text-sm mb-2">Terms of Use</p>
            <p className="text-sm mb-2">FAQ</p>
            <p className="text-sm">Contact</p>
          </div>

          {/* Download App */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">Download App</p>
            <p className="text-sm mb-4 flex">
            <Icon icon="arcticons:google-play-store" width="32" height="32" className="mr-6" />
            <Icon icon="ph:app-store-logo-light" width="32" height="32" />
            </p>
            <div className="flex justify-center lg:justify-start space-x-3">
            <Icon icon="proicons:instagram" width="24" height="24" />
            <Icon icon="line-md:twitter-x-alt" width="24" height="24" />
            <Icon icon="ri:linkedin-fill" width="24" height="24" />
            <Icon icon="ic:sharp-tiktok" width="24" height="24" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Footer;
