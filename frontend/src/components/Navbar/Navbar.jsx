// import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './Navbar.css';

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const token = useSelector((state) => state.auth.token);
//   const role = useSelector((state) => state.auth.currentRole);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPoint = window.innerHeight / 2;
//       if (window.scrollY > scrollPoint) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
//       <div className="navbar-container">
//         <div className="header-content">
//           <div className="navbar-left">
//             {scrolled ? (
//               <img
//                 src="src/assets/images/logo.png"
//                 alt="Website Logo"
//                 className="logo"
//               />
//             ) : (
//               <img
//                 src="src/assets/images/logo3.png"
//                 alt="Website Logo"
//                 className="logo3"
//               />
//             )}
//           </div>
//           <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
//             <ul>
//               <li>
//                 <NavLink to={'/'}>Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to={'/about'}>About Us</NavLink>
//               </li>
//               <li>
//                 <NavLink to={'/services'}>Projects</NavLink>
//               </li>
//               <li>
//                 <NavLink to={'/contact'}>Contact Us</NavLink>
//               </li>
//             </ul>
//           </div>
//           <div className="navbar-right">
//             <button className="menu-toggle-btn" onClick={toggleMenu}>
//               ☰
//             </button>

//             {token && role === 'Donor' ? (
//               <Link to="/donor-dashboard">
//                 <button className="dashboard-btn">Dashboard</button>
//               </Link>
//             ) : (
//               <Link to="/donor-login">
//                 <button className="donate-btn"></button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



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
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="navbar-container">
        <div className="header-content">
          <div className="navbar-left">
            {scrolled ? (
              <img
                src="src/assets/images/logo.png"
                alt="Website Logo"
                className="logo"
              />
            ) : (
              <img
                src="src/assets/images/logo3.png"
                alt="Website Logo"
                className="logo3"
              />
            )}
          </div>
          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
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




