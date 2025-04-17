import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router';

//Main content of the page
// Displays basic information of the website, why the user should adopt (along with going to the page to search for cats), get a fun fact 
// (using an API) that changes everytime the page loads, and basic care of cats.
// there is a button that takes the user to the top of the page. 

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
      <Space>.</Space>
      <TitleScreen ref={focus}>
        <Title>Scroll Art</Title>
        <Form><SearchBar placeholder = "Search..."></SearchBar></Form> 
       </TitleScreen>

      <TextContent>
        <SectionContainer>
          <AllArtCont>
              <ImageContainer>
                <Image src="Images/art1.webp"></Image>
                <ArtText>Title: Art1 <br></br>Artist: Cover Name</ArtText>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/art2.jpg"></Image>
                <ArtText>Title: Art2 <br></br>Artist: Cover Name</ArtText>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/art3.jpg"></Image>
                <ArtText>Title: Art3 <br></br>Artist: Cover Name</ArtText>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/art4.jpg"></Image>
                <ArtText>Title: Art4 <br></br>Artist: Cover Name</ArtText>
              </ImageContainer>
              <ImageContainer>
                <Image src="Images/art5.jpg"></Image>
                <ArtText>Title: Art5 <br></br>Artist: Cover Name</ArtText>
              </ImageContainer>
          </AllArtCont>
        </SectionContainer>

        
        </TextContent>
        {/* <TopContainer><SectionButton onClick={() => goToTop()}>Back To Top</SectionButton></TopContainer> */}
    </ContentContainer> 
  ); 
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
  //border: 2px solid #29262C;

  
  &:hover {
    //cursor: pointer;

  }
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
  margin: 4%;
  padding: 0.5%;
  padding-left: 1%;
  padding-right: 1%;
  
  color: black;
  background-color: #FFD725; 
  border: 2px solid #FFD725;
  border-radius: 10px;

  &:hover{ 
    color: black;
    border-color: #D8B61D;
    background-color: #D8B61D;
    cursor: pointer;
  }
`;

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

const Subheading = styled.div`
  // margin = -10px;
// font-size: 60px;
  // // padding: 20px;
  // //text-align: left;
  // // float: left;
  // // display: inline;
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
  // background-color: #29262C;
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





/*    <SectionContainer>
            <TopContainer>
            </TopContainer>
            <BottomContainer>
              <SubContainer>
                <InnerContainer>
                  <Bold>Saves Animal Lives</Bold>
                  <Img src="saveLife.webp"></Img>
                </InnerContainer>
                <InnerContainer>
                  <Bold>Cost Effective</Bold>
                  <Img src="support.webp"></Img>
                </InnerContainer>
                <InnerContainer> 
                  <Bold>Support Shelters</Bold>
                  <Img src="cost.webp"></Img>
                </InnerContainer>
              </SubContainer>
            </BottomContainer>
        </SectionContainer> 
           <Subheading>Fun Cat Facts</Subheading>
            <Info>
                {data ? data.fact : "<p>Loading Cat Facts...</p>"}
            </Info>
          </SectionContainer>
        <SectionContainer>
          <AllContainer>
            <LeftContainer>
              <Subheading>Basics of Taking Care of a Cat</Subheading>
              <Img src="takeCare.jpeg"></Img>
            </LeftContainer>
            <RightContainer>
              <Info><Bold>Provide Fresh Water:</Bold> Always have clean water available for your cat to drink.</Info>
              <Info><Bold>Proper Food:</Bold> Make sure the food is age-appropriate and healthy for your cat.</Info>
              <Info><Bold>Litter Box:</Bold> Keep a clean litter box and scoop it daily. </Info>
              <Info><Bold>Routine Vet Checkups:</Bold> Take your cat for their annual check-ups.</Info>
            </RightContainer>
          </AllContainer>
         </SectionContainer> 
         */