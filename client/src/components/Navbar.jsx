import React, { useEffect } from 'react';
import avatar from '../assets/pic.jpg';
import { useStateContext } from '../contexts/ContextProvider';
import { Tooltip } from '@mui/material';
import AdminProfile from './AdminProfile';
import Notification from './Notification';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom" arrow>
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-1 rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 labtop:ml-0 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActive) => !prevActive)}
        color="#FF8261"
        icon={<MenuIcon />}
      />
      <div className="flex ">
        <NavButton
          title="Notifications"
          dotColor="#FFB39F"
          customFunc={() => handleClick('notification')}
          color="#FF8261"
          icon={<NotificationsNoneIcon />}
        />
        <Tooltip title="Profile" placement="bottom" arrow>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg "
            onClick={() => handleClick('adminProfile')}
          >
            <img
              className="rounded-full object-cover  w-10 h-10"
              src={avatar}
            />
            <p>
              <span className="text-gray-400 font-bold ml-1  text-20 ">
                Admin
              </span>
            </p>
            <KeyboardArrowDownIcon className="text-gray-400 font-bold ml-1 text-14 " />
          </div>
        </Tooltip>
        {isClicked.notification && <Notification />}
        {isClicked.adminProfile && <AdminProfile />}
      </div>
    </div>
  );
};

export default Navbar;
