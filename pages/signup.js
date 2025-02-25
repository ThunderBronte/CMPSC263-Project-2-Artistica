import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInUse, register} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"



const Signup = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    console.log('so far so good...')
    const emailResponse = await isEmailInUse(email)
    console.log('email response', emailResponse)
    if(emailResponse.length == 0 ){
        return false;
    }

    return true;
}

  async function handleSignup(){
    const isValidEmail = await validateEmail()
    // console.log('isValidEmail', isValidEmail)
    // if(!isValidEmail){ return; }
    
    try{
        await register(email, password, setUser)
        router.push('/dashboard')
    }catch(err){
        console.log('Error Signing Up', err)
    }
  }


  function logIn(){
    router.push('/login')
  }



  return (
    <>
   <Page>
      <ContentContainer>
        <Section>
            <Header>Signup</Header>
            <SignIn>
              Already have an account?
              <SignUpButton onClick={() => logIn()}>Log In!</SignUpButton>
            </SignIn>
          <InputTitle>Email</InputTitle>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <InputTitle>Password</InputTitle>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

          <Button onClick={handleSignup}>Signup</Button>

        </Section>
      </ContentContainer>
    </Page>
    </>
  )
}

const Page = styled.div`
background-color: #DFDFDF;
padding: 20px;
padding-left: 10%;
padding-right: 10%;
`;

const ContentContainer = styled.div`
background-color: white;
padding: 20px;
border-radius: 20px;
color: #25283D;
`;


const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 75px;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 25px;
`;


const Input = styled.input`
  font-size: 16px;

`;

const InputTitle = styled.label`
  font-size: 14px;
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

const UserAgreementText = styled.p`
  font-size: 12px;
`;

const UserAgreementSpan = styled(Link)` 
  color: #007bff;

`;


export default Signup