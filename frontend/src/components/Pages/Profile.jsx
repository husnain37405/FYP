// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import { FaUsers, FaProjectDiagram, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

// import '../../styles/variables.css';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [fetchedUsers, setFetchedUsers] = useState([]);
//   const [fetchedProjects, setFetchedProjects] = useState([]);
//   const [fetchedDonations, setFetchedDonations] = useState([]);
//   const [fetchedRequests, setFetchedRequests] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [rejectedRequests, setRejectedRequests] = useState(0);
//   const [acceptedRequests, setAcceptedRequests] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState(0);

//   const navigate = useNavigate();

//   const handleCardClick = (path) => {
//     navigate(path);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//      const token = useSelector((state)=>state.auth.token)
//       if (token) {
//         try {
//           const base64Url = token.split('.')[1];
//           const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//           const decodedData = JSON.parse(atob(base64));
//           const userId = decodedData.id;

//           // Fetch all users
//           const usersResponse = await fetch('http://localhost:5000/users/', {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });

//           if (!usersResponse.ok) {
//             throw new Error('Failed to fetch users');
//           }

//           const usersData = await usersResponse.json();
//           setFetchedUsers(usersData);

//           // Filter for the specific user
//           const user = usersData.find(user => user._id === userId);
//           setUserDetails(user);
        

//           // Fetch data based on user role
// if (user.role === 'Donor') {
//   const donationsResponse = await fetch(`http://localhost:5000/donations/`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!donationsResponse.ok) {
//     throw new Error('Failed to fetch donations');
//   }

//   const donationsData = await donationsResponse.json();

//   // Filter donations based on userId
//   const filteredDonations = donationsData.filter(donation => donation.userId === user._id);
//   setFetchedDonations(filteredDonations);

// } else if (user.role === 'Requester') {
//   const requestsResponse = await fetch(`http://localhost:5000/requests/`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!requestsResponse.ok) {
//     throw new Error('Failed to fetch requests');
//   }

//   const requestsData = await requestsResponse.json();

//   // Filter requests based on userId
//   const filteredRequests = requestsData.filter(request => request.userId === user._id);
//   setFetchedRequests(filteredRequests);

//   // Count the request statuses
//   setRejectedRequests(filteredRequests.filter(request => request.status === 'Rejected').length);
//   setAcceptedRequests(filteredRequests.filter(request => request.status === 'Accepted').length);
//   setPendingRequests(filteredRequests.filter(request => request.status === 'Pending').length);
// }

//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       } else {
//         console.log('No token found');
//         navigate('/userlogin');
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     const total = fetchedDonations.reduce((accumulator, donation) => {
//       return accumulator + (donation.amount || 0);
//     }, 0);
//     setTotalAmount(total);
//   }, [fetchedDonations]);


//   return (
//     <Row className="mt-4">
//       {userDetails ? (
//         <div>
         
//           <h2>Welcome, {userDetails.name}</h2>
//           <p> Account Type: {userDetails.role}</p>
//           <p> Email: {userDetails.email}</p>
          
//         </div>
//       ) : (
//         <p>Loading user details...</p>
//       )}
     
//       {userDetails && userDetails.role === 'Donor' && (
//         <>
       
//           <Col md={3}>
//             <Card className="text-center card" onClick={() => handleCardClick('/donations')} style={{ cursor: 'pointer' }}>
//               <Card.Body>
//                 <FaUsers className="card-icon" />
//                 <Card.Title className="card-title">Donations</Card.Title>
//                 <Card.Text>Your Donations: {fetchedDonations.length}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={3}>
//             <Card className="text-center card" onClick={() => handleCardClick('/reports')} style={{ cursor: 'pointer' }}>
//               <Card.Body>
//                 <FaChartLine className="card-icon" />
//                 <Card.Title className="card-title">Amount</Card.Title>
//                 <Card.Text>Your Donated Amount: {totalAmount.toFixed(2)} Rs/-</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </>
//       )}

//       {userDetails && userDetails.role === 'Requester' && (
//         <>
//           <Col md={3}>
//             <Card className="text-center card" onClick={() => handleCardClick('/requests')} style={{ cursor: 'pointer' }}>
//               <Card.Body>
//                 <FaUsers className="card-icon" />
//                 <Card.Title className="card-title">Requests</Card.Title>
//                 <Card.Text>Your Requests: {fetchedRequests.length}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={3}>
//             <Card className="text-center card" onClick={() => handleCardClick('/reports')} style={{ cursor: 'pointer' }}>
//               <Card.Body>
//                 <FaChartLine className="card-icon" />
//                 <Card.Title className="card-title">Request Status</Card.Title>
//                 <Card.Text>
//                   Rejected: {rejectedRequests}<br />
//                   Accepted: {acceptedRequests}<br />
//                   Pending: {pendingRequests}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </>
//       )}

      
//     </Row>
//   );
// };

// export default Profile;

import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';  // Import necessary components

function Profile() {
  const { currentRole, token, user } = useSelector((state) => state.auth);

  // If the user is not an Admin or the token is missing, show a permission message
  if (currentRole !== 'Admin' || !token) {
    return (
      <Container className="text-center mt-5">
        <h2>You do not have permission to view this page.</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">My Profile</Card.Title>

              {/* Profile details */}
              <Row className="mb-3">
                <Col sm={4}><strong>Name:</strong></Col>
                <Col sm={8}>{user?.name}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}><strong>Email:</strong></Col>
                <Col sm={8}>{user?.email}</Col>
              </Row>

              <Row className="mb-3">
                <Col sm={4}><strong>Role:</strong></Col>
                <Col sm={8}>{currentRole}</Col>
              </Row>

              {/* Bio */}
              {user?.bio && (
                <Row className="mb-3">
                  <Col sm={4}><strong>Bio:</strong></Col>
                  <Col sm={8}>{user?.bio}</Col>
                </Row>
              )}

              {/* Optional buttons or links */}
              <div className="text-center mt-4">
                <Button variant="primary" size="lg">
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
