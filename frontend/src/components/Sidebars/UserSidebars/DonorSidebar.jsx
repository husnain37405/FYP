// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
// import { FaUser, FaProjectDiagram, FaColumns } from 'react-icons/fa';
// import '../Sidebar.css'; 

// const DonorSidebar = ({ isOpen }) => {
//   return (
   
//     <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>

// <Nav.Link
//           as={Link}
//           to="/"
//           className={isActive('/') ? 'active' : ''}
//         >
//           <FaHome className="me-2" />
//           {isOpen && <span>Home</span>}
//         </Nav.Link>

//     <Nav className="flex-column">
//         <Nav.Link as={Link} to="donor-dashboard"  className={isActive('/') ? 'active' : ''}>
//           <FaColumns className="me-2" />
//           {isOpen && <span>Dashboard</span>}
//         </Nav.Link>
//           <Nav.Link as={Link} to="/addDonation"  className={isActive('/') ? 'active' : ''}>
//         <FaProjectDiagram className="me-2" />
//           {isOpen && <span>Add Donation</span>}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/donationHistory"  className={isActive('/') ? 'active' : ''}>
//         <FaProjectDiagram className="me-2" />
//           {isOpen && <span>My Donations</span>}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/userprojects"  className={isActive('/') ? 'active' : ''}>
//           <FaProjectDiagram className="me-2" />
//           {isOpen && <span>Projects</span>}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/userprofile"  className={isActive('/') ? 'active' : ''}>
//         <FaUser className="me-2" />
//           {isOpen && <span>Profile</span>}
//         </Nav.Link>
//         </Nav>
//     </div>
    
//   );
// };

// export default DonorSidebar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Nav } from 'react-bootstrap';
// import { FaHome, FaTachometerAlt, FaPlusCircle, FaGift, FaHandsHelping, FaUser } from 'react-icons/fa';
// import '../Sidebar.css'

// const DonorSidebar = ({ isOpen }) => {
//    const location = useLocation();
//     const isActive = (route) => location.pathname === route;
//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
//       <Nav.Link
//         as={Link}
//         to="/"
//         className={isActive('/') ? 'active' : ''}
//       >
//         <FaHome className="me-2" />
//         {isOpen && <span>Home</span>}
//       </Nav.Link>

//       <Nav className="flex-column">
//         <Nav.Link as={Link} to="donor-dashboard" className={isActive('/') ? 'active' : ''}>
//           <FaTachometerAlt className="me-2" />
//           {isOpen && <span>Dashboard</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/addDonation" className={isActive('/') ? 'active' : ''}>
//           <FaPlusCircle className="me-2" />
//           {isOpen && <span>Add Donation</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/donationHistory" className={isActive('/') ? 'active' : ''}>
//           <FaGift className="me-2" />
//           {isOpen && <span>My Donations</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/userprojects" className={isActive('/') ? 'active' : ''}>
//           <FaHandsHelping className="me-2" />
//           {isOpen && <span>Projects</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/userprofile" className={isActive('/') ? 'active' : ''}>
//           <FaUser className="me-2" />
//           {isOpen && <span>Profile</span>}
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default DonorSidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaHome, FaTachometerAlt, FaPlusCircle, FaGift, FaHandsHelping, FaUser } from 'react-icons/fa';
import '../Sidebar.css';

const DonorSidebar = ({ isOpen }) => {
  const location = useLocation();

  // Check if the route matches the current location
  const isActive = (route) => location.pathname === route;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <Nav.Link
        as={Link}
        to="/"
        className={isActive('/') ? 'active' : ''}
      >
        <FaHome className="me-2" />
        {isOpen && <span>Home</span>}
      </Nav.Link>

      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/donor-dashboard"
          className={isActive('/donor-dashboard') ? 'active' : ''}
        >
          <FaTachometerAlt className="me-2" />
          {isOpen && <span>Dashboard</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/addDonation"
          className={isActive('/addDonation') ? 'active' : ''}
        >
          <FaPlusCircle className="me-2" />
          {isOpen && <span>Add Donation</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/donationHistory"
          className={isActive('/donationHistory') ? 'active' : ''}
        >
          <FaGift className="me-2" />
          {isOpen && <span>My Donations</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/userprojects"
          className={isActive('/userprojects') ? 'active' : ''}
        >
          <FaHandsHelping className="me-2" />
          {isOpen && <span>Projects</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/userprofile"
          className={isActive('/userprofile') ? 'active' : ''}
        >
          <FaUser className="me-2" />
          {isOpen && <span>Profile</span>}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default DonorSidebar;
