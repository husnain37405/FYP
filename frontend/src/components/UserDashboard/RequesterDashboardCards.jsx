// import React, { useState, useEffect } from 'react'
// import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
// import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
//  import Calendar from 'react-calendar'; 
//  import 'react-calendar/dist/Calendar.css'; 
// import './DashboardCards.css';
// import { useGetUserDetailsQuery, useGetRequestsQuery } from '../../redux/user/userApi';
// import { useSelector } from 'react-redux';
// const RequesterDashboardCards = () => {
//  const currentUser = useSelector((state)=>state.user.currentUser)
//  const currentRole = useSelector((state)=>state.user.currentRole)
//   const token = localStorage.getItem('token');
//   const { data: userDetails, isLoading: userLoading } = useGetUserDetailsQuery(token);
//   const { data: requests, isLoading: requestsLoading } = useGetRequestsQuery(token);

//   if (userLoading || requestsLoading) return <p>Loading...</p>;

//   const rejectedRequests = requests?.filter((req) => req.status === 'Rejected').length || 0;
//   const acceptedRequests = requests?.filter((req) => req.status === 'Accepted').length || 0;
//   const pendingRequests = requests?.filter((req) => req.status === 'Pending').length || 0;

//   //Calendar
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
//   const [showCalendarModal, setShowCalendarModal] = useState(false); 

//     useEffect(() => {
//       const date = new Date();
//       const month = date.toLocaleString('default', { month: 'long' });
//       const year = date.getFullYear();
//       setCurrentMonth(month);
//       setCurrentYear(year);
//     }, []);
  
//   //Handle opening and closing of the calendar modal
//   const handleOpenModal = () => {
//     setShowCalendarModal(true); 
//   };

//   const handleCloseModal = () => {
//     setShowCalendarModal(false); 
//   };

//   return (
//     <Row className="mt-4">
//       <h2>Welcome, {currentUser?.name}</h2>
//       <p>User Type: {currentRole}</p>
//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaUsers className="card-icon" />
//             <Card.Title className="card-title">Requests</Card.Title>
//             <Card.Text>Your Requests: {requests?.length || 0}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaChartLine className="card-icon" />
//             <Card.Title className="card-title">Request Status</Card.Title>
//             <Card.Text>
//               Rejected: {rejectedRequests}<br />
//               Accepted: {acceptedRequests}<br />
//               Pending: {pendingRequests}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>
//              {/* Calendar Card */}
//        <Col md={3}>
//          <Card className="text-center card" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
//            <Card.Body>
//              <FaCalendarAlt className="card-icon" />
//              <Card.Title className="card-title">Current Month</Card.Title>
//              <Card.Text>{`${currentMonth} ${currentYear}`}</Card.Text>
//            </Card.Body>
//          </Card>
//        </Col>

//        <Modal show={showCalendarModal} onHide={handleCloseModal}>
//          <Modal.Header closeButton>
//            <Modal.Title>Calendar for {`${currentMonth} ${currentYear}`}</Modal.Title>
//          </Modal.Header>
//          <Modal.Body>
//            <Calendar
//              value={new Date()} 
//              view="month" 
//            />
//          </Modal.Body>
//          <Modal.Footer>
//            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//          </Modal.Footer>
//        </Modal>
//     </Row>
//   );
// };

// export default RequesterDashboardCards;

// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
// import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './DashboardCards.css';
// import { useGetUserDetailsQuery} from '../../redux/features/user/userApi'
// import { useGetRequestsQuery } from '../../redux/features/request/requestApi';
// import { useSelector } from 'react-redux';

// const RequesterDashboardCards = () => {
//   const currentUser = useSelector((state) => state.auth.user);
//   const currentRole = useSelector((state) => state.auth.currentRole);
//   const token = useSelector((state) => state.auth.token)


//   const { data: userDetails, isLoading: userLoading } = useGetUserDetailsQuery(token);
//   const { data: requests, isLoading: requestsLoading } = useGetRequestsQuery(token);

//   const rejectedRequests = requests?.filter((req) => req.status === 'Rejected').length || 0;
//   const acceptedRequests = requests?.filter((req) => req.status === 'Accepted').length || 0;
//   const pendingRequests = requests?.filter((req) => req.status === 'Pending').length || 0;

//   // Calendar state
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
//   const [showCalendarModal, setShowCalendarModal] = useState(false);

//   useEffect(() => {
//     const date = new Date();
//     const month = date.toLocaleString('default', { month: 'long' });
//     const year = date.getFullYear();
//     setCurrentMonth(month);
//     setCurrentYear(year);
//   }, []);

