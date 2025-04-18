import styled from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import {useStateContext } from '@/context/StateContext'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import { createDoc } from "@/backend/Database"

//Main content of the page
// Displays basic information of the website, why the user should adopt (along with going to the page to search for cats), get a fun fact 
// (using an API) that changes everytime the page loads, and basic care of cats.
// there is a button that takes the user to the top of the page. 

const Content = ({text}) => {

//   const router = useRouter();

  const { user, setUser } = useStateContext();

  const focus = useRef('');


    useEffect(() => {
        // wait for user information to load 
        if(user === undefined){ 
        console.log("Starting up! Waiting for user info...");
        } else {
        // if(!user){
        //   router.push('/login')
        // }
        }
    }, [user]);
 


  return (
    <>
    <NavigationBar />
    <ContentContainer>
      <Space>.</Space>
      <TitleScreen ref={focus}>
        <Title>Interactions</Title>
       </TitleScreen>

      <TextContent>
        <SectionContainer>
          <AllInteractions>
              <Column>
                <Image src="Images/art1.webp"></Image>
                <ArtText>Title: Art1 <br></br>Artist: Cover Name</ArtText>
              </Column>
              <Column>
              </Column>
              <Column>
              </Column>
              
          </AllInteractions>
        </SectionContainer>

        
        </TextContent>
    </ContentContainer> 
    <Footer />
    </>
  ); 
};


const ContentContainer = styled.div`
  background-color: #120E14;
  color: white;
`;

const Space = styled.div` color: #120E14; `;

const TitleScreen = styled.div`
  background-color: #120E14;
  margin-left: 9%;
  margin-right: 9%;

  overflow: hidden;
`;

const Title = styled.div`
  margin = -10px;
  font-size: 60px;
  padding: 20px;
  text-align: left;
  float: left;
  display: inline;
`;



const AllInteractions = styled.div`
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 5px;

  grid-auto-flow: row;
`;

const Column = styled.div`
  text-align: center;
  border-radius: 7px;
  width: 320px;
  height: 380px;
  //border: 2px solid #29262C;

  
  &:hover {
    //cursor: pointer;

  }
`;

const Image = styled.img`
  height: 275px;
  width: 275px;
  border-radius: 5px;
  object-fit: cover;
  margin-top: 15px;
`;

const ArtText = styled.p`
  font-size: 20px;
`;


const TextContent = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;

const SectionContainer = styled.div`
  background-color: #120E14;
  padding-bottom: 5%;  
  margin-left: 9%;
  margin-right: 9%;
`;



export default Content;
