import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXrqIrp4HG_u-74JksJGzXYB6vTks8CKY",
    authDomain: "purrfectpals-5f34e.firebaseapp.com",
    databaseURL: "https://purrfectpals-5f34e-default-rtdb.firebaseio.com",
    projectId: "purrfectpals-5f34e",
    storageBucket: "purrfectpals-5f34e.firebasestorage.app",
    messagingSenderId: "570003181835",
    appId: "1:570003181835:web:089a4797516167ea90120e",
    measurementId: "G-C5545Y96GR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);


export { app, auth, database }



/*


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