//   const handleOpenModal = () => {
//     setShowCalendarModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowCalendarModal(false);
//   };

//   return (
//     <Row className="mt-4">
//       {userLoading || requestsLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <h2>Welcome, {currentUser?.name}</h2>
//           <p>User Type: {currentRole}</p>

//           <Col md={3}>
//             <Card className="text-center card">
//               <Card.Body>
//                 <FaUsers className="card-icon" />
//                 <Card.Title className="card-title">Requests</Card.Title>
//                 <Card.Text>Your Requests: {requests?.length || 0}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={3}>
//             <Card className="text-center card">
//               <Card.Body>
//                 <FaChartLine className="card-icon" />
//                 <Card.Title className="card-title">Request Status</Card.Title>
//                 <Card.Text>
//                   Rejected: {rejectedRequests}
//                   <br />
//                   Accepted: {acceptedRequests}
//                   <br />
//                   Pending: {pendingRequests}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Col md={3}>
//             <Card
//               className="text-center card"
//               onClick={handleOpenModal}
//               style={{ cursor: 'pointer' }}
//             >
//               <Card.Body>
//                 <FaCalendarAlt className="card-icon" />
//                 <Card.Title className="card-title">Current Month</Card.Title>
//                 <Card.Text>{`${currentMonth} ${currentYear}`}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>

//           <Modal show={showCalendarModal} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Calendar for {`${currentMonth} ${currentYear}`}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Calendar value={new Date()} view="month" />
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       )}
//     </Row>
//   );
// };

// export default RequesterDashboardCards;
//^Working 

// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
// import { useGetRequesterRequestsQuery } from '../../redux/features/request/requestApi';
// import { Calendar } from 'react-calendar';
// import './DashboardCards.css';

// const RequesterDashboardCards = () => {
//   const { token, user, currentRole } = useSelector((state) => state.auth);
//   console.log("Full state from Requester Dashboard Cards",useSelector((state) => state.auth))
//   // Fetch user details and requests
//   const { data: userDetails, isLoading: userLoading } = useGetUserDetailsQuery(token);
//   const { data: requests, isLoading: requestsLoading } = useGetRequesterRequestsQuery(token);

//   // Calculate request status counts
//   const rejectedRequests = requests?.filter((req) => req.status === 'Rejected').length || 0;
//   const acceptedRequests = requests?.filter((req) => req.status === 'Accepted').length || 0;
//   const pendingRequests = requests?.filter((req) => req.status === 'Pending').length || 0;

//   // Calendar state
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
//   const [showCalendarModal, setShowCalendarModal] = useState(false);

//   // Set current month and year
//   useEffect(() => {
//     const date = new Date();
//     const month = date.toLocaleString('default', { month: 'long' });
//     const year = date.getFullYear();
//     setCurrentMonth(month);
//     setCurrentYear(year);
//   }, []);

//   // Open calendar modal
//   const handleOpenModal = () => {
//     setShowCalendarModal(true);
//   };

//   // Close calendar modal
//   const handleCloseModal = () => {
//     setShowCalendarModal(false);
//   };

//   if (userLoading || requestsLoading) return <p>Loading...</p>;

//   return (
//     <Row className="mt-4">
//       <h2>Welcome, {user?.name}</h2>
//       <p>User Type: {currentRole}</p>

//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaUsers className="card-icon" />
//             <Card.Title className="card-title">Requests</Card.Title>
//             <Card.Text>Your Requests: {requests?.length || 0}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaChartLine className="card-icon" />
//             <Card.Title className="card-title">Request Status</Card.Title>
//             <Card.Text>
//               Rejected: {rejectedRequests}
//               <br />
//               Accepted: {acceptedRequests}
//               <br />
//               Pending: {pendingRequests}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       <Col md={3}>
//         <Card
//           className="text-center card"
//           onClick={handleOpenModal}
//           style={{ cursor: 'pointer' }}
//         >
//           <Card.Body>
//             <FaCalendarAlt className="card-icon" />
//             <Card.Title className="card-title">Current Month</Card.Title>
//             <Card.Text>{`${currentMonth} ${currentYear}`}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Calendar Modal */}
//       <Modal show={showCalendarModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Calendar for {`${currentMonth} ${currentYear}`}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Calendar value={new Date()} view="month" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Row>
//   );
// };

// export default RequesterDashboardCards;

// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
// import { useGetRequesterRequestsQuery } from '../../redux/features/request/requestApi';
// import { Calendar } from 'react-calendar';
// import './DashboardCards.css';

