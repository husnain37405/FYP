import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';

const AboutSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about");
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const imageContainer = document.getElementById('imageContainer');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imageContainer.classList.add('animate');
          observer.unobserve(imageContainer);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(imageContainer);
  }, []);

  return (
    <section className="about-us">
      <div className="about-wrapper">
        <div className="about-content">
          <div className="about-header">
            <span className="about-label">About Us</span>
            {/* <div className="about-heading">Dedicated to Positive Impact</div> */}
            <div className="about-heading">Turning Compassion into Action</div>
            <p>At Nowshera Foundation, we revolutionize welfare services to meet diverse community needs. Our
              innovative solutions streamline operations for precision and efficiency, maximizing care. Our
              mission is to exceed expectations with tailored, seamless solutions.</p>
          </div>
          <div className="about-points">
            <div className="point point-border">
              <span className="point-span">01.</span>
              {/* <h2>Comprehensive Welfare Documentation</h2> */}
              <h2>Welfare Assistance</h2>
            </div>
            <div className="point point-border">
              <span className="point-span">02.</span>
              {/* <h2>Efficient, Automated Processes</h2> */}
              <h2>Simplified Assistance</h2>
            </div>
            <div className="point">
              <span className="point-span">03.</span>
              {/* <h2>Reliable Support and Guidance</h2> */}
              <h2>Reliable Support</h2>
            </div>
          </div>

          <button className="learn-more" onClick={handleClick}>

            <Link to={'/about'} >

              Discover More

            </Link>

          </button>
        </div>
        <div className="image-container" id="imageContainer">
          <img src="src/assets/images/back-about.jpg" alt="Back Image" className="back-image" />
          <img src="src/assets/images/front-about.webp" alt="Front Image" className="front-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
