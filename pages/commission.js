import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import CommissionContract from "@/backend/contracts/commisionContract"

//Home of the website. Will call the nav bar, content (the home page), and footer 

export default function Home() {
  return (
    <>
        <NavigationBar />
        <CommissionContract />
        <Footer />
    </>
  )
}
