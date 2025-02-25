import Login from "@/pages/login"
import { styled } from 'styled-components'
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"



export default function LoggingIn() {
  return (
    <>
        <NavigationBar />
        <Login />
        <Footer />
    </>
  )
}
