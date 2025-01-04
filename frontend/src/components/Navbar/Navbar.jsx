import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.currentRole);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenuOnLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="navbar-container">
        <div className="header-content">
          <div className="navbar-left">
            <img
              src={scrolled ? 'src/assets/images/logo.png' : 'src/assets/images/logo3.png'}
              alt="Website Logo"
              className={scrolled ? 'logo' : 'logo3'}
            />
          </div>


          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/"
                 onClick={closeMenuOnLinkClick}
                 className={({ isActive }) => (isActive ? 'active-link' : '')}
                 >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" 
                onClick={closeMenuOnLinkClick}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" 
                onClick={closeMenuOnLinkClick}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" 
                onClick={closeMenuOnLinkClick}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="navbar-right">
            
          <button className="menu-toggle-btn" onClick={toggleMenu}>
            ☰
          </button>
            {token && role === 'Donor' ? (
              <Link to="/donor-dashboard">
                <button className="dashboard-btn">Dashboard</button>
              </Link>
            ) : (
              <Link to="/donor-login">
                <button className="donate-btn"></button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
