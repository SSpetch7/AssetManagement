import React, { useState } from "react";

import Navbar from "components/Navbar/Navbar.jsx";
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
