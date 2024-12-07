import React from 'react'

import Hero from '../components/Hero/Hero'
import AboutSection from '../components/About/AboutSection'
import Stats from '../components/Stats/Stats'
import Services from '../components/Services/Services'
import Cards from '../components/Cards/Cards'
import ContactSection from '../components/Contact/ContactSection'
import CallToAction from '../components/CallToAction/CallToAction'
import BackToTop from '../components/BackToTop/BackToTop'
function Home() {
  return (
    <>
  
      <Hero />
      <AboutSection />
      <Stats />
      <Services />
      <CallToAction />
      <Cards />
      <ContactSection />
      <BackToTop />
    </>
  )
}

export default Home