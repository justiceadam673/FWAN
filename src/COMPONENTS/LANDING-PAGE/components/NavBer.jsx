import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/img/fwan.png";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Hamburger and close icons

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: "Home", type: "route", path: "/" },
    { name: "About Us", type: "scroll", path: "about" },
    { name: "Collections", type: "scroll", path: "collections" },
    { name: "Testimonials", type: "scroll", path: "testimonials" },
    { name: "FAQs", type: "scroll", path: "faqs" },
  ];

  return (
    <header className='bg-white  lg:p-[15px] shadow-md fixed w-full z-50'>
      <nav className='flex justify-between items-center h-[80px] px-6 md:px-10'>
        <img
          src={Logo}
          alt='Logo'
          className='h-[30px] md:h-[50px] w-auto  object-contain'
        />

        {/* Desktop Nav */}
        <ul className='hidden lg:flex space-x-10 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <li key={idx}>
              {link.type === "scroll" ? (
                <ScrollLink
                  to={link.path}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className='cursor-pointer text-[20px] text-black hover:text-[#3D8236] focus:text-[#3D8236]'
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <NavLink
                  to={link.path}
                  className='text-black text-[20px] cursor-pointer hover:text-[#3D8236] focus:text-[#3D8236] '
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Sign Up */}
        <NavLink
          to='/signup'
          className='hidden lg:block bg-[#3D8236] text-white py-2 px-6 rounded-[8px] text-[16px]'
        >
          Sign Up
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
        <div className='lg:hidden bg-white shadow-md py-4 px-6 space-y-4 text-[18px] font-medium'>
          {navLinks.map((link, idx) => (
            <div key={idx}>
              {link.type === "scroll" ? (
                <ScrollLink
                  to={link.path}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  className='block text-black hover:text-[#3D8236] cursor-pointer'
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className='block text-black hover:text-[#3D8236]'
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* Mobile Sign Up Button */}
          <NavLink
            to='/signup'
            onClick={() => setMenuOpen(false)}
            className='block w-full bg-[#3D8236] text-white py-2 text-center rounded-[8px]'
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default NavBar;
