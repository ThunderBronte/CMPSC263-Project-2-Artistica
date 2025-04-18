import styled from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import {useStateContext } from '@/context/StateContext'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import { createDoc } from "@/backend/Database"



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
      <PageInfo>
          <PageText>This page might be deleted depending on how everything else goes - as in, is this really important / how hard it is to complete it.</PageText>
          <PageText>As of right now, this page is dedicated to showing people's interactions</PageText>
          <PageText>I have a grid prepared, but it currently has place holders in it.</PageText>
      </PageInfo>
       

      <TextContent>
        <SectionContainer>
          <AllInteractions>
              <Column>
                <Image src="Images/MightDelete/send.jpg"></Image>
                <ArtText>User Sending Information 1</ArtText>
              </Column>
              <Column>
                <Image src="Images/MightDelete/getInfo.png"></Image>
                <ArtText>User Getting information 1</ArtText>
              </Column>
              <Column>
                <Image src="Images/MightDelete/money.webp"></Image>
                <ArtText>The amount 1</ArtText>
              </Column>
              <Column>
                <Image src="Images/MightDelete/send.jpg"></Image>
                <ArtText>User Sending Information 2</ArtText>
              </Column>
              <Column>
                <Image src="Images/MightDelete/getInfo.png"></Image>
                <ArtText>User Getting information 2</ArtText>
              </Column>
              <Column>
                <Image src="Images/MightDelete/money.webp"></Image>
                <ArtText>The amount 2</ArtText>
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

const PageInfo = styled.div`
  background-color: #120E14;
  padding-bottom: 2%; 
  padding-top: 2%;  
  margin-left: 10%;
  margin-right: 10%;

`;

const PageText = styled.div`
  text-align: left;
  font-size: 20px;
`;


const AllInteractions = styled.div`
  display: grid;
  column-gap: 10px;

//   justify-content: space-evenly;
//   padding-top: 50px;

  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: auto; 

  grid-auto-flow: row;
`;

const Column = styled.div`
  //float: left;
  // width: 33.33%;
//   text-align: center;
//   border-radius: 7px;
//   width: 320px;
//   height: 380px;
//   //border: 2px solid #29262C;

  
//   &:hover {
//     //cursor: pointer;

//   }
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
