// components/ProtectedRoute.tsx
import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/sign-in" replace />;
};

export const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return element;
};