// const RequesterDashboardCards = () => {
//   const { token, user, currentRole } = useSelector((state) => state.auth);

//   // Fetch user details and requests
//   // const { data: userDetails, isLoading: userLoading, error: userError } = useGetUserDetailsQuery(token);
//   const { data: requests, isLoading: requestsLoading, error: requestsError } = useGetRequesterRequestsQuery(token);
//  // Extract status counts directly from the API response
//   const totalAccepted = requests?.totalAccepted || 0;
//   const totalPending = requests?.totalPending || 0;
//   const totalRejected = requests?.totalRejected || 0;
//   const requestHistory = requests?.requests || [];
//   // Calendar 
//   const [currentMonth, setCurrentMonth] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
//   const [showCalendarModal, setShowCalendarModal] = useState(false);
//   useEffect(() => {
//     const date = new Date();
//     setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
//     setCurrentYear(date.getFullYear());
//   }, []);

//   const handleOpenModal = () => setShowCalendarModal(true);
//   const handleCloseModal = () => setShowCalendarModal(false);

//   if (requestsError) return <p>{requestsError.data.message}</p>;

//   return (
//     <Row className="mt-4">
//       <h2>Welcome, {user?.name}</h2>
//       <p>User Type: {currentRole}</p>

//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaUsers className="card-icon" />
//             <Card.Title className="card-title">Requests</Card.Title>
//             <Card.Text>Your Requests: {requestHistory.length || 0}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaChartLine className="card-icon" />
//             <Card.Title className="card-title">Request Status</Card.Title>
//             <Card.Text>
//               Rejected: {totalRejected || 0}
//               <br />
//               Accepted: {totalAccepted || 0}
//               <br />
//               Pending: {totalPending || 0}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       <Col md={3}>
//         <Card
//           className="text-center card"
//           onClick={handleOpenModal}
//           style={{ cursor: 'pointer' }}
//         >
//           <Card.Body>
//             <FaCalendarAlt className="card-icon" />
//             <Card.Title className="card-title">Current Month</Card.Title>
//             <Card.Text>{`${currentMonth} ${currentYear}`}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Calendar Modal */}
//       <Modal show={showCalendarModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Calendar for {`${currentMonth} ${currentYear}`}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Calendar value={new Date()} view="month" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Row>
//   );
// };

// export default RequesterDashboardCards;

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useGetRequesterRequestsQuery } from '../../redux/features/request/requestApi';
import { Calendar } from 'react-calendar';
import './DashboardCards.css';

const RequesterDashboardCards = () => {
  const { token, user, currentRole } = useSelector((state) => state.auth);

  // Fetch requests
  const { data: requests, isLoading: requestsLoading, error: requestsError } = useGetRequesterRequestsQuery(token);

  // Extract status counts directly from the API response or fallback to 0
  const totalAccepted = requests?.totalAccepted || 0;
  const totalPending = requests?.totalPending || 0;
  const totalRejected = requests?.totalRejected || 0;
  const requestHistory = requests?.requests || [];

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentMonth(date.toLocaleString('default', { month: 'long' }));
    setCurrentYear(date.getFullYear());
  }, []);

  const handleOpenModal = () => setShowCalendarModal(true);
  const handleCloseModal = () => setShowCalendarModal(false);

  return (
    <Row className="mt-4">
      <h2>Welcome, {user?.name}</h2>
      <p>User Type: {currentRole}</p>

      {/* Requests Card */}
      <Col md={3}>
        <Card className="text-center card">
          <Card.Body>
            <FaUsers className="card-icon" />
            <Card.Title className="card-title">Requests</Card.Title>
            <Card.Text>Your Requests: {requestHistory.length || 0}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Request Status Card */}
      <Col md={3}>
        <Card className="text-center card">
          <Card.Body>
            <FaChartLine className="card-icon" />
            <Card.Title className="card-title">Request Status</Card.Title>
            <Card.Text>
              Rejected: {totalRejected}
              <br />
              Accepted: {totalAccepted}
              <br />
              Pending: {totalPending}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Current Month Card */}
      <Col md={3}>
        <Card
          className="text-center card"
          onClick={handleOpenModal}
          style={{ cursor: 'pointer' }}
        >
          <Card.Body>
            <FaCalendarAlt className="card-icon" />
            <Card.Title className="card-title">Current Month</Card.Title>
            <Card.Text>{`${currentMonth} ${currentYear}`}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Calendar Modal */}
      <Modal show={showCalendarModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Calendar for {`${currentMonth} ${currentYear}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar value={new Date()} view="month" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default RequesterDashboardCards;
