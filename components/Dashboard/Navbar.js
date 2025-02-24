import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import Logo from '@/components/Dashboard/Logo'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';




const NavigationBar = () => {
  
  const { user } = useStateContext()

  let name = "";

  
  // See what name to display in the top right corner
  useEffect(() => {
    if(!user){
      name = "guest";
    }else{
      name = user;
    }
  }, user) 


  

    return (
      <>
      <ContainerNavBar>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Nav>
              <ListItem>
                <Logo></Logo>
              </ListItem>
            </Nav>
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link href="/searchCat"><ListItem>Find Cats to Adopt</ListItem></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/catCart"><ListItem>Cat Cart: Saved Cats</ListItem></Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/profilePage"><ListItem>Hello {name}!</ListItem></Nav.Link>
              </Nav.Item>
            </Nav>
            </Container>
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

const ListItem = styled.div`
  padding-left: 30px;
  color: #25283D;
  &:hover{
    color: #43DFBD;
  }
  
`;



export default NavigationBar;
