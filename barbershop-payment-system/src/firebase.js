// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGRSnrD_xkU1V7wIuaoA_WsSOhAvwzICk",
  authDomain: "bsp-project-e1b90.firebaseapp.com",
  projectId: "bsp-project-e1b90",
  storageBucket: "bsp-project-e1b90.appspot.com",
  messagingSenderId: "600531881070",
  appId: "1:600531881070:web:b4da5d05cd9308f03e2a7f",
  measurementId: "G-X5SN3D1RP2"
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, storage, db, logInWithEmailAndPassword, logout }