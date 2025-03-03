import Content from "@/components/LandingPage/Content"
import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";



export default function Home() {
  
  const { user, setUser } = useStateContext()

  //const [user, setUser] = useState(null);

  const router = useRouter()
  
  const [name, setName] = useState(null);

  useEffect(() => {
    console.log(user);
    // const listen = onAuthStateChanged(getAuth(), (currUser) => {
    //   if(currUser){
    //     setUser(currUser);
    //   } else {
    //     setUser(null);
    //   }
    // });

    // return () => listen();
  }, [])
  
    
  // If the user is not logged in, ask them to log in.
  // useEffect(() => {
  //   if(!user){
  //     router.push('/login')
  //   } else {
      
  //   }
  // }, [user]);
  
  // const catSearch = () =>{
  //   router.push('/catCart');
  // }
  


  // Might want to change it so the useEffect changes what is displayed on the screen
  return (
    <>
    <NavigationBar />
        <ContentContainer>
          {user ? <p>Logged In {user.email}</p> : <p>NOT logged in</p>}
          <Heading>Hello {name}!</Heading>
          <Line></Line>
          <Subheading>Here is your information: </Subheading>
            <ProfileInfo>Current Username: {name}</ProfileInfo>
          <Subheading> Want to change your information? </Subheading>
            <ProfileInfo>
              New Username: <InputInfo></InputInfo> 
              <Button onClick={(e) => setUser(e.target.value)}>Change Username</Button>
            </ProfileInfo>
          {/* TOO MUCH WORK!!!
           Maybe change it to:
           See your current cat cart! and a button to the cart 
          <Subheading> Cats you have adopted: </Subheading>
            <ProfileInfo>
              Cat names list
            </ProfileInfo> */}
          <Subheading> Want to see your current Cat Cart? </Subheading>
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
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin-left: 15px;

  color: #25283D;
  &:hover{ 
    background-color: #25283D; 
    color: #43DFBD;
  }
  border-color: #25283D;
  border-radius: 50px;
  border-style: solid;
  background-color: transparent;

`;

