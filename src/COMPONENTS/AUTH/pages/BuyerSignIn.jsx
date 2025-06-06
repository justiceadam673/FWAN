import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Img from "../../../assets/img/signinimg.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../FireBaseConfig";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";
import AuthButton from "../components/AuthButton";

const BuyerSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

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
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User record not found. Please sign up again.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      const data = userSnap.data();
      if (data.role !== "buyer") {
        toast.error("This email is not registered as a buyer.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      toast.success("Logged in successfully!");
      navigate("/buyersoverview");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else {
        toast.error("Something went wrong. Try again.");
      }
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      toast.warn("Please enter your email first.");
      return;
    }

    setShowResetModal(true);
  };

  const confirmPasswordReset = async () => {
    setShowResetModal(false);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Password reset link sent! Check your inbox.");
    } catch (error) {
      console.error("Reset Error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Could not send reset link. Try again.");
      }
    }
  };

  return (
    <div className='flex px-[20px] py-[31px] flex-col lg:w-[1244px] place-self-center justify-center'>
      {/* Password Reset Modal */}
      {showResetModal && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-sm w-full'>
            <h2 className='text-lg font-semibold mb-3'>Reset Password?</h2>
            <p className='text-sm text-gray-700 mb-4'>
              A password reset link will be sent to:
              <br />
              <span className='font-medium text-black'>{formData.email}</span>
            </p>
            <div className='flex justify-end gap-3'>
              <button
                onClick={() => setShowResetModal(false)}
                className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm'
              >
                Cancel
              </button>
              <button
                onClick={confirmPasswordReset}
                className='px-4 py-2 rounded bg-[#3D8236] hover:bg-[#2f6a2a] text-white text-sm'
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}

      <section className='mb-[10px] lg:mb-[31px]'>
        <NavLink to={"/role"}>
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
                className='absolute hover:cursor-pointer right-4 top-1/2 transform -translate-y-1/2'
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className='max-w-[485px] flex justify-end '>
              <button
                type='button'
                onClick={handlePasswordReset}
                className='text-[#3D8236] hover:cursor-pointer text-[15px] lg:text-[20px] hover:text-[#2c7125] underline underline-offset-[4px]'
              >
                Forget Password?
              </button>
            </div>

            <div className='my-[23px]'>
              <button
                type='submit'
                disabled={loading}
                className={`w-full py-3 rounded-md hover:cursor-pointer text-white font-medium transition ${
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
                    Signing in...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
          <div className='lg:max-w-[485px] max-lg:text-[12px] flex justify-center'>
            <p>
              Don’t have an account?{" "}
              <NavLink
                to={"/buyersignup"}
                className='text-black/70 hover:cursor-pointer underline underline-offset-[10px]'
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
