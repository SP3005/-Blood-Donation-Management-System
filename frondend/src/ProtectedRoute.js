import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./utils/auth"; // ✅ Corrected Path

const ProtectedRoute = ({ allowedRoles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(getUserRole())) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
