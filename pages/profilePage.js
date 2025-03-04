import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
//import { signOut } from '@/backend/Auth';



export default function Home() {
  
  const { user, setUser } = useStateContext()

  const router = useRouter()
  
  const [name, setName] = useState(null);

  useEffect(() => {
    console.log(user);
    const listen = onAuthStateChanged(getAuth(), (currUser) => {
      if(currUser){
        setUser(currUser);
      } else {
        setUser(null);
      }
    });

    return () => listen();
  }, [])
  

  // If the user is not logged in, ask them to log in.
  useEffect(() => {
    // wait for information to load 
    if(user === undefined){ console.log("Waiting for user info...");}
    else {
      if(!user){
        router.push('/login')
      } else {
        // Get name from email
        let userName = '';
        if(typeof user === 'object'){
          userName = user.email.split('@');
        } else if(typeof user === 'string') {
          userName = user.split('@');
        }
        
        setName(userName[0]);
      }
    }
  }, [user]);

  // sign user out
  function signOutUser(){
    let promie = signOut(getAuth())
    console.log("Promie: ", promie);
  }
  
  
  return (
    <>
    <NavigationBar />
        <ContentContainer>
          <Heading>Hello {name}!</Heading>
          <HeaderButton onClick={() => signOutUser()}>Sign Out</HeaderButton>
          <Subheading>Here is your information: </Subheading>
            <ProfileInfo>Current Username: {name}</ProfileInfo>
          <Subheading> Want to change your information? </Subheading>
            <ProfileInfo>
              New Username: <InputInfo></InputInfo> 
              <Button onClick={(e) => setUser(e.target.value)}>Change Username</Button>
            </ProfileInfo>
          <Subheading> Want to see your current Favorite Cats? </Subheading>
          <ProfileInfo><Button onClick={() => router.push('/catCart')}>Go to Cat Cart list!</Button></ProfileInfo>
        </ContentContainer>
      <Footer />
    </>
  )
};


const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  color: #25283D;
  
  margin-left: 300px;
  margin-right: 300px;
`;

const Line = styled.hr`
  border: 2px dashed #25283D;
`;

const Heading = styled.h1`
  font-size: 100px;
  text-align: center;
  padding-top: 75px;
  padding-bottom: 75px;
`;

const HeaderButton = styled.button`
  font-size: 25px;
  margin: 20px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  
  color: white;
  background-color: #077678; 
  border: 2px solid #077678;
  border-radius: 50px;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
  }
`;

const Subheading = styled.h2`
  font-size: 30px;
  padding: 20px;
`;

const ProfileInfo = styled.p`
  padding-left: 50px;
`;

const InputInfo = styled.input`
  background-color: #DFDFDF;
  border-radius: 8px;
  padding: 5px;
  margin-left: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin-left: 15px;

  color: white;
  background-color: #077678; 
  border: 2px solid #077678;
  border-radius: 50px;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
  }

`;

