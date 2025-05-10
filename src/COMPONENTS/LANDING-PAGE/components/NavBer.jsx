import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Logo from "../../../assets/img/fwan.png";

const NavBar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUpClick = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <main>
      <nav className='flex justify-between md:-px-[60px] xl:px-[104px] lg:px[80px] m-auto px-[50px] py-[37px] bg-white items-center p-4'>
        <img src={Logo} alt='' className='object-center' />
        <ul className='text-[20px] xl:gap-[37px] lg:gap-[20px] hidden xl:flex lg:flex'>
          <li>Home</li>
          <li>About Us</li>
          <li>Collections</li>
          <li>Testimonials</li>
          <li>FAQs</li>
        </ul>
        <button
          className='bg-[#3D8236] text-[#FFFFFF] xl:flex lg:flex hidden px-[32px] py-[16px] text-[20px] rounded-[8px]'
          onClick={handleSignUpClick} // Add onClick handler for navigation
        >
          Sign Up
        </button>
        <div className='hidden text-[50px] max-sm:flex max-sm:text-[30px]'>
          =
        </div>
      </nav>
    </main>
  );
};

export default NavBar;
