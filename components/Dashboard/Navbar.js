import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link'
import { useStateContext } from '@/context/StateContext';
import Logo from '@/components/Dashboard/Logo'
import { ConnectWallet, ThirdwebProvider, useWallet, useAddress, useDisconnect } from '@thirdweb-dev/react'
import { useRouter } from 'next/router';


// Has the different links to the different pages and a logo with the name of the website. Has the user's info if logged in, 
// or else it says to "log in"



const NavigationBar = () => {
   
  const { user } = useStateContext()

  const [name, setName] = useState(null);

  const address = useAddress();
  const disconnect = useDisconnect();


  const router = useRouter();


  const logOut = () =>{
    disconnect();
    router.push('/');
  }
  
// Need list in reverse order with the way I am displaying them. 
    return (
      <>
      <ContainerNavBar>
        <Navbar>
            <LogoItem><Logo></Logo></LogoItem>           
              {address ? <>
                <ListItem><LinkRef onClick={logOut}> Log out </LinkRef></ListItem>
                <ListItem><LinkRef href="/profilePage"> Profile Page</LinkRef></ListItem>
              </>
              : <><ListItem><ButtonStyle btnTitle = "Log in"/></ListItem></>}
            
            <ListItem><LinkRef href="/interactions">Interactions</LinkRef></ListItem>
            {/* <ListItem><LinkRef href="/tradersDen">Trader's Den</LinkRef></ListItem> */}
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
    cursor: pointer;
  }
`;

const ButtonStyle = styled(ConnectWallet)`
  padding: 30px;
  padding-top: 5px;
  padding-bottom: 7px;
  font-size: 20px;
  color: #FFD725;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #120E14;
  border-radius: 20px;
  
  &:hover {
    list-style-position: inside;
    border: 1px solid #120E14;
    background-color: #292430;
    border-radius: 20px;
  }
`;



export default NavigationBar;
