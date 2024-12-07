import React, { useState, useEffect, useRef } from 'react';
import './BackToTop.css';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const progressCircleRef = useRef(null);
  
  useEffect(() => {
    const backToTopButton = document.getElementById('back-to-top');
    const progressCircle = progressCircleRef.current;
    const pathLength = progressCircle.getTotalLength();

    progressCircle.style.strokeDasharray = pathLength;
    progressCircle.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollPosition / windowHeight;
      const dashOffset = pathLength - (progress * pathLength);
      progressCircle.style.strokeDashoffset = dashOffset;

      if (scrollPosition > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      href="#"
      id="back-to-top"
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transform: visible ? 'translateY(-20px)' : 'translateY(0)',
      }}
      onClick={scrollToTop}
    >
      <svg className="svg-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle
          ref={progressCircleRef}
          cx="50"
          cy="50"
          r="45"
          stroke="#3368c6"
          strokeWidth="5"
          fill="none"
          strokeDasharray="282.743"
          strokeDashoffset="282.743"
        ></circle>
        <polyline
          points="35,60 50,45 65,60"
          stroke="#3368c6"
          strokeWidth="5"
          fill="none"
        ></polyline>
      </svg>
    </a>
  );
};

export default BackToTop;
