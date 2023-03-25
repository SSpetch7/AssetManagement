import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import CloseIcon from '@mui/icons-material/Close';
import { menus } from '../assets/menus';
import { Tooltip } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700  hover:bg-light-gray m-2';

  return (
    <div className="w-64 ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between item-center">
            <Link
              to="/"
              onClick={() => handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex "
            >
              <img src={Logo} width="100%" alt="sci-kmutt" />
            </Link>
            <div className="items-start">
              <Tooltip title="ปิด">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                  }
                  className="rounded-full p-3 hover:bg-light-gray mt-4 block "
                >
                  <CloseIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="mt-10">
            {menus.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 ">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span>{link.nameTh}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
