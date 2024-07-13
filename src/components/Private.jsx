import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Private;
