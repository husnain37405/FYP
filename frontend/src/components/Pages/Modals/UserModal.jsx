import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUpdateUserByIdMutation, useDeleteUserByIdMutation } from '../../../redux/features/user/userApi';

const UserModal = ({ show, handleClose, user }) => {
  const [updateUser, { isLoading: updating }] = useUpdateUserByIdMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserByIdMutation();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    contact: user?.contact || '',
    email: user?.email || '',
    roles: user?.roles || '',
    avatar: user?.avatar?.secure_url || '',
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
        setFormData((prev) => ({
          ...prev,
          avatar: { secure_url: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const result = await updateUser({ id: user._id, userData: formData }).unwrap();
      setMessage(result.message);
      toast.success("User updated successfully!");
    } catch (err) {
      setError(err.data?.message || 'Failed to update profile.');
      toast.error("Error updating user.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const result = await deleteUser(user._id).unwrap();
        toast.success(result.message);
        handleClose();
      } catch (err) {
        toast.error(err.data?.message || 'Failed to delete user.');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Enter contact"
            />
          </Form.Group>

          <Form.Group controlId="formAvatar" className="mb-4">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            {formData.avatar?.secure_url && (
              <div className="mt-3 text-center">
                <img
                  src={formData.avatar?.secure_url}
                  alt="Profile Preview"
                  className="img-thumbnail"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
            )}
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            disabled={updating}
          >
            {updating ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>

          <Button
            variant="danger"
            className="w-100"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Spinner animation="border" size="sm" /> : 'Delete User'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
