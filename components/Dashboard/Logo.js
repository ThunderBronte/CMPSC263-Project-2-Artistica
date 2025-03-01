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
  display: inline; 

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
`;


export default Logo;
