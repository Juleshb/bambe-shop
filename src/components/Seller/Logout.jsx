import React, { useContext } from "react";
import { AuthContext } from "../contex/authocontex";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthData(null); 
    navigate("/Login"); 
  };

 };

export default Logout;
