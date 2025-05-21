import React from "react";
import Heros from "../../../assets/img/Heros.png";

const HeroSection = () => {
  return (
    <div className=' h-screen max-lg:h-[298px] z-50  bg-cover bg-center flex items-center px-6 md:px-24'>
      <img
        src={Heros}
        alt='Hero Image'

        className='absolute inset-0 lg:object-fill bg-center lg:bg-cover w-full max-lg:max-h-[298px] h-full'
      />
      {/* Overlay */}
      <div className=' relative 2xl:ml-[87px] lg:ml-[-17px] z-40 text-white max-w-3xl'>
        <h1 className='text-[35px] md:text-[64px] poppins-medium  leading-[130%] mb-[7px] text-[#FFFFFF]'>
          The Market Place For Farmers And Buyers
        </h1>
        <p className='text-lg md:text-[24px] leading-normal mb-[21px] text-[#FFF] font-inter lg:text-[24px] text-[17px]  '>
          Connecting farmers and families directly, supporting
          {/* <br className='hidden md:block' /> */}
          local farmers and enjoying healthier food.
        </p>

        <div className='flex flex-wrap gap-[40px] text-[20px]'>
          <button className='bg-[#3D8236] text-[#FFFFFF] w-[240px] gap-[10px] h-[55px] p-[10px] rounded-[20px] hover:bg-green-700 transition'>
            Join as a Farmer
          </button>
          <button className=' border border-[#FFFFFF] text-white w-[240px] gap-[10px] h-[55px] p-[10px] rounded-[20px] hover:text-[#3D8236]  hover:border-[#3D8236] transition'>
            Join as a Buyer
          </button>
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50'></div>
    </div>
  );
};

export default HeroSection;
