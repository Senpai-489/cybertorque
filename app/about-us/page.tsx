import React from 'react'
import Navbar from '@/app/components/homepage/Navbar'
import Footer from '../components/homepage/Footer'
import AboutHero from '../components/aboutuspage/AboutHero'
import OurStory from '../components/aboutuspage/OurStory'
import OurFounder from '../components/aboutuspage/OurFounder'
import OurPhilosophy from '../components/aboutuspage/OurPhilosophy'
import HowWeWork from '../components/aboutuspage/HowWeWork'
import FinalCTA from '../components/aboutuspage/FinalCTA'
const page = () => {
  return (
    <div><Navbar />
    <AboutHero />
    <OurStory />
    <OurPhilosophy />
    <HowWeWork />
    <OurFounder />
    <FinalCTA />
    <Footer />
    </div>
  )
}

export default page