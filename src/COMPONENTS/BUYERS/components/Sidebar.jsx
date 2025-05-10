import { NavLink } from "react-router-dom";
import {
  // FaHome,
  FaListAlt,
  FaTags,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Icon } from "@iconify/react";
import logo from "../../../assets/img/fwan.png";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-[11px] p-3 rounded hover:bg-gray-100  ${
      isActive ? "bg-green-100 text-green-600 font-semibold" : "text-black/90"
    }`;

  return (
    <div className='w-64 h-full border-r-4 border-black/25 space-y-[80px] p-[30px] hidden md:block'>
      <img
        src={logo}
        alt='FWAN Logo'
        className='h-[58px] w-[124px] mb-[45px]  '
      />
      <nav className='flex flex-col gap-[23px]'>
        <NavLink to='/dashboard' className={linkClass}>
          {/* <FaHome size={30} /> Dashboard */}
          <Icon icon='fluent:home-28-regular' width='50' height='50' />{" "}
          Dashboard
        </NavLink>
        <NavLink to='/listings' className={linkClass}>
          <Icon icon='el:list-alt' width='50' height='50' /> All Listings
        </NavLink>
        <NavLink to='/offers' className={linkClass}>
          <Icon icon='jam:messages' width='50' height='50' /> My Offers
        </NavLink>
        <NavLink to='/history' className={linkClass}>
          <Icon icon='ep:bell' width='50' height='50' /> History
        </NavLink>
        <NavLink to='/profile' className={linkClass}>
          <Icon icon='gg:profile' width='50' height='50' /> Profile
        </NavLink>
      </nav>
      <div className='flex flex-col '>
        <button className='flex items-center text-black/90 gap-2 p-3 -600 hover:bg-red-100 w-full rounded'>
          <Icon icon='material-symbols:logout' width='50' height='50' /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
