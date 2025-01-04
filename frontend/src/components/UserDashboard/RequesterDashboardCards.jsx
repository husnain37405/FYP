// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
// import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useGetRequesterRequestsQuery } from '../../redux/features/request/requestApi';
// import { Calendar } from 'react-calendar';
// import './DashboardCards.css';

// const RequesterDashboardCards = () => {
//   const { token, user, currentRole } = useSelector((state) => state.auth);

  
//   const { data: requests, isLoading: requestsLoading, error: requestsError } = useGetRequesterRequestsQuery(token);

  
//   const totalAccepted = requests?.totalAccepted || 0;
//   const totalPending = requests?.totalPending || 0;
//   const totalRejected = requests?.totalRejected || 0;
//   const requestHistory = requests?.requests || [];

//   // Calendar state
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

//   return (
//     <Row className="mt-4">
//       <h2>Welcome, {user?.name}</h2>
//       <p>User Type: {currentRole}</p>

//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaUsers className="card-icon" />
//             <Card.Title className="card-title">Requests</Card.Title>
//             <Card.Text style={{marginLeft:'0'}}>Total Requests: {requestHistory.length || 0}</Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Request Status Card */}
//       <Col md={3}>
//         <Card className="text-center card">
//           <Card.Body>
//             <FaChartLine className="card-icon" />
//             <Card.Title className="card-title">Request Status</Card.Title>
//             <Card.Text style={{marginLeft:'0'}}>
//               Rejected: {totalRejected}
//               <br />
//               Accepted: {totalAccepted}
//               <br />
//               Pending: {totalPending}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </Col>

//       {/* Current Month Card */}
//       <Col md={3}>
//         <Card
//           className="text-center card"
//           onClick={handleOpenModal}
//           style={{ cursor: 'pointer' }}
//         >
//           <Card.Body>
//             <FaCalendarAlt className="card-icon" />
//             <Card.Title className="card-title">Current Month</Card.Title>
//             <Card.Text style={{marginLeft:'0'}}>{`${currentMonth} ${currentYear}`}</Card.Text>
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
import { FaClipboardList, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useGetRequesterRequestsQuery } from '../../redux/features/request/requestApi';
import { Calendar } from 'react-calendar';
import './DashboardCards.css';

const RequesterDashboardCards = () => {
  const { token, user, currentRole } = useSelector((state) => state.auth);

  const { data: requests, isLoading: requestsLoading, error: requestsError } = useGetRequesterRequestsQuery(token);

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
            <FaClipboardList className="card-icon" />
            <Card.Title className="card-title">Requests</Card.Title>
            <Card.Text style={{ marginLeft: '0' }}>
              Total Requests: {requestHistory.length || 0}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Request Status Card */}
      <Col md={3}>
        <Card className="text-center card">
          <Card.Body>
            <FaTasks className="card-icon" />
            <Card.Title className="card-title">Request Status</Card.Title>
            <Card.Text style={{ marginLeft: '0' }}>
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
            <Card.Text style={{ marginLeft: '0' }}>{`${currentMonth} ${currentYear}`}</Card.Text>
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
