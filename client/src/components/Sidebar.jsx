import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import CloseIcon from '@mui/icons-material/Close';
import { menus } from '../assets/menus';
import { borrowMenu } from '../assets/menus';
import { userMenus } from '../assets/menus';
import SubMenu from './sidebar/Submenu';
import { Tooltip } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
// icon
import HomeIcon from '@mui/icons-material/Home';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setRole(res.data.role);
        } else {
          setAuth(false);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const activeLink =
    'flex items-center  gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center  gap-5 pl-4  pt-3 pb-2.5 rounded-lg text-md text-gray-500  hover:bg-light-gray m-2';

  return (
    <>
      {auth ? (
        <div className="w-64  labtop:w-50 ml-3 h-screen md:overflow-hidden  overflow-auto md:hover:overflow-auto pb-10">
          {activeMenu && (
            <>
              <div className="flex justify-between item-center">
                <Link
                  to="/Home"
                  onClick={() => handleCloseSidebar}
                  className="items-center gap-3 ml-3 mt-4 flex "
                >
                  <img src={Logo} className="w-9/12 " alt="sci-kmutt" />
                </Link>
                <div className="items-start">
                  <Tooltip title="ปิด">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                      }
                      className="rounded-full   hover:bg-light-gray mt-4 block md:hidden"
                    >
                      <CloseIcon />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-10">
                <NavLink
                  to="/Home"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <HomeIcon />
                  <span className="text-xl font-bold ">หน้าแรก</span>
                </NavLink>

                {menus?.map((menu) => (
                  <div
                    key={menu.name}
                    className="link flex flex-col pl-4 m-2 pb-2 pt-2   gap-1 text-gray-500"
                  >
                    <SubMenu data={menu} />
                  </div>
                ))}
                {/* <NavLink
              to="/checkAsset"
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#FF8261' : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <PublishedWithChangesIcon />
              <span className="text-xl font-bold ">ตรวจเช็คครุภัณฑ์</span>
            </NavLink>
       */}
                <NavLink
                  to="/report"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <DescriptionIcon />
                  <span className="text-xl font-bold ">รายงาน</span>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <InsertChartIcon />
                  <span className="text-xl font-bold ">กราฟสรุปผล</span>
                </NavLink>
                {/* {borrowMenu?.map((menu) => (
              <div
                key={menu.name}
                className="link flex flex-col pl-4 m-2 pb-2 pt-2   gap-1 text-gray-500"
              >
                <SubMenu data={menu} />
              </div>
            ))} */}
                <NavLink
                  to="/admin"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <AdminPanelSettingsIcon />
                  <span className="text-xl font-bold ">ผู้ดูแล</span>
                </NavLink>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-64  labtop:w-50 ml-3 h-screen md:overflow-hidden  overflow-auto md:hover:overflow-auto pb-10">
          {activeMenu && (
            <>
              <div className="flex justify-between item-center">
                <Link
                  to="/Home"
                  onClick={() => handleCloseSidebar}
                  className="items-center gap-3 ml-3 mt-4 flex "
                >
                  <img src={Logo} className="w-9/12 " alt="sci-kmutt" />
                </Link>
                <div className="items-start">
                  <Tooltip title="ปิด">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                      }
                      className="rounded-full   hover:bg-light-gray mt-4 block md:hidden"
                    >
                      <CloseIcon />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-10">
                <NavLink
                  to="/Home"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <HomeIcon />
                  <span className="text-xl font-bold ">หน้าแรก</span>
                </NavLink>

                {userMenus?.map((menu) => (
                  <div
                    key={menu.name}
                    className="link flex flex-col pl-4 m-2 pb-2 pt-2   gap-1 text-gray-500"
                  >
                    <SubMenu data={menu} />
                  </div>
                ))}

                <NavLink
                  to="/report"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <DescriptionIcon />
                  <span className="text-xl font-bold ">รายงาน</span>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  <InsertChartIcon />
                  <span className="text-xl font-bold ">กราฟสรุปผล</span>
                </NavLink>
                {borrowMenu?.map((menu) => (
                  <div
                    key={menu.name}
                    className="link flex flex-col pl-4 m-2 pb-2 pt-2   gap-1 text-gray-500"
                  >
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
