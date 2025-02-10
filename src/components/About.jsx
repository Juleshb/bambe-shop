import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import buypr from "./assets/buypr.png";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";

function About() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <>
      {/* Include navigation */}
      <Nav />

      <div className="flex w-full mt-52 flex-col-reverse lg:flex-row justify-center items-center">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2">
          <div className="p-10 w-full lg:w-10/12 shadow-md shadow-slate-400 lg:shadow-md">
            <p className="text-5xl mb-10 font-semibold text-center">{t("ourStory")}</p>
            <p className="text-lg">{t("ourStoryDetails1")}</p>
            <p className="text-lg mt-5">{t("ourStoryDetails2")}</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-10/12 lg:w-1/2">
          <img className="rounded-lg shadow-xl shadow-slate-400 lg:shadow-md" src={buypr} alt="About Us" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default About;
