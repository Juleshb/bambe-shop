import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import LoginImg from "./assets/signup-img.webp";
import google from "./assets/google.webp";
import { Link } from "react-router-dom";
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";
import axios from "axios";

function Signup() {
  const { t } = useTranslation(); // Initialize translation function

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4800/api/register", {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage(t("signupError"));
      }
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      {/* Include navigation */}
      <Nav />

      <div className="w-full flex mt-10 md:flex-col-reverse lg:flex-row ml-10 lg:ml-0">
        <img className="hidden lg:block w-96 lg:w-1/2 lg:h-1/3" src={LoginImg} alt="Signup" />

        <form onSubmit={handleSignup}>
          <div className="md:ml-32 flex flex-col justify-center items-center">
            <p className="text-4xl mb-7 font-semibold">{t("createAccount")}</p>
            <p className="mb-3 mt-60 text-2xl lg:mb-10">{t("enterDetails")}</p>

            {message && <p className="text-green-500 mb-4">{message}</p>}

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="text"
              placeholder={t("fullName")}
            />{" "}
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-10 w-80"
              type="text"
              placeholder={t("emailOrPhone")}
            />
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none border-b-2 border-slate-400 pb-1 mb-5 w-80"
              type="password"
              placeholder={t("password")}
            />
            <br />
            <button type="submit" className="bg-[#67c066] rounded-md mb-5 p-2 w-80 text-white">
              {t("createAccount")}
            </button>{" "}
            <br />
            <button className="hover:bg-[#67c066] hover:text-white mb-5 border flex w-80 justify-center items-center text-center p-2 rounded-md">
              <img src={google} alt="Google Signup" />
              <span className="ml-2">{t("signupWithGoogle")}</span>
            </button>
            <p className="text-slate-800">
              {t("alreadyHaveAccount")}{" "}
              <Link className="underline ml-2" to="/Login">
                {t("login")}
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Signup;
