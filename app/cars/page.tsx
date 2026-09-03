import React from 'react'
import Navbar from '../components/homepage/Navbar'
import Footer from '../components/homepage/Footer'
import FleetHero from '../components/carspage/FleetHero'
import FleetPage from '../components/carspage/FleetPage'

const page = () => {
  return (
    <div>
        <Navbar />
        <FleetHero />
        <FleetPage />
        <Footer />
    </div>
  )
}

export default page