import styled from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import {useStateContext } from '@/context/StateContext'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/router"
import { createDoc } from "@/backend/Database"
import artData from './api/Art.json';




const ArtTrade = () => {

  const router = useRouter();

  const homePage = () => {
    router.push('/');
  }

  const { user, setUser } = useStateContext()


  const [isOpen, setIsOpen] = useState(false);
  const [hasMessage, setHasMessage] = useState(null);

  const [artistName, setArtistName] = useState(null);
  const [artistEmail, setArtistEmail] = useState(null);

  const focus = useRef('');


  // for the search results
  const [query, setQuery] = useState(artData.users[0].artTrade);
  const [displayQuery, setDisplayQuery] = useState(query);




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
    setIsOpen(false);
    setHasMessage(true);
  };

  const closeMessage = () => {
    setHasMessage(false);
    setIsOpen(false);
  };


  // If the user is not logged in and they want to contact one of the artists, it will prompt them to sign in
  // Will work when I include the ability to sign in lol
  useEffect(() => {
    // wait for user information to load 
    if(user === undefined){ 
      console.log("Starting up! Waiting for user info...");
    } else {
      // if(!user){
      //   router.push('/login')
      // }
    }
  }, [openPopup]);


  // Handle the search option
  const handleSearch = (event) => {
    setDisplayQuery(query);
    const searchInput = event.target.value.toLowerCase();
    const results = query.filter(art =>
      art.name.toLowerCase().includes(searchInput)
    );
    setDisplayQuery(results);
  };


  return (

    <>
    <NavigationBar />
    <ContentContainer>
      <Space>.</Space>
      <TitleScreen>
        <Title>Trader's Den</Title>
        <Form><SearchBar placeholder = "Search Artists..." onChange={(e) => handleSearch(e)}></SearchBar></Form> 
      </TitleScreen>
      <PageInfo>
          <PageText>Welcome to the Trader's Den!</PageText>
          <PageText>Here, you can <Yellow>trade</Yellow> with artists.</PageText>
      </PageInfo>
      <TextContent>
      {isOpen && (
          <PopupOverlay>
            <PopupContent>
              <CloseButton onClick={() => closePopup()}>&times;</CloseButton>
              <PopupTitle>Art Trading Form</PopupTitle>
              <StyledForm>
                <FormGroup>
                  <Label>Desired Artist's Name:</Label>
                  <Input value = {artistName}/>
                </FormGroup>
                <FormGroup>
                  <Label>Desired Artist's Email:</Label>
                  <Input value = {artistEmail}/>
                </FormGroup>
                <FormGroup>
                  <Label>Message:</Label>
                  <TextArea value="Hello, I was interested in art trading with you."/>
                </FormGroup>
                <SubmitButton type="button" onClick={() => openMessage()}>Submit</SubmitButton>
              </StyledForm>
            </PopupContent>
          </PopupOverlay>
        )}
        {hasMessage && (
           <PopupOverlay>
           <PopupContent>
             <CloseButton onClick={() => closePopup()}>&times;</CloseButton>
             <PopupTitle>Success!</PopupTitle>
                <Label>Your message has successfully sent. The artist will be in touch with you shortly. </Label>
               <SubmitButton type="button" onClick={() => closeMessage()}>Close</SubmitButton>
           </PopupContent>
         </PopupOverlay>
        )}



<SectionContainer>
          <AllArtCont>
            {displayQuery && displayQuery != "" ? (
              <>
              {displayQuery.map((data) =>
                <ImageContainer>
                  <Image src={data.url}></Image>
                  <ArtText>Artist: {data.name}</ArtText>
                  <ArtText>Email: {data.email}</ArtText>
                  <Button onClick={() => openPopup(data.name, data.email)}>Contact</Button>
                </ImageContainer>
              )}
            </>
            ) : (
              <ImageContainer>
              </ImageContainer>
            )}
          </AllArtCont>
        </SectionContainer>


        {/* <SectionContainer>
          <AllArtCont>
              <ImageContainer>
                <Image src="Images/Profile4.png"></Image>
                <ArtText>Artist: Name 1</ArtText>
                <ArtText>Email: email 1</ArtText>
                <Button onClick={() => openPopup("Name 1", "email 1")}>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile5.png"></Image>
                <ArtText>Artist: Name 2</ArtText>
                <ArtText>Email: email 2</ArtText>
                <Button onClick={() => openPopup("Name 2", "email 2")}>Contact</Button>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/Profile6.jpg"></Image>
                <ArtText>Artist: Name 3</ArtText>
                <ArtText>Email: email 3</ArtText>
                <Button onClick={() => openPopup("Name 3", "email 3")}>Contact</Button>
              </ImageContainer>
          </AllArtCont>
        </SectionContainer> */}

        
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
export default ArtTrade;