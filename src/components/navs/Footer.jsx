import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import Logo from "../assets/whitelogo.png";
import { Icon } from "@iconify/react";
import delivery from "../assets/delivery.png";
import money from "../assets/money.png";
import Services from "../assets/Services.png";

function Footer() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <>
      {/* Service Section */}
      <div className="flex justify-center items-center w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl text-center">
          <div className="mt-5 lg:mt-20 flex flex-col items-center">
            <img className="w-14 mb-2" src={delivery} alt="Free Delivery" />
            <p className="font-bold">{t("freeDelivery")}</p>
            <p className="text-sm text-gray-600">{t("freeDeliveryDetails")}</p>
          </div>

          <div className="mt-5 lg:mt-20 flex flex-col items-center">
            <img className="w-14 mb-2" src={Services} alt="Customer Service" />
            <p className="font-bold">{t("customerService")}</p>
            <p className="text-sm text-gray-600">{t("customerServiceDetails")}</p>
          </div>

          <div className="mt-5 lg:mt-20 mb-10 flex flex-col items-center">
            <img className="w-14 mb-2" src={money} alt="Money Back" />
            <p className="font-bold">{t("moneyBackGuarantee")}</p>
            <p className="text-sm text-gray-600">{t("moneyBackDetails")}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#F15C26] w-full flex justify-center">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-20 text-white w-full max-w-6xl">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img src={Logo} alt="Logo" className="w-32 mb-4" />
          </div>

          {/* Support */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">{t("support")}</p>
            <p className="text-sm">KGL Street 121</p>
            <a className="block text-sm mt-2" href="mailto:umuhuza.store@gmail.com">
              umuhuza.store@gmail.com
            </a>
            <a className="block text-sm" href="tel:+250783224032">+250 783 224 032</a>
          </div>

          {/* Account */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">{t("account")}</p>
            <p className="text-sm mb-2">{t("myAccount")}</p>
            <p className="text-sm mb-2">{t("loginRegister")}</p>
            <p className="text-sm mb-2">{t("cart")}</p>
            <p className="text-sm mb-2">{t("wishlist")}</p>
            <p className="text-sm">{t("shop")}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">{t("quickLinks")}</p>
            <p className="text-sm mb-2">{t("privacyPolicy")}</p>
            <p className="text-sm mb-2">{t("termsOfUse")}</p>
            <p className="text-sm mb-2">{t("faq")}</p>
            <p className="text-sm">{t("contact")}</p>
          </div>

          {/* Download App */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-lg font-semibold mb-4">{t("downloadApp")}</p>
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
