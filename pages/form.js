import styled from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import {useStateContext } from '@/context/StateContext'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import { createDoc } from "@/backend/Database"

//Search for cats. Cat image API and random name API was used.
// Every time the page loads (or one of the two "search 10 more cats"), new images and names pop up.
// When the user clicks on a "save cat" button, if the user is not logged in it will be asked to. If they are, the cat id, name, & url will be 
// added to their databse under their email. 


const ArtTrade = () => {

  const router = useRouter();

  // const homePage = () => {
  //   router.push('/');
  // }

  const { user, setUser } = useStateContext()

  const [ button, setButton ] = useState(false);
  const [ data, setData] = useState(null);
  const [ nameData, setNameData ] = useState(null);
  const [ alert, setAlert ] = useState(null);

  const focus = useRef('');


  // useEffect(() =>{
  //   // API for cat images
  //   const fetchCatImages = async () => {
  //     try{
  //       const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        
  //       // Handle if the response is not okay
  //       if(!res.ok){
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }

  //       const imageData = await res.json();

  //       setData(imageData);
  //     } catch(error){ 
  //       console.error('Error fetching cat facts:', error);
  //     }
  //   }
  //
  //   // API for names 
  //   const fetchRandomName = async () => {
  //     try{
  //       const res = await fetch('https://names.ironarachne.com/race/dragonborn/family/10');
        
  //        // Handle if the response is not okay
  //       if(!res.ok){
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
        
  //       const namesData = await res.json();
        
  //       setNameData(namesData);
  //     } catch(error){
  //       console.error("Error getting names: ", error);
  //       setNameData(null);
  //     } 
  //   }
    
  //   fetchCatImages();
  //   fetchRandomName();
  // },[button])

  // // Change the button being pressed so the useEffect is triggered and gets more cats 
  // function buttenWasPressed(){
  //   setButton(!button);
  // }


  // function saveCat( catId, catUrl, catName){
  //   if(!user){
  //     router.push('/login');
  //   } else {
  //     const catData = {
  //       id: catId,
  //       url: catUrl,
  //       name: catName
  //     };

  //     const reply = createDoc(user.email, catData)

  //     console.log("reply: ", reply);

  //     setAlert(catName + " was successfully added to your Cat Cart!");
  //     if(focus.current){
  //       focus.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start"
  //       });
  //     }
  //   }
  // }

  return (

    <>
    <NavigationBar />
    <ContentContainer>
      <Space>.</Space>
      <TitleScreen>
        <Title>Form</Title>
        <Form><SearchBar placeholder = "Search Artists..."></SearchBar></Form> 
      </TitleScreen>
      <PageInfo>
          <PageText>Welcome to the Trader's Den!</PageText>
          <PageText>Here, you can trade with artists.</PageText>
      </PageInfo>
      <TextContent>
        <SectionContainer>
          <AllArtCont>
              <ImageContainer>
                <Image src="Images/Profile4.png"></Image>
                <ArtText>Artist: Name 1</ArtText>
                <Button>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile5.png"></Image>
                <ArtText>Artist: Name 2</ArtText>
                <Button>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile6.jpg"></Image>
                <ArtText>Artist: Name 3</ArtText>
                <Button>Contact</Button>
              </ImageContainer>
          </AllArtCont>
        </SectionContainer>

        
        </TextContent>
        {/* <TopContainer><SectionButton onClick={() => goToTop()}>Back To Top</SectionButton></TopContainer> */}
    </ContentContainer> 
    <Footer />
    </>
)};


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

const Form = styled.form`
  //display: flex;
  //  justify-content: center;
  // align-items: center;
`;

const SearchBar = styled.input`
  font-size: 17px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: transparent;
  color: white;

  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 3%;
  margin-top: 2.5%;

  width: 30%;
  float: right;
`;

const AllArtCont = styled.div`
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 5px;

  grid-auto-flow: row;
`;

const ImageContainer = styled.div`
  text-align: center;
  border-radius: 7px;
  width: 320px;
  height: 380px;

  
  &:hover {
    //cursor: pointer;

  }
`;

const Image = styled.img`
  height: 275px;
  width: 275px;
  border-radius: 50%;
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

const Button = styled.button`
  margin-top: 5px;
  font-size: 20px;
  margin: 4%;
  padding: 1%;
  padding-left: 2%;
  padding-right: 2%;
  
  color: black;
  background-color: #FFD725; 
  border: 2px solid #FFD725;
  border-radius: 10px;

  &:hover{ 
    color: black;
    border-color: #CEAD1B;
    background-color: #CEAD1B;
    cursor: pointer;
  }
`;
export default ArtTrade;