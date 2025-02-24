import React from 'react';
import Link  from 'next/link';
//import { IoMdHome } from 'react-icons/io'; // Importing a home icon from react-icons
// <IoMdHome />
import styled from 'styled-components';

const Logo = () => {
  return (
    <LogoInfo href="/">
      <LogoImage src="/PurrfectPals.png"></LogoImage>
      <Name>
        Purrfect Pals
      </Name>
    </LogoInfo>
  );
};

// Center both text and image!!
const LogoInfo = styled(Link)`
  justify-content: center;
  text-decoration: none;

  color: #25283D;
  &:hover{
    color: #43DFBD;
  }
`;


const Name = styled.div`
  color: #25283D;
  &:hover{
    color: #43DFBD;
  }
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;

`;


/*
const LogoImage = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;    
  height: 50px;     
  background-color: #007bff;    
  color: white;
  border-radius: 4px;     // Adjust for square or rounded corners
  text-decoration: none;
  
  svg {
    width: 24px;    // Adjust icon size as needed
    height: 24px;   // Adjust icon size as needed
  }

  &:hover {
    background-color: #0056b3;    // Adjust hover effect as needed
  }
`;
*/

export default Logo;
