import NavigationBar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import CommissionContract from "@/backend/contracts/commisionContract"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


//call the commissions page, send the artist info over
const Commission = () => {
  const router = useRouter();
  let artistName, artistAddress;
  
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    console.log("In use effect!")
    if (router.isReady) {
      artistName = router.query.artistName;
      artistAddress = router.query.artistAddress;

      setArtistInfo({ name: artistName, address: artistAddress });
    } else {
      setArtistInfo(null)
    }
  }, [router.isReady]);



  return (
    <>
      <NavigationBar />
        {artistInfo ? (
            <CommissionContract artistInfo={artistInfo} />
        ) : (
            <p>Loading artist info...</p>
        )}
      <Footer />
    </>
  )
}

export default Commission;
