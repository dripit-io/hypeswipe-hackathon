import React from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isConnected } = useAccount();

  if (isConnected && window.location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  if (!isConnected && window.location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  return children;
};
