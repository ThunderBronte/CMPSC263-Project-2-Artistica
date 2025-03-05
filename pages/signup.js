import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInDatabase, signUp} from '@/backend/Auth'
import Link from 'next/link'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const Signup = () => {

  const { user, setUser } = useStateContext();
  const [ currUser, setCurrUser ] = useState("uh");
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const router = useRouter()

  // Any alerts to dispaly to user 
  const [ alert, setAlert] = useState('');


  // let userContent = {
  //   "uid":"",
  //   "email":"",
  //   "emailVerified":"",
  //   "isAnonymous":"",

  // }

  

  

  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    console.log('so far so good...')
    const emailResponse = await isEmailInDatabase(email)
    console.log('email response', emailResponse)
    if(emailResponse.length == 0 ){
        return false;
    }

    return true;
}

  async function handleSignup(){
    // Validate the email
    const isValidEmail = await validateEmail()
    console.log('isValidEmail: ', isValidEmail)
    if(!isValidEmail){ 
      setAlert("Email is not valid.");
      return false; 
    }

    // Validate Password
    const passwordStatus = await validatePassword(getAuth(), password)
    if(!passwordStatus.isValid){
      const errMes = "Password is not valid. Please make sure it has the following: \n - One uppercase character \n - One lowercase character \n - One special character \n - One numeric character";
      setAlert(errMes);
      return false;
    }



    try{
      const userCred = await signUp(email, password);
      await setUser(userCred.user.email);
      console.log("It worled!!: ", userCred.user.email)
      router.push('/profilePage')
    }catch(err){
      console.log('Error Signing Up', err)
    }
  }



  return (
    <>
    <NavigationBar />
      <ContentContainer>
        <SignUp>
        <Section>
            <Header>Sign up</Header>
              <Alerts>{alert}</Alerts>
            <InputTitle>Email</InputTitle>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputTitle>Password</InputTitle>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <LogIn>Already have an account? <LogInSpan href="/login">Login!</LogInSpan></LogIn>

            <Button onClick={handleSignup}>Sign Up</Button>
      
        </Section>
        </SignUp>
      </ContentContainer>
    <Footer />
    </>
  )
};



const ContentContainer = styled.div`
  background-color: #f2f0f0;
  padding: 20px;  
`;

const SignUp = styled.div`
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

const Alerts = styled.p`
  color: red;
  margin: 10px; 
  text-align: center;
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
  margin-top: 20px;

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
    cursor: pointer;
  }
`;


const LogIn = styled.p`
  padding: 15px;
  text-align: center;

  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  margin-top: 20px;
  margin-left: 15px;

  display: flex;
  text-align: center;
  display: inline-block;
`;


const LogInSpan = styled(Link)`
  color: #1fb896;
  font-weight: bold;
  &:hover {
    color: #077678; 
    text-decoration: none;
  }
`;


export default Signup
