import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

const DashBoardLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className='h-screen flex flex-col'>
      {/* HEADER - stays at the top */}
      <header className='md:flex hidden justify-between bg-[#F4FFEA] items-center border-b pl-[34px] py-[25px] pr-[19.8px]'>
        {/* Profile + Greeting */}
        <div className='flex items-center gap-[20px]'>
          <img
            src='https://randomuser.me/api/portraits/women/65.jpg'
            className='w-[90px] aspect-[1/1] rounded-full object-cover'
            alt='User Avatar'
          />
          <div className='font-[Kodchasan] font-medium leading-normal'>
            <h1 className='flex items-center text-[#1E1E1E] text-[28px] gap-2'>
              Hello Musa <Icon icon='emojione:waving-hand' />
            </h1>
            <p className='text-[20px] text-[#A19797]'>Good morning</p>
          </div>
        </div>

        {/* Search + Notification */}
        <div className='flex items-center gap-[20px]'>
          {/* Search input with icon */}
          <div className='relative w-full max-w-[660px]'>
            <Icon
              icon='ri:search-line'
              className='absolute top-1/2 -translate-y-1/2 left-[18px] text-black'
              width='24'
              height='24'
            />
            <input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full rounded-[28px] py-[10px] lg:py-[16px] pl-[48px] bg-white'
            />
          </div>

          {/* Notification bell */}
          <div className='p-[16px] bg-white text-black flex items-center rounded-[12px] shadow-[4px_4px_2.5px_rgba(0,0,0,0.25)] justify-center'>
            <Icon icon='line-md:bell-loop' width='24' height='24' />
          </div>
        </div>
      </header>

      {/* CONTENT - scrolls independently */}
      <section className='flex-1 overflow-y-auto bg-[#F3FAF6]'>
        <Outlet />
      </section>
    </main>
  );
};

export default DashBoardLayout;
