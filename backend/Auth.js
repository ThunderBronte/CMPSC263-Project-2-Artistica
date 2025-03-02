import { sign } from "crypto";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
  

export const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// FIX!!!
export const doFetchSignInMethodsForEmail = () =>{
    return fetchSignInMethodsForEmail()
}


// 
export const signOut = () => {
    return auth.signOut();
}

// Change
export const isEmailInUse = (email) => {
    return "Need to change - true / flase"; 
}




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

/*
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
}); */