import React from "react";
import { NavLink } from "react-router-dom";
import Img from "../../../assets/img/heroimage.png";

const AuthRole = () => {
  return (
    <main>
      <div className='flex relative py-[31px] flex-col w-full h-screen items-center justify-center m-auto '>
        <section className='bg-white flex items-center gap-[45px] z-50 p-[28px] rounded-[20px] shadow-lg w-[1244px]'>
          <section className='flex-2'>
            <h1 className='text-[43.545px] leading-[47px] mb-[29px] text-black font-medium  ml=[13px]'>
              Choose your role
            </h1>
            <p className='text-[19.353px] mb-[23px] leading-[29.03px] font-normal  '>
              Select the role you want to sign up as
            </p>
            <div className='flex gap-[43px]'>
              <NavLink
                to={"/farmersignup"}
                className='bg-[#F0F0F0] hover:bg-[#3D8236] hover:text-white transition duration-[.5s] hover:scale-105 p-4 rounded-lg'
              >
                <h2 className='text-[24px] font-semibold'>Farmer</h2>
                <p className='text-[16px]'>
                  Sign up as a farmer to sell your products.
                </p>
              </NavLink>
              <NavLink
                to={"/buyersignup"}
                className='bg-[#F0F0F0] hover:bg-[#3D8236] hover:text-white transition duration-[.5s] hover:scale-105 p-4 rounded-lg'
              >
                <h2 className='text-[24px] font-semibold'>Buyer</h2>
                <p className='text-[16px]'>
                  Sign up as a buyer to purchase products.
                </p>
              </NavLink>
            </div>
            <div className='flex text-gray-500 gap-[43px] mt-4'>
              <NavLink
                disabled
                className='bg-[#F0F0F0] cursor-not-allowed  p-4 rounded-lg'
              >
                <h2 className='text-[24px] font-semibold'>Admin</h2>
                <p className='text-[16px]'>
                  Sign up as an admin to manage the platform.
                </p>
              </NavLink>
              <NavLink
                disabled
                className='bg-[#F0F0F0] cursor-not-allowed  p-4 rounded-lg'
              >
                <h2 className='text-[24px] font-semibold '>Delivery Person</h2>
                <p className='text-[16px] '>
                  Sign up as a delivery person to deliver products.
                </p>
              </NavLink>
            </div>
          </section>
          <hr className='w-[1px] h-full bg-black/50' />
          <section className='text-[15px] flex-1'>
            <div className='flex  mt-4'>
              <p>
                Already have an account?{" "}
                <div className='flex gap-[43px]'>
                  <div className='flex flex-col gap-[10px]'>
                    <p className='italic font-semibold '>Farmer</p>
                    <NavLink
                      to='/farmersignin'
                      className='text-[#3D8236] border border-[#3D8236] rounded-lg px-[8px] py-[4px]  hover:bg-[#3D8236] hover:text-white transition duration-[.5s]'
                    >
                      Log in
                    </NavLink>
                  </div>
                  <div className='flex flex-col gap-[10px]'>
                    <p className='italic font-semibold '>Buyer</p>
                    <NavLink
                      className='text-[#3D8236] border border-[#3D8236] rounded-lg px-[8px] py-[4px]  hover:bg-[#3D8236] hover:text-white transition duration-[.5s]'
                      to='/buyersignin'
                    >
                      Log in
                    </NavLink>
                  </div>
                </div>
              </p>
            </div>

            <div className='flex  mt-4'>
              <p>
                Need help?{" "}
                <NavLink
                  to='/contactus'
                  className='text-[#3D8236] transition duration-[.5s] hover:underline'
                >
                  Contact Support
                </NavLink>
              </p>
            </div>
          </section>
        </section>
        <div className='absolute inset-0 bg-black'>
          <img src={Img} className='w-full h-full relative' />
          <div className='absolute inset-0 bg-black/70'></div>
        </div>
      </div>
    </main>
  );
};

export default AuthRole;
