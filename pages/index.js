import Content from "@/components/LandingPage/Content"
import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"

//Home of the website. Will call the nav bar, content (the home page), and footer 

export default function Home() {
  return (
    <>
        <NavigationBar />
        <Content />
        <Footer />
    </>
  )
}
