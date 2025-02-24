import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { StateContext, useStateContext } from '@/context/StateContext'

const Content = ({text}) => {

  const { user, setUser } = useStateContext();

  const [ data, setData] = useState(null);

  function catSearch(){
    location.href = '/searchCat'
  }

  /*
  async function getAPI(){
    const url = 'https://cat-fact.herokuapp.com';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '52ac2fbb50mshfbad3182a76b861p11d3c2jsnee523910cfd8',
        'x-rapidapi-host': 'random-cat-fact.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  } */

  
  useEffect(()=> {
    const fetchCatData = async () => {
      const res = await fetch('https://cat-fact.herokuapp.com/facts');
      const factData = await res.json();
      setData(factData);
    };
  
    fetchCatData();

  }, [user]) 


  /*
                {data.map(fact => (
                  <p>fact.</p>
                ))}
                  */

  // function await getCatFactsAPI(){
    
  // }


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
                API 
                

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
  
  padding-left: 200px;
  padding-right: 200px;
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
  &:hover{ background-color: #25283D; }
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
