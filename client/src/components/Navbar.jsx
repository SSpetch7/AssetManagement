import React, { useEffect, useState } from 'react';
import avatar from '../assets/pic.jpg';
import { useStateContext } from '../contexts/ContextProvider';
import { Tooltip } from '@mui/material';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import AdminProfile from './AdminProfile';
import Notification from './Notification';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';

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
    setLoginOn,
    loginOn,
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
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [admin_username, setAdmin_username] = useState('');
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .get('http://localhost:5000/logout')
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  const items = [
    {
      label: admin_username,
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
        },
        {
          label: 'logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            handleDelete();
          },
        },
      ],
    },
  ];

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setAdmin_username(res.data.admin_username);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);

  const items = [
    {
      label: 'Admin',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
        },
        {
          label: 'logout',
          icon: 'pi pi-fw pi-sign-out',
        },
      ],
    },
  ];

  return (
    <>
      {auth ? (
        <div>
          <div className="flex justify-between p-2 labtop:ml-0 md:mx-6 relative">
            <NavButton
              title="Menu"
              customFunc={() => setActiveMenu((prevActive) => !prevActive)}
              color="#FF8261"
              icon={<MenuIcon />}
            />
            <div className="flex h-16">
              <NavButton
                title="Notifications"
                dotColor="#FFB39F"
                customFunc={() => handleClick('notification')}
                color="#FF8261"
                icon={<NotificationsNoneIcon />}
              />
              <div className="flex items-center cursor-pointer p-1 rounded-lg pl-5">
                <img
                  className="rounded-full object-cover w-10 h-10"
                  src={avatar}
                />
                <Menubar model={items} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-2 labtop:ml-0 md:ml-6 relative bg-transparent">
          <NavButton
            title="Menu"
            customFunc={() => setActiveMenu((prevActive) => !prevActive)}
            color="#FF8261"
            icon={<MenuIcon />}
          />
          <div className="flex pr-4">
            <Link to="/login" className="pt-2 w-16">
              <Button
                className="p-button-info"
                text
                style={{ color: 'var(--surface-900-text)' }}
                onClick={() => setLoginOn((loginOn) => !loginOn)}
              >
                <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
