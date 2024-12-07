import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import '../../styles/variables.css';
import '../../assets/style.css';
import {useGetAllUsersQuery} from "../../redux/features/user/userApi"

const Users = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
 
const {data:usersDetails} = useGetAllUsersQuery();
console.log(usersDetails, "Users details from useGetAllUsersQuery")
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data, "Data from Users");
        setFetchedUsers(Array.isArray(data) ? data : []); // Set fetched users to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.role) {
      try {
        const response = await fetch('http://localhost:5000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          throw new Error('Failed to add user');
        }

        const data = await response.json();
        console.log('User added:', data);
        setFetchedUsers((prevUsers) => [...prevUsers, { ...newUser, id: prevUsers.length + 1 }]);
        setNewUser({ name: '', email: '', role: '' }); // Clear the form
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

 

  return (
    <div className="mt-4">
      <Row>
        

        <Col md={12} className="mt-4">
          <h2>Users List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
               
              </tr>
            </thead>
            <tbody>
            {usersDetails.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  
                </tr>
              ))} 
              {/* {fetchedUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Users;
