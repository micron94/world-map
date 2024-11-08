// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "world-map-6a379.firebaseapp.com",
  projectId: "world-map-6a379",
  storageBucket: "world-map-6a379.firebasestorage.app",
  messagingSenderId: "28348946119",
  appId: "1:28348946119:web:fce4387e8218c86ab110e2",
  measurementId: "G-XLQJ8WYBGL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

