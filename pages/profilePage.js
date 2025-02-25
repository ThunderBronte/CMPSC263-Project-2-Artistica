import Content from "@/components/LandingPage/Content"
import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import Background from '@/components/Elements/Background'



export default function Home() {
  
  const { user, setUser } = useStateContext()

  //const { user } = useStateContext(StateContext);

  const router = useRouter()
  
  let name = "";
  
    
  // If the user is not logged in, ask them to sign up.
  // They have a choice to "Sign up" instead.
  /*
  useEffect(() => {
    if(!user){
      router.push('/login')
    }else{
      name = user;
    }
  }, user) */
  

  function changeUser(){
    setUser(Button.value);
  }

  const catSearch = () =>{
    router.push('/catCart');
  }
  


  // Might want to change it so the useEffect changes what is displayed on the screen
  return (
    <>
    <NavigationBar />
      <ProfilePage>
        <ContentContainer>
          <Heading>Hello {user}!</Heading>
          <hr></hr>
          <Subheading>Here is your information: </Subheading>
            <ProfileInfo>Current Username: {user}</ProfileInfo>
          <Subheading> Want to change your information? </Subheading>
            <ProfileInfo>
              New Username: <InputInfo></InputInfo> 
              <Button onClick={changeUser()}>Change Username</Button>
            </ProfileInfo>
          <Subheading> Cats you have adopted: </Subheading>
            <ProfileInfo>
              Cat names list
            </ProfileInfo>
          <Subheading> Want to see your current Cat Cart? </Subheading>
          <ProfileInfo><Button onClick={() => catSearch()}>Go to Cat Cart list!</Button></ProfileInfo>
        </ContentContainer>
      </ProfilePage>
      <Footer />
    </>
  )
};


const ProfilePage = styled.div`
  background-color: #DFDFDF;
  padding: 20px;
  padding-left: 10%;
  padding-right: 10%;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  color: #25283D;
  
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

