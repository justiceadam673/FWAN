// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import Auth
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fwan-98510.firebaseapp.com",
  projectId: "fwan-98510",
  storageBucket: "fwan-98510.firebasestorage.app",
  messagingSenderId: "789913628663",
  appId: "1:789913628663:web:63fd7cda966680fe0448f2",
  measurementId: "G-TNJRXCK735",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Export Auth for use in your app
export const db = getFirestore(app); // ✅
getAnalytics(app);
