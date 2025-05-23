import React from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

const FarmerSignIn = () => {
  return (
    <div className='flex py-[31px] flex-col w-[1244px] justify-center m-auto '>
      <section className='mb-[31px]'>
        <NavLink to={"/"}>
          <Icon icon={"ic:round-arrow-back"} width={56} height={56} />
        </NavLink>
      </section>
      <section className='flex gap-[43px]'>
        <div>
          <img src={Img} className='w-full h-full ' />
        </div>
        <div>
          <h1 className='text-[43.545px] leading-[47px] mb-[29px] text-black font-medium  ml=[13px]'>
            Log In as a Farmer
          </h1>
          <p className='text-[19.353px] mb-[23px] leading-[29.03px] font-normal  '>
            Enter your details below
          </p>
          <form className='flex flex-col gap-[17px]' action=''>
            <AuthForm
              placeholder={"Email"}
              type={"email"}
              uniqueName={"email"}
            />

            <AuthForm
              placeholder={"Password"}
              type={"Password"}
              uniqueName={"password"}
            />
          </form>
          <div className=' max-w-[485px] flex my-[28px] justify-end'>
            <NavLink className='text-[#3D8236] text-[20px] hover:text-[#2c7125] leading-[29.03px] font-normal '>
              Forget Password?
            </NavLink>
          </div>
          <div className='my-[23px]'>
            <AuthButton buttonText={"Log In"} />
          </div>
          <div className=' max-w-[485px] flex justify-center'>
            <p>
              Don’t have account?{" "}
              <NavLink
                to={"/farmersignup"}
                className={`text-black/70 underline underline-offset-[10px]`}
              >
                Sign Up
              </NavLink>{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerSignIn;
