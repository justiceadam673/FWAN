import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ⬅️ Import translation hook
import NavBar from '../COMPONENTS/LANDING-PAGE/components/NavBer'
import Footer from '../COMPONENTS/LANDING-PAGE/components/Footer'

const HeaderFooter = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { t } = useTranslation(); // ⬅️ Translation hook

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const closeSidebar = () => setIsSidebarOpen(false);

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-[11px] p-3 rounded hover:bg-gray-100 ${
//       isActive ? "bg-green-100 text-green-600 font-semibold" : "text-black/90"
//     }`;

  return (
    <div className='flex h-screen '>
    <NavBar/>
    <div>{Outlet}</div>
    <Footer/>

    
    </div>
  );
};

export default HeaderFooter;
