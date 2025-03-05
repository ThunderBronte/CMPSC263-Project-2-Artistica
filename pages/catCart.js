import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import NavigationBar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import Footer from "@/components/LandingPage/Footer"
import { fetchEmailData, fetchCatListData } from "@/backend/Database"



const CatCart = () => {

  const { user, setUser } = useStateContext()

  const [ data, setData ] = useState(undefined);
  const [ alert, setAlert ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);

  const containerTag = useRef(null);


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
        // Get information for a specific user (currently logged in)
                                      // Change to user.email
        const data = await fetchEmailData("mayachitu@gmail.com");

        // If this email has any data
        if(!data){
          // No cats saved 
          setAlert(`You do not have any saved cats.`);
        } else {
          setAlert("");
          // Get all the cats saved for account
                                             // Change to user.email
          const info = await fetchCatListData("mayachitu@gmail.com");

          console.log("indo: ", info);

          if(info){
            //displayCatInfo(info);
            setData(info);
          } else {
            setAlert("No cats saved in second doc.");
          }
        }
      }
    }

    getData();
  }, [user]);



  /*
  // Display all the cats in the database
    // Might need useEffect ---------------------------------------
    // Create a containter for each of the cats 
    useEffect(() =>{ 
      if(data === undefined){ 
        console.log("Waiting for data info...");
      } else {
        // Remove any previous info 
        if(containerTag.current.children.length > 0){
          containerTag.current.innerHTML = "";
          console.log("Removed children");
        }

        data.forEach((cat) => {
          //const cat = data[2];
          console.log("In loop");

          const oneCat = (
          //containerTag.current.appendChild(
            <OneCatContainer key={cat.id}>
              <ImageCats src={cat.url}></ImageCats>
              <CatInfo>{cat.name}</CatInfo>
              <Button onClick={() => removeCat()}>Remove Cat</Button>
            </OneCatContainer>
          );

          


          // Create a new tag for each portion of the container with the desired information
          // const oneCatContainer = document.createElement('div');
          // oneCatContainer.className = OneCatContainer.styledComponentId;
          // oneCatContainer.key = cat.id;

          // const imageCats = document.createElement('img');
          // imageCats.className = ImageCats.styledComponentId;
          // imageCats.src = cat.url;
          
          // oneCatContainer.src = cat.url;

          // const catInfo = document.createElement('p');
          // catInfo.className = CatInfo.styledComponentId;
          // catInfo.innerHTML = cat.name;

          // const btnRemove = document.createElement('button');
          // btnRemove.className = Button.styledComponentId;
          // btnRemove.innerHTML = "Remove"; 
          // btnRemove.onclick = () => {removeCat};

          // oneCatContainer.appendChild(catInfo);
          // oneCatContainer.appendChild(btnRemove);

          
          
          
          //containerTag.current.appendChild(temp);
        })
      }
    }, [data])


    */

  /*
    // Display all the cats in the database
    useEffect(() => {
      if (containerTag.current && data) {
        // Clear previous children
        containerTag.current.innerHTML = ""
  
        // Dynamically append new cats
        data.forEach((cat) => {
          const oneCatContainer = document.createElement('div')
          oneCatContainer.className = OneCatContainer.styledComponentId
          oneCatContainer.key = cat.id
  
          const imageCats = document.createElement('img')
          imageCats.className = ImageCats.styledComponentId
          imageCats.src = cat.url
  
          const catInfo = document.createElement('p')
          catInfo.className = CatInfo.styledComponentId
          catInfo.innerText = cat.name
  
          const btnRemove = document.createElement('button')
          btnRemove.className = Button.styledComponentId
          btnRemove.innerText = "Remove Cat"
          btnRemove.onclick = () => removeCat(cat.id)
  
          // Append the image, name, and button to the oneCatContainer
          oneCatContainer.appendChild(imageCats)
          oneCatContainer.appendChild(catInfo)
          oneCatContainer.appendChild(btnRemove)
  
          // Append the new oneCatContainer to the main container
          containerTag.current.appendChild(oneCatContainer)
        })
      }
    }, [data]) */


  // Remove cat from favorites list 
  function removeCat(){
    console.log("Bye bye kitty");

    //if there are no more cats, change the page
    if(data.length === 0){
      setIsVisible(false);
    }
  }
  


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
              <CatContainer ref={containerTag}>
                {data ? (
                <div>
                  {data.map((cat) => (
                    <OneCatContainer key={cat.id}>
                      <ImageCats src={cat.url}></ImageCats>
                      <CatInfo>{cat.name}</CatInfo> 
                      <Button onClick={() => removeCat()}>Remove Cat</Button>
                    </OneCatContainer>
                  ))} 
                  </div> ) : <p></p>}
              </CatContainer> 
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
  font-size: 15px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 5px;

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



// Info for creacting a grid with all the cats
const CatContainer = styled.div`
  margin-left: 10%;
  margin-right: 10%;  
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 20px;

  grid-auto-flow: row;
  //grid-auto-rows: auto;
  
  background-color: blue;
`;

const OneCatContainer = styled.div`
  text-align: center;
  border-radius: 20px;
  width: 300px;
  background-color: white;
`;

const ImageCats = styled.img`
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  width: 300px;
`;

const CatInfo = styled.p`
  text-align: center;
`;


export default CatCart