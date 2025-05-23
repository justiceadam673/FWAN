import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import Vector from "../../../assets/img/Vector.png"; // Adjust this path based on your actual logo location

export default function Footer() {
  return (
    <footer className='w-full font-[poppins] px-[20px] lg:px-[105px] lg:gap-[130px] overflow-hidden bg-[#292626]'>
      <div className='lg:max-w-[1440px] lg:mx-auto gap-[46px] py-10 flex items-center md:justify-between lg:gap-[130px] relative'>
        {/* Logo and Description */}
        <div className='md:w-[600px] flex flex-col lg:gap-14 gap-8'>
          <img src={Vector} alt='Fwan Logo' className='w-[124px] h-[40px]' />
          <div className='text-white/75 text-[12px] md:text-[20px] font-normal leading-normal font-[Poppins] '>
            Connecting farmers and families directly, supporting local farmers
            and enjoying healthier food.
          </div>

          <div className='flex gap-6'>
            <a href='#' aria-label='Instagram'>
              <FaInstagram className='lg:w-[36px] w-[26px] lg:h-[36px] h-[26px] text-pink-500 hover:text-pink-700 cursor-pointer' />
            </a>
            <a href='#' aria-label='Twitter'>
              <FaTwitter className='lg:w-[36px] w-[26px] lg:h-[36px] h-[26px] text-sky-500 hover:text-sky-600 cursor-pointer' />
            </a>
            <a href='#' aria-label='LinkedIn'>
              <FaLinkedin className='lg:w-[36px] w-[26px] lg:h-[36px] h-[26px] text-blue-600 hover:text-blue-800 cursor-pointer' />
            </a>
            <a href='#' aria-label='Facebook'>
              <FaFacebookF className='lg:w-[36px] w-[26px] lg:h-[36px] h-[26px] text-blue-700 hover:text-blue-900 cursor-pointer' />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className='lg:w-36 flex flex-col gap-[16px]  md:mt-0'>
          <h3 className='text-[#FFF] text-[24px] font-bold '>Explore</h3>
          <a
            href='#'
            className='text-[#FFF]  md:text-[15px] lg:text-[24px]  text-[12px] font-normal  hover:underline'
          >
            Home
          </a>
          <a
            href='#'
            className='text-[#FFF] md:text-[15px] lg:text-[24px] text-[12px] font-normal  hover:underline'
          >
            About Us
          </a>
          <a
            href='#'
            className='text-[#FFF]  md:text-[15px] lg:text-[24px] text-[12px] font-normal  hover:underline'
          >
            Collections
          </a>
          <a
            href='#'
            className='text-[#FFF] md:text-[15px] lg:text-[24px] text-[12px] font-normal  hover:underline'
          >
            Collections
          </a>
        </div>

        {/* About Links */}
        <div className='w-56 hidden md:flex flex-col gap-[16px] mt-10 md:mt-0'>
          <h3 className='text-[#FFF] text-[24px] font-bold '>About</h3>
          <a
            href='#'
            className='text-[#FFF]  lg:text-[24px] md:text-[15px] text-[12px] font-normal  hover:underline'
          >
            FAQs
          </a>
          <a
            href='#'
            className='text-[#FFF]  lg:text-[24px] md:text-[15px] text-[12px] font-normal  hover:underline'
          >
            Support
          </a>
          <a
            href='#'
            className=' text-[#FFF] lg:text-[24px] md:text-[15px] text-[12px] font-normal  hover:underline'
          >
            Subscribe
          </a>
          <a
            href='#'
            className='text-[#FFF]  lg:text-[24px] md:text-[15px] text-[12px] font-normal  hover:underline'
          >
            Terms of services
          </a>
        </div>
      </div>
      {/* Bottom bar */}
      <div className='w-full  text-center py-4 text-[12px] md:text-[15px] lg:text-[24px] font-normal font-[Poppins] text-[#FFF] leading-normal'>
        Copyright @ 2025, Fwan. All rights reserved
      </div>
    </footer>
  );
}
