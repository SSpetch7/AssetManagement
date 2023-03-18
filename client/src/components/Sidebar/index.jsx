import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Logo from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import HistoryIcon from "@mui/icons-material/History";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      name: "จัดการครุภัณฑ์",
      icon: DevicesOtherIcon,
      menus: ["ครุภัณฑ์ทั้งหมด", "ตรวจเช็คครุภัณฑ์"],
    },
  ];

  return (
    <div class="h-screen border border-r border-gray-200 w-64">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem]
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center">
          <img src={Logo} width="100%" alt="sci-kmutt" />
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 pt-16 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li class="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
              <NavLink to={"/"} className="link">
                <HomeIcon size={23} className="min-w-max" />
                หน้าแรก
              </NavLink>
            </li>
            {(open || isTabletMid) && (
              <div className="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li class="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
              <NavLink to={"/authentication"} className="link">
                <InsertChartIcon size={23} className="min-w-max" />
                สรุปรวม
              </NavLink>
            </li>
            <li class="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
              <NavLink to={"/stroage"} className="link">
                <HistoryIcon size={23} className="min-w-max" />
                ประวัติการยืม
              </NavLink>
            </li>
            <li class="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
              <NavLink to={"/stroage"} className="link">
                <AccountBoxIcon size={23} className="min-w-max" />
                ข้อมูลผู้ยืม
              </NavLink>
            </li>
            <li class="inline-block w-full py-1 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800">
              <NavLink to={"/stroage"} className="link">
                <AdminPanelSettingsIcon size={23} className="min-w-max" />
                แอดมิน
              </NavLink>
            </li>
          </ul>
        </div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MenuIcon size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
