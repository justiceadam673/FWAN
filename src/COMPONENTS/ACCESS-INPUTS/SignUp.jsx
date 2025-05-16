import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../../assets/img/fwan.png";
// import { useLocation } from "react-router-dom";
export default function SignUp() {
  // const navigate = useNavigate(); // Initialize navigat
  return (
    <div className='min-h-screen bg-[#EAEAEA] font-[Inter] flex items-center justify-center  p-4'>
      <div className='bg-white rounded-[20px] shadow-xl w-full max-w-4xl flex overflow-hidden'>
        {/* Left Image Section */}
        <div className='hidden flex-3/7 md:block'>
          <img
            src='./src/assets/signup-img/herosec2 2 (3).png'
            alt='Vegetables'
            className='h-full w-full object-cover '
          />
        </div>

        {/* Right Form Section */}
        <div className='w-full flex-4/7 p-6 md:p-10'>
          <div className='flex items-center mb-6'>
            <img
              src={Logo}
              alt='FWAN Logo'
              className=' mr-2 w-[124px] h-[40px]'
            />
            <h1 className='text-xl font-bold bg-[#3D8236]'></h1>
          </div>

          {/* <h2 className="text-2xl font-bold text-black-[#000] px-[26px] py-[125] ">Create Account</h2> */}
          <h2 className='text-[38px] font-bold text-black font-[Inter] leading-none h-[58px]'>
            Create Account
          </h2>
          <p className='text-[18px] text-black mb-[20px] px-[96] py-[97]'>
            Fill your information below to register
          </p>

          <form action={"/dashboard"} className='space-y-4 text-[18px]  '>
            Full Name
            <input
              type='text'
              className='w-full  px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='John Doe'
            />
            Phone Number
            <input
              type='tel'
              placeholder='080111222333'
              className='w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            Email
            <input
              type='email'
              placeholder='aghbekol@gmai.com'
              className='w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            Password
            <input
              type='password'
              placeholder='Password'
              className='w-full px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <div className='flex items-center'>
              <input type='checkbox' id='remember' className='mr-2 ' />
              <label htmlFor='remember' className='text-sm text-[#1D8338]'>
                Remember Password
              </label>
            </div>
            <button
              type='submit'
              className='w-full h-[56px] text-[20px] hover:cursor-pointer bg-green-700 text-white py-2 rounded-[16px] hover:bg-green-800 transition'
            >
              <NavLink to='/dashboard' className='text-white'>
                Sign Up
              </NavLink>
            </button>
            <div className='text-center flex justify-center items-center space-x-[10px] text-sm text-gray-500'>
              <hr className='w-[70px]' />
              <span>or sign up with</span>
              <hr className='w-[70px]' />
            </div>
            <div className='flex justify-center space-x-[34px]'>
              <Icon
                icon={"logos:apple"}
                width={28}
                height={28}
                className='hover:scale-110 transition-all duration-300 hover:cursor-pointer'
              />
              <Icon
                icon={"flat-color-icons:google"}
                width={28}
                height={28}
                className='hover:scale-110 transition-all duration-300 hover:cursor-pointer'
              />
              <Icon
                icon={"jam:facebook"}
                width={28}
                height={28}
                color='#4317EE'
                className='hover:scale-110 transition-all duration-300 hover:cursor-pointer'
              />
            </div>
            <p className='text-md text-center text-[#000000] mt-4'>
              Already have an account?{" "}
              <NavLink
                to='/signin'
                className='text-[#095C32] font-medium  hover:cursor-pointer hover:underline '
              >
                Sign In
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
