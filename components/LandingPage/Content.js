import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router';
import { ListGroup } from 'react-bootstrap';

const Content = ({text}) => {

  const router = useRouter();

  const { user, setUser } = useStateContext();

  const [ data, setData] = useState(null);

  const focus = useRef('');


  const catSearch = () =>{
    router.push('/searchCat');
  }  
 

  useEffect(()=> {
    const fetchCatData = async () => {
      try {
        // Fetch data from the /facts endpoint
        const res = await fetch('https://catfact.ninja/fact');

         // Handle if the response is not okay
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const factData = await res.json();

        // Set the data
        setData(factData);
      } catch (error) {
        console.error('Error fetching cat facts:', error);
        setData(null);
      } 
    };
  
    fetchCatData();
  }, []) 


  function goToTop(){
    if(focus.current){
      focus.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }



  return (
    <ContentContainer>
      <TitleScreen ref={focus}>
          <BackImg src="ContentImg.png"></BackImg>
          <TitleWords>Adopt a cat today! <br></br>
            <Button onClick={() => catSearch()}>Find a cat! </Button>
          </TitleWords>
      </TitleScreen>
      <TextContent>
        <SectionContainer>
          <Subheading> About Us </Subheading>
            <Info>Our mission is simple: to find loving homes for cats in need and provide a platform where these amazing animals can find their forever families. We are a passionate community of animal lovers, rescue groups, and dedicated volunteers, all working together to ensure that every cat—whether a playful kitten or a wise senior—has the opportunity to live a happy, healthy life.</Info>
         </SectionContainer>
        <SectionContainer>
            <TopContainer>
              <Subheading>Why Adopt?</Subheading>
              <SectionButton onClick={() => catSearch()}>Search Cats!</SectionButton>
            </TopContainer>
            <BottomContainer>
              <SubContainer>
                <InnerContainer>
                  <Bold>Saves Animal Lives</Bold>
                  <Img src="catImages/saveLife.webp"></Img>
                </InnerContainer>
                <InnerContainer>
                  <Bold>Cost Effective</Bold>
                  <Img src="/catImages/support.webp"></Img>
                </InnerContainer>
                <InnerContainer> 
                  <Bold>Support Shelters</Bold>
                  <Img src="catImages/cost.webp"></Img>
                </InnerContainer>
              </SubContainer>
            </BottomContainer>
        </SectionContainer>
        <SectionContainer>
          <Subheading>Fun Cat Facts</Subheading>
            <Info>
                {data ? data.fact : "<p>Loading Cat Facts...</p>"}
            </Info>
          </SectionContainer>
        <SectionContainer>
          <AllContainer>
            <LeftContainer>
              <Subheading>Basics of Taking Care of a Cat</Subheading>
              <Img src="/catImages/takeCare.jpeg"></Img>
            </LeftContainer>
            <RightContainer>
              <Info><Bold>Provide Fresh Water:</Bold> Always have clean water available for your cat to drink.</Info>
              <Info><Bold>Proper Food:</Bold> Make sure the food is age-appropriate and healthy for your cat.</Info>
              <Info><Bold>Litter Box:</Bold> Keep a clean litter box and scoop it daily. </Info>
              <Info><Bold>Routine Vet Checkups:</Bold> Take your cat for their annual check-ups.</Info>
            </RightContainer>
          </AllContainer>
         </SectionContainer>
        </TextContent>
        <TopContainer><SectionButton onClick={() => goToTop()}>Go To Top</SectionButton></TopContainer>
    </ContentContainer> 
  ); 
};


const ContentContainer = styled.div`
  background-color: white;
  color: #25283D;
`;

const TitleScreen = styled.div`
  position: relative;
  text-align: center;
  color: white;
`;

const BackImg = styled.img`
  width: 100%;
  padding: 0px;
`;

const TitleWords = styled.h1`
  font-size: 70px;
  position: absolute;
  top: 10%;
  left: 5%;
`;

const Button = styled.button`
  font-size: 30px;
  margin: 20px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  left: 0%; 
  
  color: White;
  &:hover{ 
    background-color: #077678;
    cursor: pointer;
  }
  border-color: white;
  border-radius: 50px;
  border-style: solid;
  background-color: transparent;
`;

const SectionButton = styled.button`
  font-size: 30px;
  margin: 20px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  
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

const TextContent = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;

const SectionContainer = styled.div`
  margin: 12%;  
  margin-left: 10%;
  margin-right: 10%;
`;

const Subheading =styled.h2`
  font-size: 60px;
  padding: 20px;
`;

const Info = styled.p`
  font-size: 27px;
  padding: 30px;
  padding-left: 15%;
  padding-right: 15%;
`;

const Bold = styled.span`
  color: #069ea1;
  font-weight: bold;
  font-size: 30px;
`;

const Img = styled.img`
  width: 90%;
  height: 80%;
  border-radius: 20px;
  margin-top: 10px;
`;

const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 50px;
`;

const TopContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const BottomContainer = styled.div`
  text-align: center;
`;

const InnerContainer = styled.div`
  text-align: center;
`;

const AllContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`;

const LeftContainer = styled.div`
  text-align: center;
`;

const RightContainer = styled.div`
  text-align: left;
  padding-top: 60px;
`;


export default Content;
