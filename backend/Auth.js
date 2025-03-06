import { sign } from "crypto";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";


// Works with firebase to sign up, log in, and see if the email exists in the database and returns the promises 


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

