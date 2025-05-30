import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next"; // ⬅️ Import translation hook
import logo from "../assets/img/fwan.png";
import LanguageSwitcher from "../COMPONENTS/GENERAL-UTILITY/LanguageSwitcher";

const BuyersSidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation(); // ⬅️ Translation hook

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-[11px] p-3 rounded hover:bg-gray-100 ${
      isActive ? "bg-green-100 text-green-600 font-semibold" : "text-black/90"
    }`;

  return (
    <div className='flex h-screen font-[Inter]'>
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 top-0 right-0 h-full w-64  border-r border-black/25 p-[30px] transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "-translate-x-0 bg-white "
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
            to='/buyersoverview'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='fluent:home-28-regular' width='40' height='40' />
            {t("dashboard")}
          </NavLink>
          <NavLink
            to='/buyerslistings'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='el:list-alt' width='40' height='40' />
            {t("all_listings")}
          </NavLink>
          <NavLink
            to='/buyersoffers'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='mdi:cart-outline' width='40' height='40' />
            {t("carts")}
          </NavLink>
          <NavLink
            to='/buyershistory'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='ep:bell' width='40' height='40' />
            {t("history")}
          </NavLink>
          <NavLink
            to='/buyersprofile'
            className={linkClass}
            onClick={closeSidebar}
          >
            <Icon icon='gg:profile' width='40' height='40' />
            {t("profile")}
          </NavLink>
        </nav>

        <div className='mt-auto pt-10'>
          <LanguageSwitcher />
          <button className='flex items-center text-black/90 gap-2 p-3 hover:bg-red-100 w-full rounded'>
            <Icon icon='material-symbols:logout' width='40' height='40' />
            <NavLink to={"/"}>{t("log_out")}</NavLink>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
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

export default BuyersSidebarLayout;
