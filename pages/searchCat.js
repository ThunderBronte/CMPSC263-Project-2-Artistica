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

  const [ catImg, setCatImg ] = useState(null);
  const [ catName, setCatName ] = useState(null);


  useEffect(() =>{
    // API for cat images
    const fetchCatImages = async () => {
      try{
        const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        
        // Handle if the response is not okay
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const imageData = await res.json();

        console.log("Image data: ", imageData);

        setData(imageData);
      } catch(error){ 
        console.error('Error fetching cat facts:', error);
      }
    }

    // API for names 
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


  function saveCat(email, catUrl, catId){

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
              <Button onClick={buttenWasPressed}>Load 10 More Cats</Button>
            </SearchSection>
            <CatContainer>
              {data ? (
                <>
                  {data.map((image) => (
                    <OneCatContainer key = {image.id}>
                      <Image src={image.url} width="300"/>
                      <CatText>
                        <CatName>{nameData ? nameData.names[Math.floor(Math.random() * 10)] : "Loading Cat Name..."}</CatName>
                        <CatButton onClick={() => saveCat()}>Save Cat</CatButton>
                      </CatText>
                    </OneCatContainer>
                  ))} 
                </>
              ) : (
                <p>Loading Cat Images...</p>
              )}
            </CatContainer>
            <BottomButton><Button onClick={buttenWasPressed}>Load 10 More Cats</Button></BottomButton>
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
  margin-right: 10%;
  margin-left: 5%;

  display: flex;
  text-align: right;
  display: inline-block;

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

const BottomButton = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const CatContainer = styled.div`
  margin-left: 10%;
  margin-right: 10%;  
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 30px;

  grid-auto-flow: row;
`;

const Image = styled.img`
  border-radius: 20px;
  border-style: 3px soild white;
  width: 300px;
  height: 300px;
`;

const OneCatContainer = styled.div`
  text-align: center;
  border-radius: 20px;
  width: 320px;
  height: 380px;
  border: 4px solid white;

  // &:hover{
  //   border: 4px solid #077678;
  // }
`;

const CatName = styled.p`
  font-size: 20px;
  padding: 7px;
  padding-right: 15%;
  margin: 5px;
`;

const CatButton = styled.div`
  font-size: 18px;
  padding: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 5px;

  display: inline-block;

  float: right;

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

const CatText = styled.div`
  display: flex;
  justify-content: center;
`;

export default SearchCat