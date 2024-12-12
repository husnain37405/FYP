import React from 'react';
import './Hero.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Hero = () => {
  return (
    <>
 
 {/* <section className="hero">
 <div className="socialMedia"> 
     <ul>
     <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
     <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
     <li><a href="#"><i className="fab fa-instagram"></i></a></li>
     </ul>
  </div>
    <img src="src/assets/images/hnd1.jpg" alt="Hero Image"/>
    <div className="hero-content-wrapper">
        <span className="hero-label">Support Our Mission</span>
        <div className="hero-content">
            <h2>Committed to transforming lives through unwavering compassion and support</h2>
            <p>Join us in making a difference in people's lives through compassion and support <br/>lives through compassion and support.</p>

            <div className="hero-content-link">
                <a href="#">Get Involved</a>
            </div>
        </div>
    </div>


</section> */}
<section className="hero">
  <img src="src/assets/images/hnd1.jpg" alt="Hero Image" />
  <div className="hero-content-wrapper">
    <span className="hero-label">Support Our Mission</span>
    <div className="hero-content">
      <h2>Committed to transforming lives through unwavering compassion and support</h2>
      <p>Join us in making a difference in people's lives through compassion and support <br />lives through compassion and support.</p>
      <div className="hero-content-link">
        <a href="#">Get Involved</a>
      </div>
    </div>
    {/* Social Media Icons moved here */}
    <div className="socialMedia">
      <ul>
        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  </div>
</section>

</>
  );
};

export default Hero;
