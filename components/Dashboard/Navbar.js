import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Logo from '@/components/Dashboard/Logo'
import { CgProfile } from "react-icons/cg";


// Has the different links to the different pages and a logo with the name of the website. Has the user's info if logged in, or else it says to "log in"



const NavigationBar = () => {
  
  const { user } = useStateContext()

  const [name, setName] = useState(null);

  
  // See what name to display in the top right corner
  useEffect(() => {
    if(!user){
      setName("Log in");
    }else{
      // Get name from email
      let userName = '';
      if(typeof user === 'object'){
        userName = user.email.split('@');
      } else if(typeof user === 'string') {
        userName = user.split('@');
      }
      
      setName(userName[0]+ "'s Profile");
    }
  }, [user]) 

  
// Need list in reverse order with the way I am displaying them. 
    return (
      <>
      <ContainerNavBar>
        <Navbar>
            <LogoItem><Logo></Logo></LogoItem>
            <ListItem><LinkRef href="/profilePage">{name}</LinkRef></ListItem>
            <ListItem><LinkRef href="/interactions">Interactions</LinkRef></ListItem>
            <ListItem><LinkRef href="/tradersDen">Trader's Den</LinkRef></ListItem>
            <ListItem><LinkRef href="/artShop">Art Shop</LinkRef></ListItem>
        </Navbar>
      </ContainerNavBar>
      </>
    );
};



const ContainerNavBar = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  background-color: #120E14;
  
  height: 75px;
`;

const Navbar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;


const LogoItem = styled.li`
  margin-top: 3px;
  display: inline;
  float: left;
`;

const ListItem = styled.li`
  font-size: 20px;
  margin-top: 2%;
  display: inline;
  float: right;
`;


const LinkRef = styled.a`
  display: block;

  padding: 30px;
  padding-top: 5px;
  padding-bottom: 7px;
  text-decoration: none;
  color: #FFD725;
  border: 1px solid #120E14;
  border-radius: 20px;

  &:hover{
    list-style-position: inside;
    border: 1px solid #120E14;
    background-color: #292430;
    border-radius: 20px;
  }
`;



// Deletes if not used!!
const Profile = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;   // Adjust the size as needed
  height: 50px;   // Adjust the size as needed
  background-color: #007bff;    // Adjust the background color as needed
  color: white;
  border-radius: 4px;     // Adjust for square or rounded corners
  text-decoration: none;
  
  svg {
    width: 24px;    // Adjust icon size as needed
    height: 24px;     // Adjust icon size as needed
  }

  &:hover {
    background-color: #0056b3;  // Adjust hover effect as needed
  }
`;



export default NavigationBar;
