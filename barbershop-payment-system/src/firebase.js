// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGRSnrD_xkU1V7wIuaoA_WsSOhAvwzICk",
  authDomain: "bsp-project-e1b90.firebaseapp.com",
  projectId: "bsp-project-e1b90",
  storageBucket: "bsp-project-e1b90.appspot.com",
  messagingSenderId: "600531881070",
  appId: "1:600531881070:web:b4da5d05cd9308f03e2a7f",
  measurementId: "G-X5SN3D1RP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);


export {auth, storage}