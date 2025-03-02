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
            <Header>Login to your Account</Header>
            <SignIn>
              Don't have an account?
              <SignUp href="/Auth/signup">Sign up!</SignUp>
            </SignIn>
            <InputTitle>Email</InputTitle>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputTitle>Password</InputTitle>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

            <Button onClick={handleLogin}>Login</Button>
      
        </Section>
        </LogIn>
      </ContentContainer>
    <Footer />
    </>
  )
};



const ContentContainer = styled.div`
background-color: #DFDFDF;
padding: 20px;
color: #25283D;
`;

const LogIn = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 20px;

  margin: 100px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 40px;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 25px;
`;

const Input = styled.input`
  font-size: 16px;

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 14px;
  color: #666;
`;


const Button = styled.button`
  font-size: 25px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  margin: 5px;
  margin-left: 15px;

  display: flex;
  text-align: center;
  display: inline-block;

  color: #25283D;
  &:hover{ 
    background-color: #25283D; 
    color: #43DFBD;
  }

  border-color: #25283D;
  border-radius: 50px;
  border-style: solid;
  background-color: transparent;
`;

const SignIn = styled.div`
  padding: 15px;
  text-align: center;
`;

const SignUp = styled(Link)`
  font-size: 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin: 5px;
  margin-left: 15px;

  display: flex;
  text-align: center;
  display: inline-block;

  color: #1fb896;
  &:hover{ 
    background-color: #077678; 
    color: white;
  }

  // border-color: #25283D;
  // border-radius: 50px;
  // border-style: solid;
  // background-color: transparent;
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login