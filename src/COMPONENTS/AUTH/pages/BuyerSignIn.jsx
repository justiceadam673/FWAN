import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../FireBaseConfig";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

const BuyerSignIn = () => {
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
      const user = userCredential.user;

      await user.reload();

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      // Check if buyer already exists in Firestore
      const userRef = doc(db, "buyers", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Save data if not already in Firestore
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
        });
      }

      toast.success("Logged in successfully!");
      navigate("/buyersdashboard");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className='flex px-[20px] py-[31px] flex-col lg:w-[1244px] justify-center'>
      <section className='mb-[10px] lg:mb-[31px]'>
        <NavLink to={"/"}>
          <Icon
            icon='ic:round-arrow-back'
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
          <h1 className='lg:text-[43.545px] text-[28px] leading-[47px] mb-[29px] text-black font-medium ml-[13px]'>
            Log In as a Buyer
          </h1>
          <p className='lg:text-[19.353px] text-[14px] mb-[23px] leading-[29.03px] font-normal'>
            Enter your details below
          </p>
          <form className='flex flex-col gap-[17px]' onSubmit={handleLogin}>
            <AuthForm
              placeholder='Email'
              type='email'
              uniqueName='email'
              onChange={handleChange}
            />
            <AuthForm
              placeholder='Password'
              type='password'
              uniqueName='password'
              onChange={handleChange}
            />
            <div className='max-w-[485px] flex justify-end my-[28px]'>
              <NavLink className='text-[#3D8236] text-[15px] lg:text-[20px] hover:text-[#2c7125]'>
                Forget Password?
              </NavLink>
            </div>
            <div className='my-[23px]'>
              <AuthButton buttonText='Log In' />
            </div>
          </form>
          <div className='lg:max-w-[485px] max-lg:text-[12px] flex justify-center'>
            <p>
              Don’t have an account?{" "}
              <NavLink
                to={"/buyersignup"}
                className='text-black/70 underline underline-offset-[10px]'
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

export default BuyerSignIn;
//             type='password'
