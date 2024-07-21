import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const data = localStorage.getItem('data')
  return data? <Outlet />: <Navigate to='/signup'/>
};

export default PrivateComponent;
