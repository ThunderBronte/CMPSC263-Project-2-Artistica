import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { login, isEmailInDatabase } from '@/backend/Auth'
import Link from 'next/link'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import { getAuth, validatePassword, signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  // Any alerts to dispaly to user 
  const [ alert, setAlert] = useState(null);

  const router = useRouter()

  // Validating email
  async function validateEmail(){
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(email) == false ){
        return false;
    }
    console.log('so far so good...')
    // const emailResponse = await isEmailInDatabase(email)
    // console.log('email response', emailResponse)
    // if(emailResponse.length == 0 ){
    //     return false;
    // }

    return true;
  }


  async function handleLogin(){
    // Validate email 
    const isValidEmail = await validateEmail()
    if(!isValidEmail){
      setAlert("Email is not valid");
      return false;
    }

    try{
      // Check to see if the email is in auth database. If not, ask for the user to go to "sign up". Else, log in
      // Separate from validateEmail so I can write another error message.
      const emailInDatabase = await isEmailInDatabase(email);
      if(emailInDatabase <= 0){
        setAlert("Email is does not exist. Please sign up.");
      } else {
        console.log("Logging user in!");
        const loginStatus = await login(email, password);
        await setUser(loginStatus.user.email);
        router.push('/profilePage');
      } 
    } catch(error){
      handleAuthError(error.code);
      console.log("Error logging in: "+ error);
    }
  };


  // Handle errors I did not get
  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/wrong-password":
        setAlert("Incorrect password. Please try again.");
        break;
      case "auth/user-not-found":
        setAlert("User not found. Please check your email or sign up.");
        break;
      case "auth/invalid-email":
        setAlert("Invalid email format.");
        break;
      default:
        setAlert("An error occurred. Please try again later.");
        break;
    }
  };


  return (
    <>
    <NavigationBar />
      <ContentContainer>
        <LogIn>
        <Section>
            <Header>Login</Header>
              <Alerts value="">{alert}</Alerts>
            <InputTitle>Email</InputTitle>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputTitle>Password</InputTitle>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <SignUp>Don't have an account? <SignUpSpan href="/signup">Sign up!</SignUpSpan></SignUp>

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

const Alerts = styled.p`
  color: red;
  margin: 10px; 
  text-align: left;
  white-space: pre-line;
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


const SignUp = styled.p`
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


const SignUpSpan = styled(Link)`
  color: #1fb896;
  font-weight: bold;
  &:hover {
    color: #077678; 
    text-decoration: none;
  }
`;


export default Login