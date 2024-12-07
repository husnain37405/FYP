import React from 'react';
import AboutSection from '../components/About/AboutSection';
import ContactSection from '../components/Contact/ContactSection';
function About() {
  return (
    <>
      <div className="about-page" style={{
        position: 'relative',
        width: '100%',
        height: '400px',
      }}>
        {/* src="src/assets/images/hero-bg.jpg" */}
        <img src="src/assets/images/hero-bg.jpg" alt="Hero Image" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}/>
       
        <div className="about-pg-content" style={{
          position: 'absolute',
          top: 0,
          left: '13.5%', 
          width: '73%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontSize: '45px',
        //   color: '#031b4e', 
          fontFamily: 'Sora, sans-serif',
    fontWeight: 'normal',
    lineHeight: '60px',
    letterSpacing: '0px',
    // color: 'rgb(3, 27, 78)',
    color:'#fff',
    textTransform: 'none',
    fontStyle: 'normal',
        }}>
         About Us
        </div>
    
      </div>
      <AboutSection/>
      <ContactSection/>
    </>
  );
}

export default About;

