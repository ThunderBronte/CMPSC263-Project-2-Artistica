import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import NavigationBar from '@/components/Dashboard/Navbar'
import { StateContext, useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import Footer from "@/components/LandingPage/Footer"



const CatCart = () => {

  const { user, setUser } = useStateContext()
  const [ data, setData] = useState(null);
  const [ nameData, setNameData ] = useState(null);

  const router = useRouter()

  // Create mount to make sure the component runs after we get the API data
  const [isMounted, setIsMounted] = useState(false); 


  useEffect(() =>{
    // Here, I will get the data from a personal json file and display it 

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
  },[user])



  // useEffect(() => {
  //   if(!user){
  //     router.push('/login')
  //   }else{

  //   }
  // }, user) 


  //Search Cats<InputInfo></InputInfo>  
  // might get rid of text box
  return (
    <>
      <NavigationBar />
        <Page>
          <ContentContainer>
            <Title>
              Here is a list of your favorite cats!
            </Title>
            <hr></hr>
            <ImageContainer>
              <ul>
                {data && isMounted ? (
                  <div>
                    {data.map((image) => (
                      
                      <li key = {image.id}>
                        <img src={image.url} width="300"/>
                        {nameData ? (
                        <p>{nameData.map((name, index) => (
                          <span key = {index}> {name.first} {name.last}</span>
                        ))}</p> ) : (
                          <p>Loading Cat Names...</p>
                        )}
                        </li>
                  ))} 
                  </div>
                ) : (
                  <p>Loading Cat Images...</p>
                )}
              </ul>
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


export default CatCart