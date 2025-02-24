import Content from "@/components/LandingPage/Content"
import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
//import Button from 'react-bootstrap/Button'



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
    name = Button.value;
    setUser(name);
  }


  return (
    <>
    <NavigationBar />
      <ProfilePage>
        <ContentContainer>
          <Heading>Hello {user}!</Heading>
          <Subheading>Here is your information: </Subheading>
            <ProfileInfo>Current Username: {user}</ProfileInfo>
          <Subheading> Want to change your information? </Subheading>
            <ProfileInfo>
              New Username: <InputInfo></InputInfo> 
              <Button onClick={changeUser()}>Change Username</Button>
            </ProfileInfo>
          <Subheading>
            Cats you have adopted:
            <ProfileInfo>
              Cat names list
            </ProfileInfo>
          </Subheading>
          <Subheading>
            Want to see your current Cat Cart?
            <br></br>
            <Button>Go to Cat Cart list!</Button>
          </Subheading>
        </ContentContainer>
      </ProfilePage>
      <Footer />
    </>
  )
};


const ProfilePage = styled.div`
  background-color: #DFDFDF;
  padding: 20px;
  padding-left: 200px;
  padding-right: 200px;
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

  background-color: #25283D;
  color: #43DFBD;
  &:hover{
    background-color: #43DFBD;
    color: #25283D;
  }

`;

