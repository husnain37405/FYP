import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, Button } from 'react-bootstrap';
import { FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardCards.css';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
import { useGetDonorTotalDonationsCountQuery, useGetDonorTotalDonatedAmountQuery } from '../../redux/features/donation/donationApi';
import { useSelector } from 'react-redux';

const DonorDashboardCards = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const currentRole = useSelector((state) => state.auth.currentRole);

  const { data: userDetails, isLoading: userLoading } = useGetUserDetailsQuery(token);

  const { data: totalDonationsCount, isLoading: donationsCountLoading } = useGetDonorTotalDonationsCountQuery();
  const { data: totalDonatedAmount, isLoading: donatedAmountLoading } = useGetDonorTotalDonatedAmountQuery();
  
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

  const isLoading = userLoading || donationsCountLoading || donatedAmountLoading;

  const exchangeRate = 278;
  const amountInPKR = totalDonatedAmount?.totalAmount?.toFixed(2) * exchangeRate;
  

  return (
    <Row className="mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Welcome, {currentUser?.name}</h2>
          <p>User Type: {currentRole}</p>

          <Col md={3}>
            <Card className="text-center card">
              <Card.Body>
                <FaUsers className="card-icon" />
                <Card.Title className="card-title">Donations</Card.Title>
                <Card.Text>Your Donations: {totalDonationsCount?.totalDonationsCount || 0}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center card">
              <Card.Body>
                <FaChartLine className="card-icon" />
                <Card.Title className="card-title">Total Amount</Card.Title>
                <Card.Text>Your Donated Amount: 
                 {amountInPKR || 0} Rs/-</Card.Text>
              </Card.Body>
            </Card>
          </Col>

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
        </>
      )}
    </Row>
  );
};

export default DonorDashboardCards;
