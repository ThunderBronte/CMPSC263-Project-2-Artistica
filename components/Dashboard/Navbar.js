import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Logo from '@/components/Dashboard/Logo'
import { CgProfile } from "react-icons/cg";


// <Profile href="/profilePage"><CgProfile /></Profile>



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

  //<ListItem><Logo></Logo></ListItem>

    return (
      <>
      <ContainerNavBar>
        <Navbar>
            <LogoItem><Logo></Logo></LogoItem>
            <ListItem><LinkRef href="/profilePage">{name}</LinkRef></ListItem>
            <ListItem><LinkRef href="/catCart">Cat Cart: Saved Cats</LinkRef></ListItem>
            <ListItem><LinkRef href="/searchCat">Find Cats to Adopt</LinkRef></ListItem>
        </Navbar>
      </ContainerNavBar>
      </>
    );
};



const ContainerNavBar = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  
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
  margin-top: 20px;
  margin-left: 5px;
  display: inline;
  float: right;
`;


const LinkRef = styled.a`
  display: block;

  padding: 30px;
  padding-top: 5px;
  padding-bottom: 7px;
  text-decoration: none;
  color: #077678;
  border: 1px solid white;

  &:hover{
    color: #25283D;
    list-style-position: inside;
    border: 1px solid #25283D;
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
