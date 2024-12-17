import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { FaEye } from "react-icons/fa";
import UserModal from "../Modals/UserModal"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DonorTable() {
  const [donorUsers, setDonorUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: usersDetails, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (usersDetails) {
      const donorUsersList = usersDetails.filter(user => user.roles.includes('Donor'));
      setDonorUsers(donorUsersList);
    }
  }, [usersDetails]); 

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
 // if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <>{isLoading?  <p>Loading...</p>:
      <div className="mt-4">
      <ToastContainer />
      <Row>
        <Col md={12} className="mt-4">
          <h2>Donor Users</h2>
          {donorUsers.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donorUsers.map((user, index) => (
                  <tr key={user.id}>
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
                    <td>{user.contact}</td>
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
          ) : (
            <p>No Donor users found</p>
          )}
        </Col>
      </Row>
      {selectedUser && (
        <UserModal
          show={showModal}
          handleClose={handleCloseModal}
          user={selectedUser}
        />
      )}
    </div>
    }
    </>
  );
}

export default DonorTable;
