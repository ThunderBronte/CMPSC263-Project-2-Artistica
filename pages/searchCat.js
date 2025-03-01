import Content from "@/components/LandingPage/Content"
import styled from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"


const SearchCat = () => {

  const router = useRouter();

  const homePage = () => {
    router.push('/');
  }

  const [ button, setButton ] = useState(false);

  const { user, setUser } = useStateContext()

  const [ data, setData] = useState(null);
  const [ nameData, setNameData ] = useState(null);


  useEffect(() =>{
    const fetchCatImages = async () => {
      try{
        const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        
        // Handle if the response is not okay
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const imageData = await res.json();

        setData(imageData);
      } catch(error){ 
        console.error('Error fetching cat facts:', error);
      }
    }

    const fetchRandomName = async () => {
      try{
        const res = await fetch('https://names.ironarachne.com/race/dragonborn/family/10');
        
         // Handle if the response is not okay
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const namesData = await res.json();
        
        setNameData(namesData);
      } catch(error){
        console.error("Error getting names: ", error);
        setNameData(null);
      } 
    }
    
    fetchCatImages();
    fetchRandomName();
  },[button])

  // Change the button being pressed so the useEffect is triggered and gets more cats 
  function buttenWasPressed(){
    setButton(!button);
  }


  return (
    <>
      <NavigationBar />
          <ContentContainer>
            <Title>
              Adopt Kittens & Cats!
            </Title>
            <SearchSection>
              <Button onClick={() => homePage()}>Learn how to take care of cats!</Button>
              <Button onClick={buttenWasPressed}>10 More Cats</Button>
            </SearchSection>
            <CatContainer>
              {data ? (
                <div>
                  {data.map((image) => (
                    <OneCatContainer key = {image.id}>
                      <Image src={image.url} width="300"/>
                      <CatName>{nameData ? nameData.names[Math.floor(Math.random() * 10)] : "Loading Cat Name..."}</CatName>
                    </OneCatContainer>
                  ))} 
                </div>
              ) : (
                <p>Loading Cat Images...</p>
              )}
            </CatContainer>
          </ContentContainer>
      <Footer />
    </>
  )
};



const ContentContainer = styled.div`
  background-color: white;
  padding: 3%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 75px;
  padding-bottom: 50px;
`;

const SearchSection = styled.div`
  padding-bottom: 50px;
  text-align: center;
  position: relative;
`;

const Button = styled.button`
  font-size: 25px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  margin: 5px;
  margin-left: 15px;

  display: flex;
  text-align: right;
  display: inline-block;

  color: #077678;
  border-color: #077678;
  border-radius: 50px;
  &:hover{ 
    color: white;
    background-color: #077678; 
  }

  border-radius: 50px;
  border-style: solid;
  background-color: transparent;

`;

const CatContainer = styled.div`
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 20px;

  grid-auto-flow: row;

  
  background-color: blue;
`;

const Image = styled.img`
  border-radius: 20px;

  // :<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //&:hover{
  //  border-style: 3px soild #077678;
  //}
`;

const OneCatContainer = styled.div`
  text-align: center;
  border-radius: 20px;
`;

const CatName = styled.p`
  text-align: center;
`;

export default SearchCat