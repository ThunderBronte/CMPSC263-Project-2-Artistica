import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

//Connect to firebase to use in application 


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


