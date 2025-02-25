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


  // CHANGE TO
  //  <Button variant="outline-primary">Primary</Button>
  // FOR THE LINKS!!
  // CHANGE THE PROFILE ONE TO LOOK DIFFERENT 
  

    return (
      <>
      <ContainerNavBar>
        <Navbar>
          <ListItem><Logo></Logo></ListItem>
          <ListItem href="/searchCat">Find Cats to Adopt</ListItem>
          <ListItem href="/catCart">Cat Cart: Saved Cats</ListItem>
          <ListItem href="/profilePage">{name}'s Profile</ListItem>
        </Navbar>
      </ContainerNavBar>
      </>
    );
  


};



const ContainerNavBar = styled.div`
  margin-left: 150px;
  margin-right: 150px;
  background-color: #FFFFFF;

`;

const Navbar = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: inline;  
  padding-left: 30px;
  color: #25283D;
  &:hover{
    color: #43DFBD;
  }
  
`;



export default NavigationBar;
