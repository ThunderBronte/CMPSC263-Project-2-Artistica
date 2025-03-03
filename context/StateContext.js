import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/backend/Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";


const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState("Hello");


  const router = useRouter()
  const { asPath } = useRouter()

  // AUTHENTICATION REMEMBER ME USEEFFECT
  // useEffect(() => {
  //   const unsubscribe = onIdTokenChanged(auth, (user) => {
  //     if(user){
  //       console.log('Token or user state changed:', user)
  //       user.getIdToken().then((token) => {
  //         console.log('New ID token:', token)
  //       })
  //       setUser(user)
  //     } else {
  //       setUser(null) //there is no user signed in
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  
  // user === null




return(
    <Context.Provider
    value={{
        user,
        setUser
    }}
    >
      {children}
    </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);

/*

export function useStateContext() {
  return useContext(Context)
}

export function StateContext({ children }) {
  const [user, setUser] = useState("Hello")
  const [loading, setLoading] = useState(true)

  function login(email, password) {
    return signInWithEmailAndPassword(getAuth(), email, password)
  }

  function signOut() {
    return signOut(getAuth());
  }

  function signUp(email, password) {
    console.log(createUserWithEmailAndPassword(getAuth(), email, password));
  }

  function getUser() {
    return user;
  }

  // function isAdmin() {
  //   return auth.user.getIdTokenResult()
  //   .then((idTokenResult) => {
  //     if (!!idTokenResult.claims.admin) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  // }

  // function isEditor() {

  // }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((newUser) => {
      setUser(newUser);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  const value = {
    user,
    setUser,
    // getUser,
    // login,
    // signOut,
    // signUp,
  }

  return (
    <Context.Provider value={value}>
      { !loading && children }
    </Context.Provider>
  )

} */