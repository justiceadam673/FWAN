import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/img/fwan.png";
import { Icon } from "@iconify/react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className='bg-white h-[64px] border-b border-b-black md:h-fit px-[22px] place-content-center lg:pt-[28px] lg:pb-[21px] 2xl:px-[95px] fixed w-full z-50'>
      <nav className='flex justify-between lg:flex-row flex-row-reverse md:py-[40px] lg:py-0 items-center max-h-[55px] px-[12px] md:px-[80px]'>
        {/* Logo */}
        <img
          src={Logo}
          alt='Logo'
          className='h-[30px] md:h-[50px] w-auto object-contain'
        />

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex space-x-10 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <li key={idx} className='text-[20px] py-[24px] poppins-regular'>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `cursor-pointer hover:text-[#3D8236] transition duration-500 ${
                    isActive
                      ? "text-[#3D8236] poppins-semibold underline underline-offset-[7px]"
                      : "text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <NavLink
          to='/role'
          className='hidden p-[10px] w-[187px] h-[55px] text-center lg:flex items-center justify-center rounded-[20px] text-white bg-[#3D8236] text-[20px] hover:bg-[#2c7125]'
        >
          Get Started
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className='lg:hidden text-3xl text-black'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          {menuOpen ? (
            <Icon icon={"uil:times"} />
          ) : (
            <Icon icon='pajamas:hamburger' />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className='lg:hidden  bg-white w-full shadow-md py-4 px-6 space-y-4 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <div key={idx}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block cursor-pointer hover:text-[#3D8236] ${
                    isActive ? "text-[#3D8236]" : "text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </div>
          ))}

          {/* Mobile CTA */}
          <NavLink
            to='/role'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full py-2 text-center rounded-[8px] ${
                isActive
                  ? "bg-[#3D8236] text-white"
                  : "bg-gray-200 text-black hover:bg-[#3D8236] hover:text-white"
              }`
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
