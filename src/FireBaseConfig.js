// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import Auth
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyA2GK4JneB1KQPrhFRiaU8QZ9h9gnOaado",
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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA2GK4JneB1KQPrhFRiaU8QZ9h9gnOaado",
//   authDomain: "fwan-98510.firebaseapp.com",
//   projectId: "fwan-98510",
//   storageBucket: "fwan-98510.firebasestorage.app",
//   messagingSenderId: "789913628663",
//   appId: "1:789913628663:web:63fd7cda966680fe0448f2",
//   measurementId: "G-TNJRXCK735",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
