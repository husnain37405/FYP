// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaHome, FaTachometerAlt, FaPlusCircle, FaHistory, FaUser } from 'react-icons/fa';
// import { Nav } from 'react-bootstrap';
// import '../Sidebar.css';

// const RequesterSidebar = ({ isOpen }) => {
//   const location = useLocation();
//   const isActive = (route) => location.pathname === route;

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
//       <Nav className="flex-column">
//         <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
//           <FaHome className="me-2" />
//           {isOpen && <span>Home</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="requester-dashboard" className={isActive('/') ? 'active' : ''}>
//           <FaTachometerAlt className="me-2" />
//           {isOpen && <span>Dashboard</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/AddRequest" className={isActive('/') ? 'active' : ''}>
//           <FaPlusCircle className="me-2" />
//           {isOpen && <span>Add a Request</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/requestHistory" className={isActive('/') ? 'active' : ''}>
//           <FaHistory className="me-2" />
//           {isOpen && <span>My Requests</span>}
//         </Nav.Link>

//         <Nav.Link as={Link} to="/userprofile" className={isActive('/') ? 'active' : ''}>
//           <FaUser className="me-2" />
//           {isOpen && <span>Profile</span>}
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default RequesterSidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaPlusCircle, FaHistory, FaUser, FaHandsHelping } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import '../Sidebar.css';

const RequesterSidebar = ({ isOpen }) => {
  const location = useLocation();

  // Function to check if the current route matches the link's route
  const isActive = (route) => location.pathname === route;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
          <FaHome className="me-2" />
          {isOpen && <span>Home</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/requester-dashboard"
          className={isActive('/requester-dashboard') ? 'active' : ''}
        >
          <FaTachometerAlt className="me-2" />
          {isOpen && <span>Dashboard</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/AddRequest"
          className={isActive('/AddRequest') ? 'active' : ''}
        >
          <FaPlusCircle className="me-2" />
          {isOpen && <span>Add a Request</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/requestHistory"
          className={isActive('/requestHistory') ? 'active' : ''}
        >
          <FaHistory className="me-2" />
          {isOpen && <span>My Requests</span>}
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

export default RequesterSidebar;
