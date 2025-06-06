import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../FireBaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

const FarmerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Check if user document already exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const existingRole = userSnap.data().role;
        toast.error(`This email is already registered as a ${existingRole}.`);
        await signOut(auth);
        setLoading(false);
        return;
      }

      // Create farmer user document in Firestore
      await setDoc(userRef, {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "farmer",
        createdAt: new Date(),
      });

      await sendEmailVerification(user);
      toast.success("Verification email sent! Please check your inbox.");

      await signOut(auth); // Force logout until verified
      setLoading(false);
      navigate("/farmersignin");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error("Something went wrong. Try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className='flex px-[20px] py-[31px] lg:w-[1244px] flex-col mx-auto justify-center'>
      <section className='mb-[10px] lg:mb-[31px]'>
        <NavLink to={"/role"}>
          <Icon
            icon={"ic:round-arrow-back"}
            className='lg:w-[46px] w-[28px] h-[28px] lg:h-[46px]'
          />
        </NavLink>
      </section>
      <section className='flex max-lg:items-center w-full lg:gap-[43px]'>
        <div>
          <img
            src={Img}
            className='w-full h-full hidden lg:flex'
            alt='signup'
          />
        </div>
        <div>
          <h1 className='lg:text-[43.545px] text-[28px] leading-[47px] mb-[29px] text-black font-medium ml-[13px]'>
            Create an account as a Farmer
          </h1>
          <p className='lg:text-[19.353px] text-[14px] mb-[23px] leading-[29.03px] font-normal'>
            Enter your details below
          </p>
          <form className='flex flex-col gap-[17px]' onSubmit={handleSignup}>
            <AuthForm
              placeholder='Name'
              type='text'
              uniqueName='name'
              onChange={handleChange}
            />
            <AuthForm
              placeholder='Email'
              type='email'
              uniqueName='email'
              onChange={handleChange}
            />
            <AuthForm
              placeholder='Phone number'
              type='number'
              uniqueName='phone'
              onChange={handleChange}
            />

            {/* Password field with toggle */}
            <div className='relative'>
              <AuthForm
                placeholder='Password'
                type={showPassword ? "text" : "password"}
                uniqueName='password'
                onChange={handleChange}
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute hover:cursor-pointer right-4 md:right-30 top-1/2 transform -translate-y-1/2'
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Confirm Password field with toggle */}
            <div className='relative'>
              <AuthForm
                placeholder='Confirm Password'
                type={showConfirmPassword ? "text" : "password"}
                uniqueName='confirmPassword'
                onChange={handleChange}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute hover:cursor-pointer right-4 md:right-30 top-1/2 transform -translate-y-1/2'
              >
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className='my-[23px]'>
              <button
                type='submit'
                disabled={loading}
                className={`max-w-[485px] w-full py-3 hover:cursor-pointer rounded-md text-white font-medium transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3D8236] hover:bg-[#2f6a2a]"
                }`}
              >
                {loading ? (
                  <div className='flex items-center justify-center gap-2'>
                    <svg
                      className='animate-spin h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                      ></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
          <div className='lg:max-w-[485px] max-lg:text-[12px] flex justify-center'>
            <p>
              Already have an account?{" "}
              <NavLink
                to={"/farmersignin"}
                className='text-black/70 underline underline-offset-[10px]'
              >
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerSignUp;
