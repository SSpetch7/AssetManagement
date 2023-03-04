import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar.jsx";
import Sidebar from "../../components/Sidebar/index.jsx";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Layout;
