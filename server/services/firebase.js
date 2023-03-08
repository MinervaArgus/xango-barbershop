// const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase-admin/auth");

var admin = require("firebase-admin");

var serviceAccount = require("../bsp-project-e1b90-9f45af3d1217.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/* const firebaseConfig = {
    apiKey: "AIzaSyCGRSnrD_xkU1V7wIuaoA_WsSOhAvwzICk",
    authDomain: "bsp-project-e1b90.firebaseapp.com",
    projectId: "bsp-project-e1b90",
    storageBucket: "bsp-project-e1b90.appspot.com",
    messagingSenderId: "600531881070",
    appId: "1:600531881070:web:b4da5d05cd9308f03e2a7f",
    measurementId: "G-X5SN3D1RP2"
}; */

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
/* const storage = getStorage(admin);
const auth = getAuth(admin); */
// const db = getFirestore(admin);

module.exports = { /* auth, storage,  */db }