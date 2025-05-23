import React from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

const FarmerSignUp = () => {
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
            Create an account as a Farmer
          </h1>
          <p className='text-[19.353px] mb-[23px] leading-[29.03px] font-normal  '>
            Enter your details below
          </p>
          <form className='flex flex-col gap-[17px]' action=''>
            <AuthForm placeholder={"Name"} type={"text"} uniqueName={"name"} />
            <AuthForm
              placeholder={"Email"}
              type={"email"}
              uniqueName={"email"}
            />
            <AuthForm
              placeholder={"Phone number"}
              type={"number"}
              uniqueName={"Phone number"}
            />
            <AuthForm
              placeholder={"Password"}
              type={"Password"}
              uniqueName={"password"}
            />
            <AuthForm
              placeholder={"Confirm Password"}
              type={"Confirm Password"}
              uniqueName={"Password"}
            />
          </form>
          <div className='my-[23px]'>
            <AuthButton buttonText={"Create Account"} />
          </div>
          <div className=' max-w-[485px] flex justify-center'>
            <p>
              Already have an account?{" "}
              <NavLink
                to={"/farmersignin"}
                className={`text-black/70 underline underline-offset-[10px]`}
              >
                Log in
              </NavLink>{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerSignUp;
