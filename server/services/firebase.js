// const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { getAuth, signInWithEmailAndPassword, signOut } = require("firebase-admin/auth");

const admin = require("firebase-admin");
const serviceAccount = require("../bsp-project-e1b90-9f45af3d1217.json");
// const auth = getAuth();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: `bsp-project-e1b90.appspot.com`
});


const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket('bsp-project-e1b90.appspot.com');
const collectionRef = admin.firestore().collection('hairstylePrices');

/* const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //signed in
                const user = userCredential.user;
            })
    } catch (error) {
        return error;
    }
} */


module.exports = { /* auth, */ admin, bucket, db, collectionRef }