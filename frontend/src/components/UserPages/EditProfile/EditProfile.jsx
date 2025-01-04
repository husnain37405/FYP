
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from  '../../../redux/features/user/userApi';
import { Form, Button, Container, Alert, Spinner, Row, Col } from 'react-bootstrap';

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    contact: user?.contact || '',
    avatar: '', 
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const result = await updateUser(formData).unwrap();
      setMessage(result.message);
    } catch (err) {
      setError(err.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <Container >
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="profile-container p-4 rounded shadow-lg">
            {/* <h2 className="text-center mb-4">User Profile</h2> */}
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={user?.email}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formContact" className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                />
              </Form.Group>

              <Form.Group controlId="formAvatar" className="mb-4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {formData.avatar && (
                  <div className="mt-3 text-center">
                    <img
                      src={formData.avatar}
                      alt="Profile Preview"
                      className="img-thumbnail"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                )}
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner animation="border" size="sm" /> : 'Update Profile'}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;

// Add accompanying CSS styles to enhance the design.
// You can either use a separate CSS file or a CSS-in-JS approach for the following:
/*
.profile-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-container h2 {
  color: #333;
  font-weight: bold;
}
*/
