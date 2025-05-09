import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaListAlt,
  FaTags,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../../assets/img/fwan.png";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-[11px] p-3 rounded hover:bg-gray-100  ${
      isActive ? "bg-green-100 text-green-600 font-semibold" : "text-black/90"
    }`;

  return (
    <div className='w-64 border-r-4 border-black/25 space-y-[100px]  p-[30px] hidden md:block'>
      <img
        src={logo}
        alt='FWAN Logo'
        className='h-[58px] w-[124px] mb-[45px]  '
      />
      <nav className='flex flex-col gap-[23px]'>
        <NavLink to='/dashboard' className={linkClass}>
          <FaHome size={30} /> Dashboard
        </NavLink>
        <NavLink to='/listings' className={linkClass}>
          <FaListAlt size={30} /> All Listings
        </NavLink>
        <NavLink to='/offers' className={linkClass}>
          <FaTags size={30} /> My Offers
        </NavLink>
        <NavLink to='/history' className={linkClass}>
          <FaHistory size={30} /> History
        </NavLink>
        <NavLink to='/profile' className={linkClass}>
          <FaUser size={30} /> Profile
        </NavLink>
      </nav>
      <div className='mt-auto pt-10'>
        <button className='flex items-center text-black/90 gap-2 p-3 -600 hover:bg-red-100 w-full rounded'>
          <FaSignOutAlt size={30} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
