import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaUser, FaProjectDiagram, FaColumns } from 'react-icons/fa';
import '../Sidebar.css'; 

const DonorSidebar = ({ isOpen }) => {
  return (
   
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
    <Nav className="flex-column">
        <Nav.Link as={Link} to="donor-dashboard">
          <FaColumns className="me-2" />
          {isOpen && <span>Dashboard</span>}
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/donations">
        <FaProjectDiagram className="me-2" />
          {isOpen && <span>My Donations</span>}
        </Nav.Link> */}
          <Nav.Link as={Link} to="/addDonation">
        <FaProjectDiagram className="me-2" />
          {isOpen && <span>Add Donation</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/donationHistory">
        <FaProjectDiagram className="me-2" />
          {isOpen && <span>My Donations</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/userprojects">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Projects</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/userprofile">
        <FaUser className="me-2" />
          {isOpen && <span>Profile</span>}
        </Nav.Link>
        </Nav>
    </div>
    
  );
};

export default DonorSidebar;
