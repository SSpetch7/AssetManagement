import React from "react";
import Logo from "../../assets/logo.png";
const Sidebar = () => {
  // const menu = [
  //     {name:'หน้าแรก', icon:''},
  //     {name:'home', icon:''},
  //     {name:'home', icon:''},
  //     {name:'home', icon:''},
  // ]
  return (
    <div className="h-screen border border-r border-gray-200 w-64">
      <div className="flex justify-center">
        <img src={Logo} alt="sci-kmutt" />
      </div>
    </div>
  );
};

export default Sidebar;
