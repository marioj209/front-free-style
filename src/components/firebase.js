// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkUEFF-j28a9grHh-8dhbh4G0gXR7HftA",
  authDomain: "e-commerce-style.firebaseapp.com",
  projectId: "e-commerce-style",
  storageBucket: "e-commerce-style.appspot.com",
  messagingSenderId: "1077776363011",
  appId: "1:1077776363011:web:a6f0c19ce19f20cb9e2836",
  measurementId: "G-2YJKEMF9KQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
