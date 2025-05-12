
import React from 'react';







export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block">
          <img
            src="./src/assets/signup-img/herosec2 2 (3).png"
            alt="Vegetables"
            className="h-full w-full object-cover "
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full p-6 md:p-10">
          <div className="flex items-center mb-6">
            <img src="./src/assets/signup-img/Vector.png" alt="FWAN Logo" className=" mr-2 w-[124px] h-[58px]"  />
            <h1 className="text-xl font-bold bg-[#3D8236]"></h1>
          </div>

          {/* <h2 className="text-2xl font-bold text-black-[#000] px-[26px] py-[125] ">Create Account</h2> */}
          <h2 className="text-[28px] font-bold text-black font-[Inter] leading-none h-[58px]">Create Account</h2>
          <p className="text-sm text-gray-600 mb-[20px] px-[96] py-[97]">Fill your information below to register</p>

          <form className="space-y-4">
            Full Name
            <input
              type="text" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="John Doe"

            />
             Phone Number
            <input
              type="tel"
              placeholder="080111222333"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
             Email
            <input
              type="email"
              placeholder="aghbekol@gmai.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
             Password
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
              Sign Up
            </button>

            <div className="text-center text-sm text-gray-500">or sign up with</div>

            <div className="flex justify-center space-x-4">
              <img src="./src/assets/signup-img/jam_apple-circle.png" alt="Google" className="h-5 cursor-pointer" />
              <img src="/src/assets/flat-color-icons_google.png" alt="Facebook" className="./src/assets/signup-img/flat-color-icons_google.png" />
              <img src="./src/assets/signup-img/Group (3).png" alt="Twitter" className="h-5 cursor-pointer" />
            </div>

            <p className="text-sm text-center text-[#000000] mt-4">
              Already have an account?{' '}
              <a href="/signin" className="text-[#095C32] font-medium hover:underline">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
