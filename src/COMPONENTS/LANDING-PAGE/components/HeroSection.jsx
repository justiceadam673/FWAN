import React from "react";

const HeroSection = () => {
  return (
    <div
      className='h-screen z-50 bg-cover bg-center flex items-center px-6 md:px-24'
      style={{ backgroundImage: "url('./src/assets/img/Heroimage.png')" }}
    >
      <div className=' relative z-40 text-white max-w-3xl'>
        <h1 className='text-[35px] md:text-6xl font-bold leading-tight mb-4 text-[#FFFFFF]'>
          The Market Place For Farmers And Buyers
        </h1>
        <p className='text-lg md:text-xl mb-8 text-[#FFF] font-inter lg:text-[24px] text-[17px]  '>
          Connecting farmers and families directly, supporting
          {/* <br className='hidden md:block' /> */}
          local farmers and enjoying healthier food.
        </p>
        <div className='flex flex-wrap gap-4'>
          <button className='bg-[#3D8236] text-[#FFFFFF] px-6 py-3 rounded-md hover:bg-green-700 transition'>
            Join as a Farmer →
          </button>
          <button className='bg-[#FFFFFF] text-[#3D8236] px-6 py-3 rounded-md hover:bg-gray-100 transition'>
            Join as a Buyer
          </button>
        </div>
      </div>
      <div className='absolute inset-0 bg-black/55'></div>
    </div>
  );
};

export default HeroSection;
