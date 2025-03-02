import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXrqIrp4HG_u-74JksJGzXYB6vTks8CKY",
  authDomain: "purrfectpals-5f34e.firebaseapp.com",
  projectId: "purrfectpals-5f34e",
  storageBucket: "purrfectpals-5f34e.firebasestorage.app",
  messagingSenderId: "570003181835",
  appId: "1:570003181835:web:f8e4618b847ab6f490120e",
  measurementId: "G-F5M2S5MEYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth }



/*
// New users, create account
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = UserInformation.UserInformation;
    })
    .catch((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
    });


// Returning Users
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


// Do something when the auth changes 
// I could change the display of the cat cart
onAuthStateChanged(auth, (user) => {
if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
} else {
    // User is signed out
    // ...
}
});


// //Do i need??
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

*/