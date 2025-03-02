import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"



const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()


  async function handleLogin(){
    // Check to see if the email is in use (in database). If not, ask for the user to go to "sign up". Else, log in
    const emailInUse = isEmailInUse(email);
    if(!emailInUse){
      setUser(login(email, password));
    } else {
      await login(email, password)
    }
  }


  return (
    <>
    <NavigationBar />
      <ContentContainer>
        <LogIn>
        <Section>
            <Header>Login</Header>
              <SignUp>Don't have an account? <SignUpSpan href="/Auth/signup">Sign up!</SignUpSpan></SignUp>
            <InputTitle>Email</InputTitle>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputTitle>Password</InputTitle>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <Button onClick={handleLogin}>Login</Button>
      
        </Section>
        </LogIn>
      </ContentContainer>
    <Footer />
    </>
  )
};



const ContentContainer = styled.div`
  background-color: #f2f0f0;
  padding: 20px;  
`;

const LogIn = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 10px;

  box-shadow: 0.5px 0.5px 3px 3px #DFDFDF;

  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
`;

const Header = styled.h1`
  font-size: 40px;
  text-align: center;
  padding-top: 50px;
`;

const Input = styled.input`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 5px;
`;

const InputTitle = styled.label`
  font-size: 17px;
  color: #666;
`;


const Button = styled.button`
  font-size: 25px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 40px;

  display: flex;
  text-align: center;
  display: inline-block;

  border-radius: 50px;

  color: white;
  background-color: #077678; 
  border: 2px solid #077678;

  &:hover{ 
    color: #077678;
    border-color: #077678;
    background-color: transparent;
  }
`;


const SignUp = styled.p`
  padding: 15px;
  text-align: center;

  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 5px;
  margin-left: 15px;

  display: flex;
  text-align: center;
  display: inline-block;
`;


const SignUpSpan = styled(Link)`
  color: #1fb896;
  font-weight: bold;
  &:hover {
    color: #077678; 
    text-decoration: none;
  }
`;


export default Login