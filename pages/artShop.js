import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import NavigationBar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import Footer from "@/components/LandingPage/Footer"
import { fetchEmailData, fetchCatListData, deleteDesiredCat } from "@/backend/Database"

// Asks the user to log in if not already.
// Takes data from the database based on the current user logged in. Displays it with the cat's name. If the user removes it from their cart,
// The cat is removed from their database. If you run out of cat, a page pops up stating to look for more cats.

const CatCart = () => {

  const { user, setUser } = useStateContext()

  const [ data, setData ] = useState(undefined);
  const [ alert, setAlert ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);

  const [ deleteInfo, setDeleteInfo ] = useState(false);
  const [ desiredCatId, setDesiredCatId ] = useState(null);
  const [ buttonPressed, setButtonPressed ] = useState(null);


  const router = useRouter()


  // If the user is not logged in, send them to the login page.
  useEffect(() => {
    // wait for user information to load 
    if(user === undefined){ 
      console.log("Starting up! Waiting for user info...");
    } else {
      if(!user){
        router.push('/login')
      }
    }
  }, [user]);


  // Get data from the database, chnage when button ('remove') was pressed
  useEffect(() => {
    async function getData(){
      if(user === undefined){ 
        console.log("Getting Database useEffect. Waiting for user info...");
      } else {
        if(!user){
          router.push('/login')
        } else {
          // Get information for a specific user (currently logged in)
          const data = await fetchEmailData(user.email);

          // If this email has any data
          if(!data){
            // No cats saved 
            setAlert(`You do not have any saved cats.`);
          } else {
            setAlert("");
            // Get all the cats saved for account
            const info = await fetchCatListData(user.email);

            if(info.length === 0){
              console.log("No cats :(((");
                setAlert(`You do not have any saved cats.`);
                setIsVisible(false);
            } else {
              setIsVisible(true);
              setAlert("");

              console.log("indo: ", info);

              if(info){
                setData(info);
              } else {
                setAlert("No cats saved in second doc.");
              }
            }
          }
        }
      }
    }

    getData();
  }, [user]);


  useEffect(() =>{
    async function getNewData(){
      if(deleteInfo == true){
        if(user === undefined){ 
          console.log("2 Waiting for user info...");
        } else {
          const deleteRes = setDeleteInfo(await deleteDesiredCat(user.email, desiredCatId));
          console.log("back from del: ", deleteRes);
          setDeleteInfo(deleteRes);

          if(deleteInfo === undefined){
            console.log("Waiting for delete promise...");
          } else {
            // Reset the data
              const info = await fetchCatListData(user.email);

              console.log("Top ifno: ", info);

              if(info.length === 0){
                setAlert(`You do not have any saved cats.`);
                setIsVisible(false);
              } else {
                setIsVisible(true);
                setAlert("");

                if(info == undefined) {
                  console.log("Waiting for new info...");
                } else {
                  console.log("NEW indo: ", info);

                  if(info){
                    setData(info);
                  } else {
                    setAlert("No cats saved in second doc.");
                  }
                }
              }
            }
                  
            //if there are no more cats, change the page
            if(data === null){
              setIsVisible(false);
            }
          }
        }
      //}
    }

    getNewData();
  }, [deleteInfo])


  // See if to show cat list or sad cats 
  // true if there are cats saved
  useEffect (() =>{
    if (alert === ""){
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [alert])


  function setToDeleteCat(catId){
    setDeleteInfo(true);
    setDesiredCatId(catId);
    setButtonPressed(!buttonPressed);
  }
 
  

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
                  <ButtonTop onClick={() => router.push("/searchCat")}>Explore Cats!</ButtonTop>
                </NoCatContainer>
                <NoCatContainer>
                  <Text>The cats at the shelter because you are not interested in any of them:</Text>
                  <NoCatImags>
                    <Image src="sadCat1.webp"></Image>
                    <Image src="sadCat2.jpg"></Image>
                    <Image src="sadCat3.webp"></Image>
                  </NoCatImags>
                </NoCatContainer> 
              </NoCat> 
              : 
              <CatContainer>
                {data ? (
                <>
                  {data.map((cat) => (
                    <OneCatContainer id="oneCatContainer" key={cat.id}>
                      <ImageCats src={cat.url}></ImageCats>
                      <CatText>
                        <CatInfo>{cat.name}</CatInfo> 
                        <Button onClick={() => setToDeleteCat(cat.id)}>Remove Cat</Button>
                      </CatText>
                    </OneCatContainer>
                  ))} 
                  </> ) : <p>Loading Cat Cart...</p>}
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

const ButtonTop = styled.button`
  font-size: 30px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  margin: 10px;
  margin-top: 40px;

  display: inline-block;

  float: center;

  color: white;
  background-color: #077678; 
  border: 2px solid #077678;
  border-radius: 50px;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
    cursor: pointer;
  }
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
  gap: 20px 20px;

  grid-auto-flow: row;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 10px;

  display: inline-block;

  float: center;

  color: white;
  background-color: #077678; 
  border: 2px solid #077678;
  border-radius: 50px;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
    cursor: pointer;
  }
`;

const OneCatContainer = styled.div`
  text-align: center;
  border-radius: 20px;
  width: 320px;

  padding: 10px;
`;

const ImageCats = styled.img`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  width: 300px;
  height: 300px;
`;

const CatInfo = styled.p`
  font-size: 20px;
  padding: 7px;
  padding-right: 15%;
  margin: 5px;
`;

const CatText = styled.div`
  display: flex;
  justify-content: center;
`;


export default CatCart