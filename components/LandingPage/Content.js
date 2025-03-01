import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router';

const Content = ({text}) => {

  const router = useRouter();

  const { user, setUser } = useStateContext();

  const [ data, setData] = useState(null);

  // Added to make sure the loading of data is done before displaying it (I have having issues and this worked)
  const [loading, setLoading] = useState(true);



  const catSearch = () =>{
    router.push('/searchCat');
  }  
 

  // WARNING!!! Will fail if you menually reload the page. Not sure why :(
  useEffect(()=> {
    const fetchCatData = async () => {
      setLoading(true);
      try {
        // Fetch data from the /facts endpoint
        const res = await fetch('https://cat-fact.herokuapp.com/facts');
        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const factData = await res.json();

        // Get a random fact, not all of them 
        const randomFact = factData[Math.floor(Math.random() * factData.length)]

        // Handle the response and set the data
        setData(randomFact);
      } catch (error) {
        console.error('Error fetching cat facts:', error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCatData();
  }, []) 


  if(loading){
    return <p>Loading Cat Facts...</p>;
  }


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
                <Info>Information</Info>
            </SectionContainer>
            <SectionContainer>
              <Subheading>Adopt Don't Shop!</Subheading>
                <Info>Info</Info>
                <SectionButton onClick={() => catSearch()}>Search Cats!</SectionButton>
            </SectionContainer>
            <SectionContainer>
              <Subheading>Fun Cat Facts</Subheading>
                <Info>
                    <p>{data.text}</p>
                  
                </Info>
              </SectionContainer>
            <SectionContainer>
              <Subheading>Basics of Taking Care of a Cat</Subheading>
                <Info>Basics</Info>
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
  
  color: #077678;
  border-color: #077678;
  border-radius: 50px;
  &:hover{ 
    color: white;
    background-color: #077678; 
  }

  
  border-style: solid;
  background-color: transparent;
`;

const TextContent = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;

const SectionContainer = styled.div`

`;

const Subheading =styled.h2`
  font-size: 50px;
  padding: 20px;

`;

const Info = styled.p`
  font-size: 25px;
  padding-bottom: 30px;
`;



export default Content;
