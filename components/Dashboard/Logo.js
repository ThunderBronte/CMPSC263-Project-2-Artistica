import React from 'react';
import Link  from 'next/link';
import styled from 'styled-components';

//Logo for the website

const Logo = () => {
  return (
    <All>
      <LogoInfo href="/">
        <LogoImage src="/Images/Logo.png"></LogoImage>
        <Name>
          Artistica
        </Name>
      </LogoInfo>
    </All>
  );
};

const All = styled.div`
  width: 100px;
  height: 75px;
  text-align:center;
`;

const LogoInfo = styled(Link)`
  justify-content: center;
  text-decoration: none;
  display: inline; 

  color: #FFD725;
  &:hover{
  }
`;

const Name = styled.div`
  color: #FFD725;
  &:hover{
  }
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`;



export default Logo;
