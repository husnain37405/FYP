import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaProjectDiagram, FaChartLine, FaColumns } from 'react-icons/fa';
import './Sidebar.css';

const UserSidebar = ({ isOpen }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const decodedData = JSON.parse(atob(base64));
          const userId = decodedData.id;

          const usersResponse = await fetch('http://localhost:5000/users/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!usersResponse.ok) {
            throw new Error('Failed to fetch users');
          }

          const usersData = await usersResponse.json();

          // Filter for the specific user
          const user = usersData.find(user => user._id === userId);
          if (user) {
            setUserDetails(user);
          } else {
            console.error('User not found');
            navigate('/userlogin');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('/userlogin');
        }
      } else {
        console.log('No token found');
        navigate('/userlogin');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/userdashboard">
          <FaColumns className="me-2" />
          {isOpen && <span>Dashboard</span>}
        </Nav.Link>

        {userDetails && userDetails.role === 'Donor' && (
          <Nav.Link as={Link} to="/donations">
            <FaUser className="me-2" />
            {isOpen && <span>Donations</span>}
          </Nav.Link>
        )}
        {userDetails && userDetails.role === 'Requester' && (
          <Nav.Link as={Link} to="/requests">
            <FaUser className="me-2" />
            {isOpen && <span>Requests</span>}
          </Nav.Link>
        )}

        <Nav.Link as={Link} to="/userprojects">
          <FaProjectDiagram className="me-2" />
          {isOpen && <span>Projects</span>}
        </Nav.Link>
        
        {/* <Nav.Link as={Link} to="/reports">
          <FaChartLine className="me-2" />
          {isOpen && <span>Reports</span>}
        </Nav.Link> */}
      </Nav>
    </div>
  );
};

export default UserSidebar;
