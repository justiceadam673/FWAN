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
    "flex items-center text-[16px] gap-[15px]  px-[10px] py-[15px] text-black/90  hover:text-[#3D8236] rounded-[8px]";

  return (
    <div className='flex h-screen  font-[poppins]'>
      <div
        className={`fixed md:relative z-50 top-0 right-0 h-full w-[288px] border-r border-black/25  px-[50px] transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "-translate-x-0 bg-[#F4FFEA"
            : "translate-x-full bg-[#F4FFEA]"
        } md:translate-x-0`}
      >
        {/* Top Close Button for Mobile */}
        <div className='flex justify-end items-center md:hidden mb-4'>
          <button onClick={toggleSidebar} className='text-black'>
            <Icon icon='mdi:close' width='30' height='30' />
          </button>
        </div>

        {/* Logo in sidebar for desktop */}
        <div className='hidden md:block mb-[53px] mt-[32px] '>
          <img src={logo} alt='FWAN Logo' className='h-[49px]  w-[150.592px]' />
        </div>

        <nav className='flex  flex-col gap-[16px]'>
          <NavLink
            to='/farmersdashboard'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon icon='mage:dashboard-2' width='24' height='24' />
            Overview
          </NavLink>
          <NavLink
            to='/farmerslisting'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon icon='solar:clipboard-outline' width='24' height='24' />
            Listings
          </NavLink>
          <NavLink
            to='/farmeroffers'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon icon='tabler:message' width='24' height='24' />
            My Offers
          </NavLink>
          <NavLink
            to='/farmerhistory'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon
              icon='codicon:history'
              width='24'
              height='24'
              // className='hover:text-[#3D8236]'
            />
            History
          </NavLink>
          <NavLink
            to='/farmertracking'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon icon='hugeicons:location-08' width='24' height='24' />
            Tracking
          </NavLink>
          <NavLink
            to='/farmerprofile'
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-black text-white flex items-center  gap-[15px]  px-[10px] py-[15px]  rounded-[8px] "
                  : `${linkClass}`
              } `
            }
            onClick={closeSidebar}
          >
            <Icon icon='fluent:person-28-regular' width='24' height='24' />
            Profile
          </NavLink>
        </nav>

        {/* <div className='mt-auto pt-10'><LanguageSwitcher /></div> */}
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
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FarmersSidebarLayout;
