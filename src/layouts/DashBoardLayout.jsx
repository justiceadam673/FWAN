import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import { auth } from "../FireBaseConfig"; // Adjust path as needed
import { toast } from "react-toastify";

const DashBoardLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/role");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Error logging out. Try again.");
    }
  };

  return (
    <main className='h-screen flex flex-col'>
      {/* HEADER */}
      <header className='md:flex hidden justify-between bg-[#F4FFEA] items-center border-b pl-[34px] py-[25px] pr-[19.8px]'>
        <div className='flex items-center gap-[20px]'>
          <img
            src='https://randomuser.me/api/portraits/women/65.jpg'
            className='w-[90px] aspect-[1/1] rounded-full object-cover'
            alt='User Avatar'
          />
          <div className='font-[Kodchasan] font-medium leading-normal'>
            <h1 className='flex items-center text-[#1E1E1E] text-[28px] gap-2'>
              Hello Debbie <Icon icon='emojione:waving-hand' />
            </h1>
            <p className='text-[20px] text-[#A19797]'>Good morning</p>
          </div>
        </div>

        <div className='flex items-center gap-[20px]'>
          <div className='p-[16px] bg-white text-black flex items-center rounded-[12px] shadow-[4px_4px_2.5px_rgba(0,0,0,0.25)] justify-center'>
            <Icon icon='line-md:bell-loop' width='24' height='24' />
          </div>
          <div className='relative w-full'>
            <button
              onClick={handleLogout}
              className='flex gap-[5px] border rounded-full text-black/70 hover:text-[#3D8236] transition duration-[.5s] px-[10px] py-[5px] justify-center items-center'
            >
              <span>Log Out</span>
              <Icon icon='ic:outline-logout' width='24' height='24' />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className='flex-1 overflow-y-auto bg-[#F3FAF6]'>
        <Outlet />
      </section>
    </main>
  );
};

export default DashBoardLayout;
