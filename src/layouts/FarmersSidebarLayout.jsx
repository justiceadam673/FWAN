import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../assets/img/fwan.png";
import LanguageSwitcher from "../COMPONENTS/GENERAL-UTILITY/LanguageSwitcher";

const FarmersSidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const linkClass =
    "flex items-center gap-2 text-black/90 p-3 hover:bg-green-100 rounded";

  return (
    <div className='flex h-screen font-[poppins]'>
      <div
        className={`fixed md:relative z-50 top-0 right-0 h-full w-[288px] border-r border-black/25 p-[30px] transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "-translate-x-0 bg-white"
            : "translate-x-full bg-[#EAEAEA]"
        } md:translate-x-0`}
      >
        {/* Top Close Button for Mobile */}
        <div className='flex justify-end items-center md:hidden mb-4'>
          <button onClick={toggleSidebar} className='text-black'>
            <Icon icon='mdi:close' width='30' height='30' />
          </button>
        </div>

        {/* Logo in sidebar for desktop */}
        <div className='hidden md:block mb-[45px]'>
          <img src={logo} alt='FWAN Logo' className='h-[40px] w-[124px]' />
        </div>

        <nav className='flex flex-col gap-3'>
          <NavLink
            to='/farmersdashboard'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='mage:dashboard-2' width='40' height='40' />
            Overview
          </NavLink>
          <NavLink
            to='/farmerlistings'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='solar:clipboard-outline' width='40' height='40' />
            Listings
          </NavLink>
          <NavLink
            to='/farmeroffers'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='tabler:message' width='40' height='40' />
            My Offers
          </NavLink>
          <NavLink
            to='/farmerhistory'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='icon-park:history' width='40' height='40' />
            History
          </NavLink>
          <NavLink
            to='/farmertracking'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='hugeicons:location-08' width='40' height='40' />
            Tracking
          </NavLink>
          <NavLink
            to='/farmerprofile'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='fluent:person-28-regular' width='40' height='40' />
            Profile
          </NavLink>
        </nav>

        <div className='mt-auto pt-10'>
          <LanguageSwitcher />
          <NavLink
            to='/'
            className='flex items-center text-black/90 gap-2 p-3 hover:bg-red-100 w-full rounded'
          >
            <Icon icon='material-symbols:logout' width='40' height='40' />
            Log Out
          </NavLink>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {/* Mobile Top Navbar */}
        <div className='md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white sticky top-0 z-40'>
          <img src={logo} alt='FWAN Logo' className='h-10 w-auto' />
          <button onClick={toggleSidebar} className='text-black'>
            <Icon icon='bi:list' width='30' height='30' />
          </button>
        </div>

        {/* Page Content */}
        <div className='p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FarmersSidebarLayout;
