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

  const [button, setButton ] = useState(false);

  const { user, setUser } = useStateContext()
  const [ data, setData] = useState(null);
  const [ nameData, setNameData ] = useState(null);

  // Create mount to make sure the component runs after we get the API data
    const [isMounted, setIsMounted] = useState(false); 


  useEffect(() =>{
    const fetchCatImages = async () => {
      try{
        const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const imageData = await res.json();

        setData(imageData);
      } catch(error){ 
        console.error('Error fetching cat facts:', error);
      }
    }

    const fetchRandomName = async () => {
      try{
        const res = await fetch('https://randomuser.me/api/');
        const nameData = await res.json();
        
        setNameData(nameData.results);
      } catch(error){
        console.error("Error getting names: ", error);
      }
    }
    
    fetchCatImages();
    fetchRandomName();
    setIsMounted(true); 
  },[button])

  function buttenWasPressed(){
    setButton(!button);
  }




  //Search Cats<InputInfo></InputInfo>  
  // might get rid of text box
  return (
    <>
      <NavigationBar />
        <Page>
          <ContentContainer>
            <Title>
              Adopt Kittens & Cats!
            </Title>
            <SearchSection>
              <Button onClick={() => homePage()}>Learn how to take care of cats!</Button>
              <Button onClick={buttenWasPressed}>Search More Cats</Button>
            </SearchSection>
            <hr></hr>
            <ImageContainer>
              {data && isMounted ? (
                <div>
                  {data.map((image) => (
                    <span key = {image.id}>
                      <img src={image.url} width="300"/>
                      {nameData ? (
                      <p>{nameData.map((name, index) => (
                        <span key = {index}> {name.first} {name.last}</span>
                      ))}</p> ) : (
                        <p>Loading Cat Names...</p>
                      )}
                    </span>
                  ))} 
                </div>
              ) : (
                <p>Loading Cat Images...</p>
              )}
            </ImageContainer>
          </ContentContainer>
        </Page>
      <Footer />
    </>
  )
};


const Page = styled.div`
  background-color: #DFDFDF;
  padding: 20px;
  padding-left: 10%;
  padding-right: 10%;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 3%;
  border-radius: 20px;
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

const ImageContainer = styled.div`
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  
`;

const InputInfo = styled.input`
  background-color: #DFDFDF;
  border-radius: 8px;
  padding: 5px;
  margin-left: 10px;
  width: 80%;
`;

export default SearchCat