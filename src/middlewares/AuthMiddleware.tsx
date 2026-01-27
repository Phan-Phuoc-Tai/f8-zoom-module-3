import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddleware() {
  const isLogin = localStorage.getItem("access_token") ? true : false;
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to={`/login?continue=${location.pathname}`} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
