import React, { useState } from "react";
import { Row, Col, Table, Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllUsersQuery } from "../../redux/features/user/userApi";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import UserModal from "./Modals/UserModal";

const Users = () => {
  const { data: usersDetails, refetch } = useGetAllUsersQuery();
  const [registerUser, { isLoading: registering }] = useRegisterUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    roles: [],
    contact: "",
  });

  const [error, setError] = useState(null);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
    setError(null);
    setNewUser({
      name: "",
      email: "",
      password: "",
      roles: [],
      contact: "",
    });
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setNewUser((prev) => ({
      ...prev,
      roles: [e.target.value],
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userPayload = {
        ...newUser,
        role: newUser.roles[0],
      };

      const result = await registerUser(userPayload).unwrap();
      toast.success(result.message || "User created successfully!");

      refetch();
      handleCloseCreateModal();
    } catch (err) {
      const errorMessage = err.data?.message || "Failed to create user.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-4">
      <ToastContainer />
      <Row>
        <Col md={12} className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Users List</h2>
            <Button variant="success" onClick={handleShowCreateModal}>
              Add New User
            </Button>
          </div>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersDetails?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {user?.avatar?.secure_url ? (
                      <img
                        src={user?.avatar?.secure_url || "http://localhost:5000/static/uploads/users/default.png"}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <div
                        className="avatar-placeholder"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#4285F4",
                          color: "white",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.name ? user.name[0] : ""}
                      </div>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles?.join(", ")}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowModal(user)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* User Modal */}
      {selectedUser && (
        <UserModal
          show={showModal}
          handleClose={handleCloseModal}
          user={selectedUser}
        />
      )}

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create or Update User Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleCreateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={newUser.contact}
                onChange={handleInputChange}
                placeholder="Enter contact"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="roles"
                value={newUser.roles[0] || ""}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                <option value="Donor">Donor</option>
                <option value="Requester">Requester</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={registering}
            >
              {registering ? <Spinner animation="border" size="sm" /> : "Create or Update User Roles"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
