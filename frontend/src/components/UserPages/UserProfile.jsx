import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
const UserProfile = () => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/edit-profile');
  };
  const userId = useSelector((state) => state.auth.user.id)
  const role = useSelector((state) => state.auth.currentRole);
  const { data: user, error, isLoading } = useGetUserDetailsQuery(userId);
  console.log(user, "User From UserProfile")
  console.log(error, "Error From UserProfile")
  return (
    <Container >
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-lg">
            <div className="text-center">
              <img
                src={user?.avatar?.secure_url || 'http://localhost:5000/static/uploads/users/default.png'}
                alt="User Avatar"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <h3 className="text-center mb-4">{user?.name || 'User Name'}</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Email:</strong> {user?.email || 'N/A'}
              </li>
              <li className="list-group-item">
                <strong>Contact:</strong> {user?.contact || 'N/A'}
              </li>
            </ul>
            <div className="d-grid mt-4">
              <Button variant="primary" onClick={handleEditClick}>
                <i className="fas fa-edit"></i> Edit Profile
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;


/*
.card {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card h3 {
  color: #333;
  font-weight: bold;
}
.list-group-item {
  font-size: 16px;
}
*/
