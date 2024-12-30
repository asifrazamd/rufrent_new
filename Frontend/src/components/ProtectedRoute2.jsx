// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRoleStore } from "../store/roleStore";

const ProtectedRoute = ({ component: Component, roles }) => {
  // const jwtToken = Cookies.get("jwtToken");
  const role = useRoleStore((state) => state.role);
  console.log(role);

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/unauthorize" replace />;
  }
  return <Component />;
};

export default ProtectedRoute;
