import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          {new Date().getFullYear()} <br></br>
          Left Container Information
        </LeftContainer>
        <CenterContainer>
          Center Container information 
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </CenterContainer>
        <RightContainer>
          Right Container Information
          <br></br>
          Follow us on social media!
          <br></br>
          <SocialIcon href="#" aria-label="Facebook">FB icon</SocialIcon>
          <br></br>
          <SocialIcon href="#" aria-label="Instagram">IG icon</SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  background-color: #25283D;
  color: white;
  font-size: 16px;
`;

const FooterContainer = styled.div`
  font-family: "Comic sans";
  align-content: space-around;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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

const Link = styled.a`
  color: #43DFBD;
  &:hover {
    color:#8a8a8a;
  }

`;

// Will change this once I get icons instead 
const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  &:hover {
    color: #007bff;
  }
`;

export default Footer;
