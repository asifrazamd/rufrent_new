// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");

  return jwtToken !== undefined ? children : <Navigate to="/user" replace />;
};

export default ProtectedRoute;
