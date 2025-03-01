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


  // Chang the button being pressed so the useEffect is triggered and gets more cats 
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
            <ImageContainer>
              {data ? (
                <div>
                  {data.map((image) => (
                    <span key = {image.id}>
                      <img src={image.url} width="300"/>
                      <CatName>{nameData.names[Math.floor(Math.random() * 10)]}</CatName>
                    </span>
                  ))} 
                </div>
              ) : (
                <p>Loading Cat Images...</p>
              )}
            </ImageContainer>
          </ContentContainer>
      <Footer />
    </>
  )
};



const ContentContainer = styled.div`
  background-color: white;
  padding: 3%;
  color: #25283D;
  
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

const ImageContainer = styled.div`
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  
`;

const CatName = styled.p`
`;

export default SearchCat