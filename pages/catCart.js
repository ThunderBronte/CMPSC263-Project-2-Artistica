import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'
import Footer from "@/components/LandingPage/Footer"


const CatCart = () => {

  const { user } = useStateContext()  

  const router = useRouter()


  /*useEffect(() => {
    if(!user){
      router.push('/')
    }else{

    }
  }, user) */




  return (
    <>
        <Navbar/>
        <Section>
       <TopHeader>
        Dashboard

        
        <ButtonLink href="/auth/signup">Sign Up</ButtonLink>
        <ButtonLink href="/auth/login">Login</ButtonLink>
      </TopHeader> 


    </Section>
        <Footer />
    </>
  )
}


//STYLED COMPONENTS
const Section = styled.section`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
`

const ButtonLink = styled(Link)`

`;


const TopHeader = styled.h1`
font-size: 26px;
display: flex;

`



export default CatCart