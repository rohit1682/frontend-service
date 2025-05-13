import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const getUserRole = () => localStorage.getItem("role") || "client";

type RoleBasedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  const userRole = getUserRole();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
