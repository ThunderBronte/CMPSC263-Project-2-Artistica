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

const ArtShop = () => {

  const { user, setUser } = useStateContext()

  const [isOpen, setIsOpen] = useState(false);
  const [thanksMessage, setMessage] = useState(null);

  const [artistName, setArtistName] = useState(null);
  const [artistEmail, setArtistEmail] = useState(null);


  // const [ data, setData ] = useState(undefined);
  // const [ alert, setAlert ] = useState("");
  // const [ isVisible, setIsVisible ] = useState(false);

  // const [ deleteInfo, setDeleteInfo ] = useState(false);
  // const [ desiredCatId, setDesiredCatId ] = useState(null);
  // const [ buttonPressed, setButtonPressed ] = useState(null);


  const router = useRouter()
  
  // For the form
  const openPopup = (name, email) => {
    setArtistName(name);
    setArtistEmail(email);
    setIsOpen(true);
  };
  
  const closePopup = () => {
    setIsOpen(false);
  };
  

  // For the message 
  const openMessage = () => {
    setMessage(true);
  };
  
  const closeMessage = () => {
    setMessage(false);
  };


  
  // If the user is not logged in, send them to the login page.
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

  // // Get data from the database, chnage when button ('remove') was pressed
  // useEffect(() => {
  //   async function getData(){
  //     if(user === undefined){ 
  //       console.log("Getting Database useEffect. Waiting for user info...");
  //     } else {
  //       if(!user){
  //         router.push('/login')
  //       } else {
  //         // Get information for a specific user (currently logged in)
  //         const data = await fetchEmailData(user.email);

  //         // If this email has any data
  //         if(!data){
  //           // No cats saved 
  //           setAlert(`You do not have any saved cats.`);
  //         } else {
  //           setAlert("");
  //           // Get all the cats saved for account
  //           const info = await fetchCatListData(user.email);

  //           if(info.length === 0){
  //             console.log("No cats :(((");
  //               setAlert(`You do not have any saved cats.`);
  //               setIsVisible(false);
  //           } else {
  //             setIsVisible(true);
  //             setAlert("");

  //             console.log("indo: ", info);

  //             if(info){
  //               setData(info);
  //             } else {
  //               setAlert("No cats saved in second doc.");
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   getData();
  // }, [user]);


  // useEffect(() =>{
  //   async function getNewData(){
  //     if(deleteInfo == true){
  //       if(user === undefined){ 
  //         console.log("2 Waiting for user info...");
  //       } else {
  //         const deleteRes = setDeleteInfo(await deleteDesiredCat(user.email, desiredCatId));
  //         console.log("back from del: ", deleteRes);
  //         setDeleteInfo(deleteRes);

  //         if(deleteInfo === undefined){
  //           console.log("Waiting for delete promise...");
  //         } else {
  //           // Reset the data
  //             const info = await fetchCatListData(user.email);

  //             console.log("Top ifno: ", info);

  //             if(info.length === 0){
  //               setAlert(`You do not have any saved cats.`);
  //               setIsVisible(false);
  //             } else {
  //               setIsVisible(true);
  //               setAlert("");

  //               if(info == undefined) {
  //                 console.log("Waiting for new info...");
  //               } else {
  //                 console.log("NEW indo: ", info);

  //                 if(info){
  //                   setData(info);
  //                 } else {
  //                   setAlert("No cats saved in second doc.");
  //                 }
  //               }
  //             }
  //           }
                  
  //           //if there are no more cats, change the page
  //           if(data === null){
  //             setIsVisible(false);
  //           }
  //         }
  //       }
  //     //}
  //   }

  //   getNewData();
  // }, [deleteInfo])


  // See if to show cat list or sad cats 
  // true if there are cats saved
  // useEffect (() =>{
  //   if (alert === ""){
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // }, [alert])


  // function setToDeleteCat(catId){
  //   setDeleteInfo(true);
  //   setDesiredCatId(catId);
  //   setButtonPressed(!buttonPressed);
  // }
 

  return (
    <>
    <NavigationBar />
    <ContentContainer>
      <Space>.</Space>
      <TitleScreen>
        <Title>Art Shop</Title>
        <Form><SearchBar placeholder = "Search Artists..."></SearchBar></Form> 
      </TitleScreen>
      <PageInfo>
          <PageText>Welcome to the Art Shop!</PageText>
          <PageText>Here, you can see the available artsist that you can <Yellow>buy</Yellow> art from.</PageText>
      </PageInfo>
      <TextContent>
        {isOpen && (
          <PopupOverlay>
            <PopupContent>
              <CloseButton onClick={() => closePopup()}>&times;</CloseButton>
              <PopupTitle>Shopping Form</PopupTitle>
              <StyledForm>
                <FormGroup>
                  <Label>Desired Artist's Name:</Label>
                  <Input value = {artistName}/>
                </FormGroup>
                <FormGroup>
                  <Label>Desired Artist's Email:</Label>
                  <Input value = {artistName}/>
                </FormGroup>
                <FormGroup>
                  <Label>Message:</Label>
                  <TextArea value="Hello, I was interested in buying an art piece from you."/>
                </FormGroup>
                <SubmitButton>Submit</SubmitButton>
              </StyledForm>
            </PopupContent>
          </PopupOverlay>
        )}

        <SectionContainer>
          <AllArtCont>
              <ImageContainer>
                <Image src="Images/Profile1.jpg"></Image>
                <ArtText>Artist: Name 1</ArtText>
                <ArtText>Email: email 1</ArtText>
                <Button onClick={() => openPopup("Name 1", "email 1")}>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile2.jpg"></Image>
                <ArtText>Artist: Name 2</ArtText>
                <ArtText>Email: email 2</ArtText>
                <Button onClick={() => openPopup("Name 2", "email 2")}>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile3.jpg"></Image>
                <ArtText>Artist: Name 3</ArtText>
                <ArtText>Email: email 3</ArtText>
                <Button onClick={() => openPopup("Name 3", "email 3")}>Contact</Button>
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

const Yellow = styled.span`  color: #FFD725;`;

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





// Form Popup

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #29262C;
  padding: 30px;
  border-radius: 8px;
  position: relative;
  width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
`;

const PopupTitle = styled.h2`
  color: #FFD725;
  margin-bottom: 20px;
  font-size: 24px;
`;

const StyledForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  float: left;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  color: white;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #FFD725;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #CEAD1B;
  }
`;


export default ArtShop;