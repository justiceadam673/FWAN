import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../../../FireBaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BuyerSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Check if the user already exists in Firestore
      const usersRef = doc(firestore, "users", email);
      const userSnap = await getDoc(usersRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.role !== "buyer") {
          toast.error(
            "This email is already registered with a different role."
          );
          return;
        }
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Save user info in Firestore if not already present
      if (!userSnap.exists()) {
        await setDoc(doc(firestore, "users", email), {
          userId: user.uid,
          email,
          role: "buyer",
        });
      }

      toast.success(
        "Sign up successful. Please verify your email before logging in."
      );
      navigate("/buyersignin");

      // Optional: sign out the user after signup to enforce email verification
      await signOut(auth);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-green-100'>
      <form
        onSubmit={handleSignUp}
        className='bg-white p-8 rounded shadow-md w-full max-w-md'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Buyer Sign Up</h2>
        <input
          type='email'
          placeholder='Email'
          className='w-full mb-4 p-2 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full mb-4 p-2 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default BuyerSignUp;
