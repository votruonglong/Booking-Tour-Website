import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { role } = useSelector((state) => state.auth)


  return role == "Admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
