import React from "react";
import Logo from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import HistoryIcon from "@mui/icons-material/History";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Sidebar = () => {
  return (
    <div class="h-screen border border-r border-gray-200 w-64">
      <div class="">
        <img src={Logo} alt="sci-kmutt" />
        <div class="px-6 pt-4">
          <ul class="flex flex-col space-y-2">
            <li class="relative text-gray-500 hover:text-white focus-within:text-white">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                <HomeIcon />
              </div>
              <a
                href="#"
                class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
              >
                หน้าแรก
              </a>
            </li>
            <li class="">
              <div class="relative flex justify-between text-gray-500 hover:text-white focus-within:text-white">
                <div class="flex items-center w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                    <DevicesOtherIcon />
                  </div>
                  <a
                    href="#"
                    class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
                  >
                    จัดการครุภัณฑ์
                  </a>
                </div>
                <button
                  class="absolute right-0 flex items-center p-1 rotate-0"
                  tabindex="-1"
                  id="arrow"
                >
                  <svg
                    class="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15.25 10.75L12 14.25L8.75 10.75"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="pt-2 pl-4">
                <ul
                  class="flex flex-col pl-2 text-gray-500 border-l border-gray-700"
                  id="submenu"
                >
                  <li>
                    <a
                      href="#"
                      class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-kmuttColor-800 hover:text-kmuttColor-500 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:text-kmuttColor-800"
                    >
                      ครุภัณฑ์ทั้งหมด
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-kmuttColor-800 hover:text-kmuttColor-500 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:text-kmuttColor-800"
                    >
                      ตรวจเช็คครุภัณฑ์
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="relative text-gray-500 hover:text-white focus-within:text-white">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                <InsertChartIcon />
              </div>
              <a
                href="#"
                class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
              >
                สรุปรวม
              </a>
            </li>
            <li class="relative text-gray-500 hover:text-white focus-within:text-white">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                <HistoryIcon />
              </div>
              <a
                href="#"
                class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
              >
                ประวัติการยืม
              </a>
            </li>
            <li class="relative text-gray-500 hover:text-white focus-within:text-white">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                <AccountBoxIcon />
              </div>
              <a
                href="#"
                class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
              >
                ข้อมูลผู้ยืม
              </a>
            </li>
            <li class="relative text-gray-500 hover:text-white focus-within:text-white">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">
                <AdminPanelSettingsIcon />
              </div>
              <a
                href="#"
                class="inline-block w-full py-2 pl-8 pr-4 text-xs rounded hover:bg-kmuttColor-800 focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
              >
                แอดมิน
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
