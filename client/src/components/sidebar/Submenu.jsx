import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div>
      {activeMenu && (
        <>
          <span
            className={`flex flex-row gap-5 items-center  ${pathname.includes(
              data.name
            )}`}
            onClick={() => setSubMenuOpen(!subMenuOpen)}
          >
            <data.icon size={23} className="min-w-max" />
            <p className=" text-xl font-bold flex items-center rounded-lg text-md text-gray-500  hover:bg-light-gray ">
              {data.nameTh}
            </p>
            <IoIosArrowDown
              className={` ${subMenuOpen && 'rotate-180'} duration-200 `}
            />
          </span>
          <motion.ul
            animate={
              subMenuOpen
                ? {
                    height: 'fit-content',
                  }
                : {
                    height: 0,
                  }
            }
            className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
          >
            {data.menus.map((menu) => (
              <li key={menu}>
                {/* className="hover:text-blue-600 hover:font-medium" */}
                <NavLink
                  to={`/${data.name}/${menu.name}`}
                  className="text-xl link p-2 font-bold flex items-center rounded-lg text-md hover:bg-light-gray"
                  onClick={handleCloseSidebar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#FF8261' : '',
                    color: isActive ? '#ffffff' : '',
                  })}
                >
                  {menu.nameTh}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
};

export default SubMenu;
