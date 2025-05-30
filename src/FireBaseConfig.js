// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import this

const firebaseConfig = {
  apiKey: "AIzaSyA2GK4JneB1KQPrhFRiaU8QZ9h9gnOaado",
  authDomain: "fwan-98510.firebaseapp.com",
  projectId: "fwan-98510",
  storageBucket: "fwan-98510.appspot.com", // ✅ small fix: add `.appspot.com` instead of `.firebasestorage.app`
  messagingSenderId: "789913628663",
  appId: "1:789913628663:web:63fd7cda966680fe0448f2",
  measurementId: "G-TNJRXCK735",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // optional: remove if not used
const storage = getStorage(app); // ✅ Initialize it

// ✅ Export what your app needs
export const auth = getAuth(app);
export const db = getFirestore(app);
export { storage, analytics }; // ✅ Export it
