import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./authocontex";

const ProtectedRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);

  if (!authData) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
