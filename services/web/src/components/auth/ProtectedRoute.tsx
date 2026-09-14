import React from "react";
import { Outlet } from "react-router-dom";

// ProtectedRoute placeholder - passes through to child routes without blocking
export const ProtectedRoute: React.FC = () => {
  return <Outlet />;
};
