import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";

function RequesterTable() {
  const [donorUsers, setDonorUsers] = useState([]);

  const { data: usersDetails, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (usersDetails) {
      const donorUsersList = usersDetails.filter(user => user.roles.includes('Requester'));
      setDonorUsers(donorUsersList);
    }
  }, [usersDetails]); 

 // if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <>{isLoading?  <p>Loading...</p>:
      <div className="mt-4">
      <Row>
        <Col md={12} className="mt-4">
          <h2>Requester Users</h2>
          {donorUsers.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {donorUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No Donor users found</p>
          )}
        </Col>
      </Row>
    </div>
    }
    </>
  );
}

export default RequesterTable;
