import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/img/fwan.png";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact Us", path: "/contactus" },
  ];

  return (
    <header className='bg-white  h-[64px] md:h-fit place-content-center lg:pt-[28px] lg:pb-[21px] 2xl:px-[95px] shadow-md fixed w-full z-50'>
      <nav className='flex justify-between items-center max-h-[55px] px-[12px] md:px-[80px]'>
        <img
          src={Logo}
          alt='Logo'
          className='h-[30px] md:h-[50px] w-auto object-contain'
        />

        {/* Desktop Nav */}
        <ul className='hidden lg:flex space-x-10 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <li key={idx} className='text-[20px] poppins-regular'>
              <NavLink
                to={link.path}
                onClick={() => setActiveLink(link.name)}
                className={({ isActive }) =>
                  `cursor-pointer hover:text-[#3D8236]  transition duration-[.5s] ${
                    activeLink === link.name || isActive
                      ? `text-[#3D8236] transition duration-[.5s] poppins-semibold underline underline-offset-[7px] `
                      : "text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Sign Up */}
        <NavLink
          to='/role'
          onClick={() => setActiveLink("Sign Up")}
          className='hidden p-[10px] w-[187px] h-[55px] text-center lg:flex items-center justify-center rounded-[20px] text-white bg-[#3D8236] text-[20px] hover:bg-[#2c7125]'
        >
          Get Started
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          className='lg:hidden text-3xl text-black'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='lg:hidden bg-white w-full  shadow-md py-4 px-6 space-y-4 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <div key={idx}>
              <NavLink
                to={link.path}
                onClick={() => {
                  setMenuOpen(false);
                  setActiveLink(link.name);
                }}
                className={({ isActive }) =>
                  `block cursor-pointer hover:text-[#3D8236] ${
                    activeLink === link.name || isActive
                      ? "text-[#3D8236]"
                      : "text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </div>
          ))}

          {/* Mobile Sign Up */}
          <NavLink
            to='/signup'
            onClick={() => {
              setMenuOpen(false);
              setActiveLink("Sign Up");
            }}
            className={`block w-full py-2 text-center rounded-[8px] ${
              activeLink === "Sign Up"
                ? "bg-[#3D8236] text-white"
                : "bg-gray-200 text-black hover:bg-[#3D8236] hover:text-white"
            }`}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
