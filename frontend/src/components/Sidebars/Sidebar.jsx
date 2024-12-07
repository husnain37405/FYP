// src/components/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaUser, FaProjectDiagram, FaChartLine, FaCog, FaCalendarAlt, FaColumns } from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard">
          <FaColumns className="me-2" />
          {isOpen && <span>Home</span>}
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/users">
          <FaUser className="me-2" />
          {isOpen && <span>Users</span>}
        </Nav.Link> */}
        <Nav.Link as={Link} to="/donorTable">
          <FaUser className="me-2" />
          {isOpen && <span>Donor Users</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/requesterTable">
          <FaUser className="me-2" />
          {isOpen && <span>Requester Users</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/addProject">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Add Project</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/projects">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Projects</span>}
        </Nav.Link>

        <Nav.Link as={Link} to="/admindonations">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Donations</span>}
        </Nav.Link>

        <Nav.Link as={Link} to="/adminrequests">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Requests</span>}
        </Nav.Link>

        <Nav.Link as={Link} to="/adminreports">
          <FaChartLine className="me-2" />
          {isOpen && <span>Reports</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/current-month">
          <FaCalendarAlt className="me-2" />
          {isOpen && <span>Current Month</span>}
        </Nav.Link>
        
      </Nav>
    </div>
  );
};

export default Sidebar;
