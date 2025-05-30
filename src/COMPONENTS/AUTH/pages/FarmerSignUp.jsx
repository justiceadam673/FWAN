import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signupimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../../FireBaseConfig";
import "react-toastify/dist/ReactToastify.css";

import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

// ✅ Firestore imports
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const FarmerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingUser = querySnapshot.docs[0].data();
        if (existingUser.role !== "farmer") {
          toast.error("This email is already registered as a Buyer.");
          return;
        }
      }
      // ✅ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User UID:", user.uid);
      const uid = user.uid;

      // ✅ Create user document in Firestore using uid
      await setDoc(doc(db, "users", uid), {
        uid: uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "farmer", // used to distinguish between farmer/buyer
        createdAt: new Date().toISOString(),
      });

      // ✅ Send verification email
      await sendEmailVerification(user);
      toast.info(
        "A verification email has been sent. Please check your inbox."
      );

      toast.success("Account created successfully! Please verify your email.");
      navigate("/farmersignin");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password too weak (min 6 characters).");
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className='flex px-[20px] py-[31px]  lg:w-[1244px]  flex-col  mx-auto justify-center'>
      <section className='mb-[10px] lg:mb-[31px]'>
        <NavLink to={"/role"}>
          <Icon
            icon={"ic:round-arrow-back"}
            className='lg:w-[46px] w-[28px] h-[28px] lg:h-[46px]'
          />
        </NavLink>
      </section>
      <section className='flex max-lg:items-center  w-full lg:gap-[43px]'>
        <div>
          <img
            src={Img}
            className='w-full h-full  hidden lg:flex'
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
            <AuthForm
              placeholder='Password'
              type='password'
              uniqueName='password'
              onChange={handleChange}
            />
            <AuthForm
              placeholder='Confirm Password'
              type='password'
              uniqueName='confirmPassword'
              onChange={handleChange}
            />
            <div className='my-[23px]'>
              <AuthButton buttonText='Create Account' />
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
