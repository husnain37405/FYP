import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaUsers, FaProjectDiagram, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../redux/features/user/userApi';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import { useGetAllDonationsQuery } from '../../redux/features/donation/donationApi';
import { useGetCurrentAccountQuery } from '../../redux/features/account/accountApi';
import './DashboardCards.css';
import '../../styles/variables.css';

const DashboardCards = () => {
  const navigate = useNavigate();

  const { data: users = [], isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
  const { data: donations = [], isLoading: donationsLoading } = useGetAllDonationsQuery();
  const { data: account = {}, isLoading: accountLoading } = useGetCurrentAccountQuery();
  const totalAmount = donations.reduce((acc, donation) => acc + (donation.amount || 0), 0);
  const totalPaidAmount = account?.totalPaidAmount || 0;
  const currentAmount = totalAmount - totalPaidAmount;

  const handleCardClick = (path) => {
    navigate(path);
  };

  const isLoading = usersLoading || projectsLoading || donationsLoading || accountLoading;

  return (
    <Row className="mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Col md={3}>
            <Card
              className="text-center card"
              onClick={() => handleCardClick('/users')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <FaUsers className="card-icon" />
                <Card.Title className="card-title">Users</Card.Title>
                <Card.Text>Total Users: {users.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="text-center card"
              onClick={() => handleCardClick('/projects')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <FaProjectDiagram className="card-icon" />
                <Card.Title className="card-title">Projects</Card.Title>
                <Card.Text>Projects: {projects.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card
              className="text-center card"
              onClick={() => handleCardClick('/admindonations')}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <FaChartLine className="card-icon" />
                <Card.Title className="card-title">Donations</Card.Title>
                <Card.Text>Donations: {donations.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card">
              <Card.Body>
                <FaCalendarAlt className="card-icon" />
                <Card.Title className="card-title">Total Donated Amount</Card.Title>
                <Card.Text>{totalAmount.toFixed(2)} $/-</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card">
              <Card.Body>
                <FaCalendarAlt className="card-icon" />
                <Card.Title className="card-title">Total Paid Amount</Card.Title>
                <Card.Text>{totalPaidAmount.toFixed(2)} $/-</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center card">
              <Card.Body>
                <FaCalendarAlt className="card-icon" />
                <Card.Title className="card-title">Current Balance</Card.Title>
                <Card.Text>{currentAmount.toFixed(2)} $/-</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
};

export default DashboardCards;
