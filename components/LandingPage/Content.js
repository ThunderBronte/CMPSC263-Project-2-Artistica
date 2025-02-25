import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { StateContext, useStateContext } from '@/context/StateContext'

const Content = ({text}) => {

  const { user, setUser } = useStateContext();

  const [ data, setData] = useState(null);

  // Create mount to make sure the component runs after we get the API data
  const [isMounted, setIsMounted] = useState(false); 

  function catSearch(){
    location.href = '/searchCat'
  }


  // WARNING!!! Will fail if you menually reload the page. Not sure why :(
  useEffect(()=> {
    const fetchCatData = async () => {
      try {
        // Fetch data from the /facts endpoint
        const res = await fetch('https://cat-fact.herokuapp.com/facts');
        const factData = await res.json();

        const randomFact = factData[Math.floor(Math.random() * factData.length)]

        // Handle the response and set the data
        setData(randomFact);
      } catch (error) {
        console.error('Error fetching cat facts:', error);
      }
    };
  
    fetchCatData();
    setIsMounted(true);

  }, []) 


  


  return (
    <MainPage>
        <ContentContainer>
          <TitleScreen>
              <BackImg src="backgroundImage.JPEG"></BackImg>
              <TitleWords>Adopt a cat today! <br></br>
                <Button onClick={() => catSearch()}>Find a cat! </Button>
              </TitleWords>
          </TitleScreen>
          <TextContent>
            <Subheading> About Us </Subheading>
              <Info>Information</Info>
            <Subheading>Adopt Don't Shop!</Subheading>
              <Info>Info</Info>
            <Subheading>Fun Cat Facts</Subheading>
              <Info>
                {data && isMounted ? (
                  <div>
                    <p>{data.text}</p>
                  </div>
                ) : (
                  <p>Loading Cat Facts...</p>
                )}
                
              </Info>
            <Subheading>Basics of Taking Care of a Cat</Subheading>
              <Info>Basics</Info>
           </TextContent>
        </ContentContainer>
      </MainPage>
  );
};

const MainPage = styled.div`
  background-color: #DFDFDF;
  padding: 20px;
  padding-bottom: 0;
  
  padding-left: 10%;
  padding-right: 10%;
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 20px;
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
  border-radius: 20px;
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
  left: -5%;
  
  color: White;
  &:hover{ 
    background-color: #25283D; 
    color: #43DFBD;
  }
  border-color: white;
  border-radius: 50px;
  border-style: solid;
  background-color: transparent;
`;


const TextContent = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;

const Subheading =styled.h2`
  font-size: 30px;
  padding: 20px;

`;

const Info = styled.p`
  padding-bottom: 30px;
`;



export default Content;
