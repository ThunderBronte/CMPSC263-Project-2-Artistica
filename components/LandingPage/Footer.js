import React from 'react';
import styled from 'styled-components';
import { CiInstagram } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";


//Basic information for the footer.

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          Contact Us! <br></br>
          Phone Number: 123-456-7890 <br></br>
          Email: Artistica@gmail.com
        </LeftContainer>
        <CenterContainer>
            Our legal infomration <br></br>
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </CenterContainer>
        <RightContainer>
          Find us in other places.
          <br></br>
          Follow us on social media!
          <br></br><br></br>
          <SocialIcon href="#"><CiInstagram /></SocialIcon>
          <SocialIcon href="#"><FaFacebookF /></SocialIcon>
        </RightContainer>
        <BottomContainer>
          Website icon 
          @{new Date().getFullYear()} Artistica.com
        </BottomContainer>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  background-color: #29262C;
  color: white;
  font-size: 16px;
  padding: 30px;
`;


// Need to make the grid flexible 
const FooterContainer = styled.div`
  font-family: "Comic sans";

  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: auto 50px;
  column-gap: 10px;
  row-gap: 15px;

  justify-items: center;
  align-items: center; 
  justify-content: center;
  flex-wrap: wrap;
  
`;

const LeftContainer = styled.div`
  text-align: center;
`;

const CenterContainer = styled.div`
  text-align: center;
`;

const RightContainer = styled.div`
  text-align: center;
`;

const BottomContainer = styled.div`
  text-align: center;
`;

const Link = styled.a`
  color: #FFD725;
  &:hover {
    color:#8a8a8a;
  }

`;

// Will change this once I get icons instead 
const SocialIcon = styled.a`
  color: #FFD725;
  text-decoration: none;
  font-size: 1.5rem;
  padding: 5px;

  color: #FFD725
  &:hover {
    color: #8a8a8a;
  }
`;

export default Footer;
