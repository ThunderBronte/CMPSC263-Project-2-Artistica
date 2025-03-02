import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*

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
const db = getFirestore(app);


// Get a list of cities from the database
// (example)
/*
async function getCities(db){
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}
*/














// const analytics = getAnalytics(app);



// //Do i need??
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });