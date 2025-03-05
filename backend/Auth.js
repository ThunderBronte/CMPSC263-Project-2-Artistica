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

