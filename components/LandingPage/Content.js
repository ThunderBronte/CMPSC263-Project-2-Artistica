import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router';

const Content = ({text}) => {

  const router = useRouter();

  const { user, setUser } = useStateContext();

  const [ data, setData] = useState(null);


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



  return (
    <ContentContainer>
      <TitleScreen>
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
          <TotalContainer>
            <LeftContainer>
              <Subheading>Adopt Don't Shop!</Subheading>
              <SectionButton onClick={() => catSearch()}>Search Cats!</SectionButton>
            </LeftContainer>
            <RightContainer>
              <Info>Here are reasons why you should adopt rather than shop for cats:</Info>
              <listItem>- Saving Lives: Shelters are overwhelmed and adopting can help save those cats. </listItem>
              <listItem>- Cost Effective: It is cheaper to adopt a cat rather than buy.</listItem>
              <listItem>- Support Shelter: Most shelters are non-profit so adotping from them helps their costs.</listItem>
            </RightContainer>
          </TotalContainer>
        </SectionContainer>
        <SectionContainer>
          <Subheading>Fun Cat Facts</Subheading>
            <Info>
                {data ? data.fact : "<p>Loading Cat Facts...</p>"}
            </Info>
          </SectionContainer>
        <SectionContainer>
          <Subheading>Basics of Taking Care of a Cat</Subheading>
            <Info>Provide Fresh Water: Always have clean water available for your cat to drink.</Info>
            <Info>Proper Food: Make sure the food is age-appropriate and healthy for your cat.</Info>
            <Info>Litter Box: Keep a clean litter box and scoop it daily. </Info>
            <Info>Routine Vet Checkups: Take your cat for their annual check-ups.</Info>
         </SectionContainer>
        </TextContent>
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
  margin: 50px;  
  margin-left: 10%;
  margin-right: 10%;
  
  //background-color: red;
`;

const Subheading =styled.h2`
  font-size: 50px;
  padding: 20px;

`;

const Info = styled.p`
  font-size: 25px;
  padding-bottom: 30px;
  margin-left: 200px;
  margin-right: 200px;
  
`;

const BoldWords = styled.span`
  color: #077678;
`;

const UnorderedList = styled.ul`
  font-size: 25px;
  padding-bottom: 10px;
  margin-left: 200px;
  margin-right: 200px;
`;

const listItem = styled.li`
  
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const LeftContainer = styled.div`
  text-align: center;
`;

const RightContainer = styled.div`
  text-align: left;
`;




export default Content;
