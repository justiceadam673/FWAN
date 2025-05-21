import React from "react";
import Heros from "../../../assets/img/Heros.png";

const HeroSection = () => {
  return (
    <div className=' h-screen z-50 bg-cover bg-center flex items-center px-6 md:px-24'>
      <img
        src={Heros}
        alt='Hero Image'
        className='absolute inset-0 object-fill bg-center bg-cover w-full h-full   '
      />
      {/* Overlay */}
      <div className=' relative z-40 text-white max-w-3xl'>
        <h1 className='text-[35px] md:text-[64px]font-bold leading-tight mb-4 text-[#FFFFFF]'>
          The Market Place For Farmers And Buyers
        </h1>
        <p className='text-lg md:text-xl mb-8 text-[#FFF] font-inter lg:text-[24px] text-[17px]  '>
          Connecting farmers and families directly, supporting
          {/* <br className='hidden md:block' /> */}
          local farmers and enjoying healthier food.
        </p>
        <div className='flex flex-wrap gap-4'>
          <button className='bg-[#3D8236] text-[#FFFFFF] px-6 py-3 rounded-md hover:bg-green-700 transition p-[10px]'>
            Join as a Farmer →
          </button>
          <button className='bg-[#FFFFFF] text-[#3D8236] px-6 py-3 rounded-md hover:bg-gray-100 transition'>
            Join as a Buyer
          </button>
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50'></div>
    </div>
  );
};

export default HeroSection;
