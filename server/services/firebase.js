// const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase-admin/auth");

var admin = require("firebase-admin");
var serviceAccount = require("../bsp-project-e1b90-9f45af3d1217.json");


const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `bsp-project-e1b90.appspot.com`
});


const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket('bsp-project-e1b90.appspot.com');
const collectionRef = admin.firestore().collection('hairstylePrices');




module.exports = { /* auth, */ bucket, db, collectionRef }