import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import logo from "../../../assets/img/fwan.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const closeSidebar = () => setIsSidebarOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-[11px] p-3 rounded hover:bg-gray-100 ${
      isActive ? "bg-green-100 text-green-600 font-semibold" : "text-black/90"
    }`;

  return (
    <>
      {/* Top Navbar */}
      <div className='flex justify-between items-center border-b border-gray-300 px-4 py-3 md:hidden'>
        <img src={logo} alt='FWAN Logo' className='h-10 w-auto' />
        <button onClick={toggleSidebar} className='text-black'>
          <Icon
            icon={isSidebarOpen ? undefined : "bi:list"}
            width='30'
            height='30'
            className='-z-50'
          />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l-4 border-black/25 p-[30px] transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0 md:block`}
      >
        {/* Logo in sidebar for desktop */}
        <div className='hidden md:block mb-[45px]'>
          <img src={logo} alt='FWAN Logo' className='h-[58px] w-[124px]' />
        </div>

        <nav className='flex flex-col  md:gap-[23px] gap-[10px]'>
          <button
            onClick={toggleSidebar}
            className='text-black md:hidden w-full flex justify-end '
          >
            <Icon
              icon={isSidebarOpen ? "mdi:close" : undefined}
              width='30'
              height='30'
            />
          </button>
          <NavLink to='/dashboard' className={linkClass} onClick={closeSidebar}>
            <Icon icon='fluent:home-28-regular' width='50' height='50' />
            Dashboard
          </NavLink>
          <NavLink to='/listings' className={linkClass} onClick={closeSidebar}>
            <Icon icon='el:list-alt' width='50' height='50' />
            All Listings
          </NavLink>
          <NavLink to='/offers' className={linkClass} onClick={closeSidebar}>
            <Icon icon='jam:messages' width='50' height='50' />
            My Offers
          </NavLink>
          <NavLink to='/history' className={linkClass} onClick={closeSidebar}>
            <Icon icon='ep:bell' width='50' height='50' />
            History
          </NavLink>
          <NavLink to='/profile' className={linkClass} onClick={closeSidebar}>
            <Icon icon='gg:profile' width='50' height='50' />
            Profile
          </NavLink>
        </nav>

        <div className='flex flex-col mt-10'>
          <button className='flex items-center text-black/90 gap-2 p-3 hover:bg-red-100 w-full rounded'>
            <Icon icon='material-symbols:logout' width='50' height='50' />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
