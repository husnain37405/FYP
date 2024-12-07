import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaColumns } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import '../Sidebar.css'; 

const RequesterSidebar = ({ isOpen }) => {
  return (
 <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
<Nav className="flex-column">
    <Nav.Link as={Link} to="requester-dashboard">
      <FaColumns className="me-2" />
      {isOpen && <span>Dashboard</span>}
    </Nav.Link>
    {/* <Nav.Link as={Link} to="/requests">
    <FaProjectDiagram className="me-2" />
      {isOpen && <span>My Requestes</span>}
    </Nav.Link> */}
      <Nav.Link as={Link} to="/AddRequest">
    <FaProjectDiagram className="me-2" />
      {isOpen && <span>Add Requestes</span>}
    </Nav.Link>
     <Nav.Link as={Link} to="/requestHistory">
      <FaProjectDiagram className='me-2'/>
      {isOpen && <span>My Requests</span>}
     </Nav.Link>
    <Nav.Link as={Link} to="/userprofile">
    <FaUser className="me-2" />
      {isOpen && <span>Profile</span>}
    </Nav.Link>
    </Nav>
</div>
  );
};

export default RequesterSidebar;
