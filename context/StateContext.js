import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/backend/Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";


//Update the user infomration that can be used throughout the website. Remembers the user. 

const Context = createContext();

export const StateContext = ({ children }) => {

  // Variables to Carry Across Multiple Pages
  const [user, setUser] = useState(undefined);


  const router = useRouter()
  const { asPath } = useRouter()

  // AUTHENTICATION REMEMBER ME USEEFFECT
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (newUser) => {
      if(newUser){
        console.log('Token or user state changed:', newUser)
        newUser.getIdToken().then((token) => {
          console.log('New ID token:', token)
        })
        setUser(newUser)
      } else {
        setUser(null) //there is no user signed in
      }
    });
    return () => unsubscribe();
  }, []);




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
