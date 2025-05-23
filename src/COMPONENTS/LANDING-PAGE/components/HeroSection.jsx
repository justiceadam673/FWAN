import React from "react";
import Heros from "../../../assets/img/Heros.png";

const HeroSection = () => {
  return (
    <div className='relative h-screen max-lg:h-[400px] bg-cover bg-center flex items-center px-6 md:px-24 overflow-hidden'>
      {/* Background Image */}
      <img
<<<<<<< HEAD
        src={Heros}
        alt='Hero Image'

        className='absolute inset-0 lg:object-fill bg-center lg:bg-cover w-full max-lg:max-h-[298px] h-full'
=======
        src={HeroImg}
        alt='Hero'
        className='absolute inset-0 w-full h-full object-cover max-lg:object-top z-10'
>>>>>>> 7443421148441635a979276dc0c8f7d1e048a06b
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50 z-20'></div>

      {/* Content */}
      <div className='relative max-md:mt-[28px] max-lg:mt-[40px] z-30 text-white max-w-3xl'>
        <h1 className='text-[24px] md:text-[32px] lg:text-[64px] poppins-medium leading-[130%] mb-2'>
          The Market Place For Farmers And Buyers
        </h1>
        <p className='text-[12px] md:text-[15px] lg:text-[24px] font-inter mb-5'>
          Connecting farmers and families directly, supporting local farmers and
          enjoying healthier food.
        </p>
<<<<<<< HEAD

        <div className='flex flex-wrap gap-[40px] text-[20px]'>
          <button className='bg-[#3D8236] text-[#FFFFFF] w-[240px] gap-[10px] h-[55px] p-[10px] rounded-[20px] hover:bg-green-700 transition'>
=======
        <div className='flex max-md:flex-col flex-wrap gap-[8px] lg:gap-[40px] text-[12px] md:text-[14px] lg:text-[20px]'>
          <button className='bg-[#3D8236] text-white  w-[135.273px] lg:w-[240px] p-[5.636px] h-[31px] md:h-[45px] lg:h-[55px] rounded-[11.273px] lg:rounded-[20px] hover:bg-green-700 transition'>
>>>>>>> 7443421148441635a979276dc0c8f7d1e048a06b
            Join as a Farmer
          </button>
          <button className='border border-white text-white  w-[135.273px] lg:w-[240px] p-[5.636px] h-[31px]  md:h-[45px] lg:h-[55px] rounded-[11.273px] lg:rounded-[20px] hover:text-[#3D8236] hover:border-[#3D8236] transition'>
            Join as a Buyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
