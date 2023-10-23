// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-c610d.firebaseapp.com",
  projectId: "mern-estate-c610d",
  storageBucket: "mern-estate-c610d.appspot.com",
  messagingSenderId: "491875226257",
  appId: "1:491875226257:web:04f584b3bd9a65f6e8a530"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);