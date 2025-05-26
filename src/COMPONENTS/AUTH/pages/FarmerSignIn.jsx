// FarmerSignIn.jsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FireBaseConfig";
import { toast } from "react-toastify";

const FarmerSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = auth.currentUser;
      await user.reload();

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      toast.success("Logged in successfully!");
      navigate("/farmersoverview");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Login failed. Try again.");
      }
    }
  };

  return (
    <div className='flex px-[20px] py-[31px] flex-col lg:w-[1244px] justify-center '>
      <section className=' mb-[10px] lg:mb-[31px]'>
        <NavLink to={"/"}>
          <Icon
            icon={"ic:round-arrow-back"}
            className='lg:w-[46px] w-[28px] h-[28px] lg:h-[46px]'
          />
        </NavLink>
      </section>
      <section className='flex lg:gap-[43px]'>
        <div>
          <img
            src={Img}
            className='w-full h-full hidden lg:flex'
            alt='signin'
          />
        </div>
        <div>
          <h1 className='g:text-[43.545px] text-[28px] leading-[47px] mb-[29px] text-black font-medium  ml-[13px]'>
            Log In as a Farmer
          </h1>
          <p className='lg:text-[19.353px] text-[14px] mb-[23px] leading-[29.03px] font-normal'>
            Enter your details below
          </p>
          <form className='flex flex-col gap-[17px]' onSubmit={handleLogin}>
            <AuthForm
              placeholder={"Email"}
              type={"email"}
              uniqueName={"email"}
              onChange={handleChange}
            />
            <AuthForm
              placeholder={"Password"}
              type={"password"}
              uniqueName={"password"}
              onChange={handleChange}
            />
            <div className=' max-w-[485px] flex my-[28px] justify-end'>
              <NavLink className='text-[#3D8236] text-[15px] lg:text-[20px] hover:text-[#2c7125] leading-[29.03px] font-normal'>
                Forget Password?
              </NavLink>
            </div>
            <div className='my-[23px]'>
              <AuthButton buttonText={"Log In"} />
            </div>
          </form>
          <div className=' lg:max-w-[485px] max-lg:text-[12px] flex justify-center'>
            <p>
              Don’t have account?{" "}
              <NavLink
                to={"/farmersignup"}
                className={`text-black/70 underline underline-offset-[10px]`}
              >
                Sign Up
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerSignIn;
