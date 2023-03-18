import { useState } from "react";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${
          pathname.includes(data.name) &&
          "text-blue-600" &&
          "inline-block w-full py-2 pl-8 pr-4 text-base rounded text-gray-500 hover:bg-kmuttColor-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-kmuttColor-500 focus:bg-kmuttColor-800"
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.nameTh}</p>
        <KeyboardArrowDownIcon
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col text-sm pl-14 text-[0.8rem] font-normal overflow-hidden "
      >
        {data.menus?.map((menu) => (
          <li key={menu}>
            {/* className="hover:text-blue-600 hover:font-medium" */}
            <NavLink
              to={`/${data.name}/${menu}`}
              className="link !bg-transparent capitalize"
            >
              {menu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
