import { sign } from "crypto";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";



export const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// If email exists
export const isEmailInDatabase = (email) => {
    return fetchSignInMethodsForEmail(auth, email)
}









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
}); */