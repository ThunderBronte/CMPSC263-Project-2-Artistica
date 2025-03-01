import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Logo from '@/components/Dashboard/Logo'





const NavigationBar = () => {
  
  const { user } = useStateContext()

  const [name, setName] = useState(null);

  
  // See what name to display in the top right corner
  useEffect(() => {
    if(!user){
      setName("Guest");
    }else{
      setName(user);
    }
  }, [user]) 

  //<ListItem><Logo></Logo></ListItem>

    return (
      <>
      <ContainerNavBar>
        <Navbar>
        <Logo></Logo>
          <RightNav>
            <ListItem><LinkRef href="/searchCat">Find Cats to Adopt</LinkRef></ListItem>
            <ListItem><LinkRef href="/catCart">Cat Cart: Saved Cats</LinkRef></ListItem>
            <ListItem><LinkRef href="/profilePage">{name}'s Profile</LinkRef></ListItem>
          </RightNav>
        </Navbar>
      </ContainerNavBar>
      </>
    );
};



const ContainerNavBar = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  height: 75px;
  background-color: #FFFFFF;
`;

const Navbar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline;
  
`;

const RightNav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  float: right;
  text-align: center;
`;

const ListItem = styled.li`
  display: inline;
  
`;


const LinkRef = styled.a`
  padding: 30px;
  padding-top: 5px;
  padding-bottom: 7px;
  text-decoration: none;
  color: #25283D;
  &:hover{
    color: #43DFBD;
    color: #25283D;
    list-style-position: inside;
    border: 1px solid #25283D;
    border-radius: 20px;
  }
`;



export default NavigationBar;
