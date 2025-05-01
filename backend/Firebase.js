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
  apiKey: "AIzaSyCU0dbFwWp-iZ9N_b6xpG2UmltOUincC44",
  authDomain: "artistica-b2267.firebaseapp.com",
  projectId: "artistica-b2267",
  storageBucket: "artistica-b2267.firebasestorage.app",
  messagingSenderId: "780749368566",
  appId: "1:780749368566:web:cfa9358983eddbf06bd0d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);


export { app, auth, database }


