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
    <footer className='w-full bg-[#FFFF] text-gray-700 overflow-hidden'>
      <div className='max-w-[1440px] mx-auto px-4 py-10 md:flex md:justify-between gap-[130px] relative'>
        {/* Logo and Description */}
        <div className='md:w-[600px] flex flex-col lg:gap-14 gap-8'>
          <img src={Vector} alt='Fwan Logo' className='w-[124px] h-[40px]' />
          <div className='text-black/75 text-[17px] font-normal font-inter'>
            Connecting farmers and families directly, supporting local farmers
            and enjoying healthier food.
          </div>
          <div className='flex gap-6'>
            <a href='#' aria-label='Instagram'>
              <FaInstagram className='w-9 h-9 text-pink-500 hover:text-pink-700 cursor-pointer' />
            </a>
            <a href='#' aria-label='Twitter'>
              <FaTwitter className='w-9 h-9 text-sky-500 hover:text-sky-600 cursor-pointer' />
            </a>
            <a href='#' aria-label='LinkedIn'>
              <FaLinkedin className='w-9 h-9 text-blue-600 hover:text-blue-800 cursor-pointer' />
            </a>
            <a href='#' aria-label='Facebook'>
              <FaFacebookF className='w-9 h-9 text-blue-700 hover:text-blue-900 cursor-pointer' />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className='w-36 flex flex-col gap-5 mt-10 md:mt-0'>
          <h3 className='text-black text-2xl font-bold font-inter'>Explore</h3>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            Home
          </a>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            About Us
          </a>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            Collections
          </a>
          <a
            href='#'
            className='text-black text-2xl font-normal font-[Inter] hover:underline'
          >
            Testimonial
          </a>
        </div>

        {/* About Links */}
        <div className='w-56 flex flex-col gap-5 mt-10 md:mt-0'>
          <h3 className='text-black text-2xl font-bold font-inter'>About</h3>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            FAQs
          </a>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            Support
          </a>
          <a
            href='#'
            className="text-black text-2xl font-normal font-['Inter'] hover:underline"
          >
            Subscribe
          </a>
          <a
            href='#'
            className='text-black text-2xl font-normal font-[Inter] hover:underline'
          >
            Terms of services
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-black text-white text-center py-4 text-[20px] font-['Inter']">
        Copyright @ 2025, Fwan. All rights reserved
      </div>
    </footer>
  );
}
