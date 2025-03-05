import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import NavigationBar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import Footer from "@/components/LandingPage/Footer"
import { fetchData, fetchCollectionData } from "@/backend/Database"



const CatCart = () => {

  const { user, setUser } = useStateContext()

  const [ data, setData ] = useState();
  const [ alert, setAlert ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);


  const router = useRouter()


  // If the user is not logged in, send them to the login page.
  useEffect(() => {
    // wait for user information to load 
    if(user === undefined){ 
      console.log("Waiting for user info...");
    } else {
      if(!user){
        router.push('/login')
      }
    }
  }, [user]);


  // Get data from the database 
  useEffect(() => {
    async function getData(){
      if(user === undefined){ 
        console.log("Waiting for user info...");
      } else {
        console.log(user.email);

        // Get information for a specific user (currently logged in)
        const data = await fetchData("mayachitu@gmail.com");

        // any saved cats or not
        if(!data){
          // No cats saved 
          setAlert(`You do not have any saved cats.`);
        } else {
          // Will
          setAlert("");
          console.log("Dataaa: ", data);
          console.log("new studd: ", fetchCollectionData(data, "cat1"));
          // const newInfo = fetchCollectionData()
          //setData(data);
        }
      }
    }

    getData();
  }, [user]);


  // Display all the cats in the database
  // Do not know how many cats there are so need for loop 


  // See if to show cat list or sad cats 
  // true if there are cats saved
  useEffect (() =>{
    if (alert === ""){
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [alert])
  

  return (
    <>
      <NavigationBar />
          <ContentContainer>
            <Title>
              Here is a list of your favorite cats!
            </Title>
            {!isVisible ?
              <NoCat>
                <NoCatContainer>
                  <Alert>{alert}</Alert>
                  <Button>Explore Cats!</Button>
                </NoCatContainer>
                <NoCatContainer>
                  <Text>The cats at the shelter because you are not interested in any of them:</Text>
                  <NoCatImags>
                    <Image src="catImages/sadCat1.webp"></Image>
                    <Image src="catImages/sadCat2.jpg"></Image>
                    <Image src="catImages/sadCat3.webp"></Image>
                  </NoCatImags>
                </NoCatContainer>
              </NoCat> 
              : 
              <CatList>
                <ImageContainer src="{data.catUrl}">
                  Data: 
                  {/* {data.catId}
                  {data.catUrl} */}
                </ImageContainer>
              </CatList> 
            }
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

const Alert = styled.h1`
  font-size: 40px;
  text-align: center;
  color: #077678;
`;

const CatList = styled.div`
`;

const Text = styled.p`
  font-size: 25px; 
  text-align: center;
`;

const NoCat = styled.div`
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
`;

const NoCatContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
`;

const Button = styled.button`
  font-size: 25px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  margin: 20px;

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

const NoCatImags = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
`;


const Image = styled.img`
  width: 25%;
`;

const ImageContainer = styled.div`
  border-radius: 30px;
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  
`;



export default CatCart


// useEffect(() =>{
  //   // Here, I will get the data from a personal json file and display it 

  //   const fetchCatImages = async () => {
  //     try{
  //       const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
  //       const imageData = await res.json();

  //       setData(imageData);
  //     } catch(error){ 
  //       console.error('Error fetching cat facts:', error);
  //     }
  //   }

  //   const fetchRandomName = async () => {
  //     try{
  //       const res = await fetch('https://randomuser.me/api/');
  //       const nameData = await res.json();
        
  //       setNameData(nameData.results);
  //     } catch(error){
  //       console.error("Error getting names: ", error);
  //     }
  //   }
    
  //   fetchCatImages();
  //   fetchRandomName();
  //   setIsMounted(true); 
  // },[user])



  // useEffect(() => {
  //   if(!user){
  //     router.push('/login')
  //   }else{

  //   }
  // }, user) 



   /* <ul>
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
              </ul> */
