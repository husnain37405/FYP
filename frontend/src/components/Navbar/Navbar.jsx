// import React from 'react';
// // import './Navbar.css';

// const Navbar = () => {
//   const handleToggle = () => {
//     document.querySelector('.navbar-menu').classList.toggle('active');
//     document.getElementById('navbar-toggle').classList.toggle('active');
//   };

//   return (
//     <nav id="navbar">
//       <div className="cont">
//         <div className="header-content">
//           <div className="navbar-left">
//             <img src="src/assets/images/logo.png" alt="Website Logo" className="logo" />
//           </div>
//           <div id="navbar-toggle" className="navbar-toggle" onClick={handleToggle}>
//             &#9776;
//           </div>
//           <div className="navbar-menu">
//             <ul>
//               <li><a href="#">Home</a></li>
//               <li><a href="#">About</a></li>
//               <li><a href="#">Services</a></li>
//               <li><a href="#">Contact</a></li>
//             </ul>
//           </div>
//           <div className="navbar-right">
//             <button className="donate-btn">Donate Now</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './Navbar.css';
// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
 
//   const token = useSelector((state)=>state.auth.token)
//   const role = useSelector((state)=>state.auth.currentRole)

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
//     <nav id="navbar" className={scrolled ? 'scrolled' : ''} >
//       <div className="navbar-container">
//         <div className="header-content">
//           <div className="navbar-left">
//              {/* <img src="src/assets/images/logo.png" alt="Website Logo" className="logo" />  */}
//             <img src="src/assets/images/logo3.png" alt="Website Logo" className="logo3" />
//           </div>
//           <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
//             <ul>
//               <li><NavLink to={'/'}>Home</NavLink></li>
//               <li><NavLink to={'/about'}>About Us</NavLink></li>
//               <li><NavLink to={'/services'}>Projects</NavLink></li>
//               <li><NavLink to={'/contact'} >Contact Us</NavLink></li>
//             </ul>
//           </div>
//           <div className="navbar-right">
//             <button className="menu-toggle-btn" onClick={toggleMenu}>☰</button>
           
//             {token && role === 'Donor'  ? (
//               <Link to="/donor-dashboard">
//         {/* <Link to="/userdashboard"  state={{ role: 'Donor' }}> */}
//           <button className="dashboard-btn" >Dashboard</button>
//         </Link>
//       ) : (
//         // <Link to="/userlogin" state={{ role: 'Donor' }}>
//           <Link to="/donor-login">
//           <button className="donate-btn"></button>
//         </Link>
//       )}

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
      const scrollPoint = window.innerHeight / 2;
      if (window.scrollY > scrollPoint) {
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
            {/* Change logo dynamically based on scroll */}
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
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/about'}>About Us</NavLink>
              </li>
              <li>
                <NavLink to={'/services'}>Projects</NavLink>
              </li>
              <li>
                <NavLink to={'/contact'}>Contact Us</NavLink>
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
