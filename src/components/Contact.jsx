import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";

function Contact() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <>
      {/* Include navigations */}
      <Nav />

      {/* Contact Section */}
      <div className="flex w-full mt-52 flex-col-reverse lg:flex-row justify-center items-center">
        
        {/* Contact Details */}
        <div className="w-full lg:w-2/5">
          <div className="p-10 w-full lg:w-4/5 bg-green-400">
            <div className="border-b w-80 pb-2">
              <p className="text-white font-semibold text-lg mb-3">{t("callToUs")}</p>
              <p className="text-white mb-4">{t("callToUsDetails")}</p>
              <a className="text-white" href="tel:+250783224032">
                {t("phone")}: +250 783 224 032
              </a>
            </div>

            <p className="text-lg font-semibold text-white mt-4">{t("writeToUs")}</p>
            <p className="text-white mb-4">{t("writeToUsDetails")}</p>

            <a className="text-white mt-2" href="mailto:umuhuza.store@gmail.com">
              {t("email")}: umuhuza.store@gmail.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-10/12 lg:w-1/2 bg-green-500 p-10">
          <div className="flex flex-col justify-center items-center lg:flex-row">
            <input
              className="p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl"
              placeholder={t("yourName")}
            />
            <input
              className="p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl"
              placeholder={t("yourEmail")}
            />
            <input
              className="p-4 focus:outline-none w-64 m-1 rounded-md shadow-xl"
              placeholder={t("yourPhone")}
            />
          </div>
          <textarea
            className="h-28 focus:outline-none text-start p-2 shadow-xl rounded-md w-full mb-5 mt-5"
            placeholder={t("yourMessage")}
          />
          <button className="p-2 bg-green-600 text-white rounded-md">
            {t("sendMessage")}
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Contact;
