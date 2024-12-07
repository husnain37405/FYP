import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.subheading}>Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          style={hover ? { ...styles.homeButton, ...styles.homeButtonHover } : styles.homeButton}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: " #f0f7fd",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    color: '#333',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(15px)', 
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)', 
    maxWidth: '400px',
    width: '100%',
    animation: 'fadeIn 1s ease-out',
  },
  heading: {
    fontSize: '80px',
    fontWeight: '700',
    color: '#031b4e', 
    margin: 0,
    letterSpacing: '5px',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    animation: 'scaleUp 1s ease-out',
  },
  subheading: {
    fontSize: '18px',
    color: '#5c6b73', 
    margin: '20px 0',
    fontWeight: '400',
  },
  homeButton: {
    display: 'inline-block',
    fontSize: '16px',
    padding: '12px 24px',
    color: '#fff',
    backgroundColor: '#031b4e', 
    textDecoration: 'none',
    borderRadius: '30px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
    transition: 'all 0.3s ease',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: '20px',
  },
  homeButtonHover: {
    backgroundColor:" rgb(51, 104, 198)",
  }
};

// Animation Styles
const animationStyles = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleUp {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

// Injecting the animation styles into the head of the document
const StyleInjector = () => {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(animationStyles, styleSheet.cssRules.length);
  return null;
};

export const App = () => {
  return (
    <>
      <StyleInjector />
      <NotFound />
    </>
  );
};

export default NotFound;
