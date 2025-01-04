import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaUsers, FaDonate, FaTasks, FaList, FaFileAlt, FaTh  , FaCalendarAlt, FaHome, FaMoneyCheckAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (route) => location.pathname === route;
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <Nav className="flex-column">

      <Nav.Link
          as={Link}
          to="/"
          className={isActive('/') ? 'active' : ''}
        >
          <FaHome className="me-2" />
          {isOpen && <span>Home</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard"
          className={isActive('/dashboard') ? 'active' : ''}
        >
          <FaTh   className="me-2" />
          {isOpen && <span>Dashboard</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/donorTable"
          className={isActive('/donorTable') ? 'active' : ''}
        >
          <FaUsers className="me-2" />
          {isOpen && <span>Donor Users</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/requesterTable"
          className={isActive('/requesterTable') ? 'active' : ''}
        >
          <FaUser className="me-2" />
          {isOpen && <span>Requester Users</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/addProject"
          className={isActive('/addProject') ? 'active' : ''}
        >
          <FaTasks className="me-2" />
          {isOpen && <span>Add New Project</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/projects"
          className={isActive('/projects') ? 'active' : ''}
        >
          <FaList className="me-2" />
          {isOpen && <span>Projects</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/admindonations"
          className={isActive('/admindonations') ? 'active' : ''}
        >
          <FaDonate className="me-2" />
          {isOpen && <span>Donations</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/adminrequests"
          className={isActive('/adminrequests') ? 'active' : ''}
        >
          <FaFileAlt className="me-2" />
          {isOpen && <span>Requests</span>}
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/adminreports"
          className={isActive('/adminreports') ? 'active' : ''}
        >
          <FaMoneyCheckAlt className="me-2" />
          {isOpen && <span>Reports</span>}
        </Nav.Link>


        {/* <Nav.Link
          as={Link}
          to="/current-month"
          className={isActive('/current-month') ? 'active' : ''}
        >
          <FaCalendarAlt className="me-2" />
          {isOpen && <span>Current Month</span>}
        </Nav.Link> */}
      </Nav>
    </div>
  );
};

export default Sidebar;

