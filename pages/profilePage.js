import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { useRouter } from 'next/router'
import { StateContext, useStateContext } from '@/context/StateContext'
import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
//import { ConnectWallet, ThirdwebProvider, useWallet, useAddress } from '@thirdweb-dev/react'


// Profile page of the user current signed in. If you are not signed in, you will be moved to the login page. 
// Will show the current user that is signed in and their info. They are able to sign out. 
// There are quick links to navigate the website

export default function Home() {
  
  const { user, setUser } = useStateContext()

  const router = useRouter()

  // const isConnected = Boolean(useAddress() != undefined);
  
  
  return (
    <>
    <NavigationBar />
        <ContentContainer>
          <Space>.</Space>
          <TitleScreen>
            <Title>Hello!</Title>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <PageText>I have not set up the forced log in, not entirely sure how to yet. 
                This page will only become accessable if someone logs in with their MetaMask.</PageText>
          </TitleScreen>
          <TextContent>
            <SectionContainer>
              <ProfileContainer>
                  <ProfileImage src="Images/PersonalProfilePicture.jpg"></ProfileImage>
                 <PageInfo>
                    <PageText>Welcome to your Profile Page!</PageText>
                    <PageText>Here, you can <Yellow>view your art</Yellow> and see completed and uncompleted <Yellow>contracts.</Yellow> </PageText>
                  </PageInfo>
              </ProfileContainer>
                <Subheading> <Yellow>Art you have posted: </Yellow> </Subheading>
                <SectionContainer>
                  <AllArtCont>
                      <ImageContainer>
                        <Image src="Images/art1.webp"></Image>
                        <ArtText>Title: Art1</ArtText>
                      </ImageContainer>
                      <ImageContainer>
                        <Image src="Images/art2.jpg"></Image>
                        <ArtText>Title: Art2</ArtText>
                      </ImageContainer>
                  </AllArtCont>
                </SectionContainer>
                <Subheading> <Yellow>Current Contracts</Yellow> </Subheading>
                  <AllArtCont>
                    <ImageContainer>
                      <ArtText>Art Trade</ArtText>
                      <ArtText>Currently With: Artist 6</ArtText>
                    </ImageContainer>
                    <ImageContainer>
                      <ArtText>Commision</ArtText>
                      <ArtText>Currently With: Artist 8</ArtText>
                    </ImageContainer>
                  </AllArtCont>
                <Subheading> <Yellow>Completed Contracts</Yellow> </Subheading>
                  <AllArtCont>
                    <ImageContainer>
                      <ArtText>Art Trade</ArtText>
                      <ArtText>Done with: Artist 1</ArtText>
                    </ImageContainer>
                    <ImageContainer>
                      <ArtText>Art Trade</ArtText>
                      <ArtText>Done with: Artist 2</ArtText>
                    </ImageContainer>
                    <ImageContainer>
                      <ArtText>Commision</ArtText>
                      <ArtText>Done with: Artist 3</ArtText>
                    </ImageContainer>
                  </AllArtCont>
              </SectionContainer>
            </TextContent>
        </ContentContainer>
      <Footer />
    </>
  )
};



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


const AllArtCont = styled.div`
  display: grid;
  justify-content: space-evenly;
  padding-top: 50px;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto; 
  gap: 5px;

  grid-auto-flow: row;
`;

const ProfileContainer = styled.div`
  padding: 10px;
  overflow: auto;
`;

const ImageContainer = styled.div`
  text-align: center;
  border-radius: 7px;
  // width: 320px;
  // height: 380px;
  overflow: auto;


  &:hover {
    //cursor: pointer;
  }
`;

const ProfileImage = styled.img`
  float: left;
  height: 275px;
  width: 275px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 15px;
`;

const Image = styled.img`
  height: 275px;
  width: 275px;
  border-radius: 5px;
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
  float: left;
  background-color: #120E14;
  padding-bottom: 2%; 
  padding-top: 8%;  
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





const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Left = styled.div`
  text-align: left;
`;

const Links = styled.div`
  font-size: 30px;
  margin-top: 25px;
`;

const Img = styled.img`
 width: 70%;
`;

const ButtonLinks = styled.div`
  display: felx;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  text-align: left;
`;

const Heading = styled.h1`
  font-size: 60px;
  text-align: left;
  padding-top: 20px;
`;


const Subheading = styled.h2`
  font-size: 30px;
  margin-top: 100px;
`;


// To connect wallet maybe? - Will look at later

// const StyledConnectWallet = styled(ConnectWallet)`
// display: flex;
// padding: ${SIZING.px12} 0;
// font-size: ${SIZING.px16};
// letter-spacing: -0.05rem;
// font-family: "Uncut Sans Bold";
// border-radius: ${SIZING.px96};
// background-color: ${COLORS.Black100};
// transition: 0.4s ease-in-out;

// &:hover{
// background-color: ${COLORS.StandardWhiteDefault};
// }
// `
// const StyledConnectedWallet = styled(ConnectWallet)`
// padding: ${SIZING.px8} ${SIZING.px24};
// border-radius: ${SIZING.px96};
// background-color: transparent;
// border: 1px solid ${COLORS.Black850};
// transition: 0.4s ease-in-out;

// &:hover{
// background-color: ${COLORS.Black875};
// }
// `