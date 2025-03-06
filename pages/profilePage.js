import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"


// Profile page of the user current signed in. If you are not signed in, you will be moved to the login page. 
// Will show the current user that is signed in and their info. They are able to sign out. 
// There are quick links to navigate the website

export default function Home() {
  
  const { user, setUser } = useStateContext()

  const router = useRouter()
  
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

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
          setEmail(user.email);
        } else if(typeof user === 'string') {
          userName = user.split('@');
          setEmail(user);
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
          <Header>
            <Left>
              <Img src="/profilePicture.png"></Img>
              <Heading>Hello {name}!</Heading>
              {/* <Thanks>Thank you for being a user with us!</Thanks> */}
              <Links>Here are some quick Links:</Links>
              <ButtonLinks>
                <Button onClick={() => router.push("/")}>Homepage</Button>
                <Button onClick={() => router.push("/searchCat")}>Search Cats</Button>
                <Button onClick={() => router.push("/catCart")}>Cat Cart</Button>
              </ButtonLinks>
            </Left>
            <Right>
              <Subheading>Here is your information: </Subheading>
                <ProfileInfo>Current Username: {name}</ProfileInfo>
                <ProfileInfo>Current email: {email}</ProfileInfo>
                <ProfileInfo><Button onClick={() => signOutUser()}>Sign Out</Button></ProfileInfo>
            <Subheading> Want to see your current Cat Cart? </Subheading>
            <ProfileInfo><Button onClick={() => router.push('/catCart')}>Go to Cat Cart list!</Button></ProfileInfo>
            </Right>
            
          </Header>
          
        </ContentContainer>
      <Footer />
    </>
  )
};


const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  color: #25283D;
  
  margin-left: 15%;
  margin-right: 15%;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Left = styled.div`
  text-align: left;
`;

const Links = styled.div`
  font-size: 30px;
  margin-top: 25px;
`;

const Img = styled.img`
 width: 70%;
`;

const ButtonLinks = styled.div`
  display: felx;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  text-align: left;
`;

const Heading = styled.h1`
  font-size: 60px;
  text-align: left;
  padding-top: 20px;
`;


const Subheading = styled.h2`
  font-size: 30px;
  padding: 20px;
  margin-top: 50px;
`;

const ProfileInfo = styled.p`
  font-size: 20px;
  padding-left: 10%;
  padding-bottom: 10px;
`;


const Button = styled.button`
  font-size: 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 15px;

  display: flex;
  gap: 10px;

  color: white;
  background-color: #077678; 
  border: 2px solid #077678;
  border-radius: 50px;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
    cursor: pointer;
  }

`;

