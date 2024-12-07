// import React, { useState, useEffect } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const Requests = () => {
//   const [fetchedRequests, setFetchedRequests] = useState([]);
//   const [fetchedProjects, setFetchedProjects] = useState([]);
//   const [newRequest, setNewRequest] = useState({
//     projectId: '',
//     amount: '',
//     status: '',
//     userId: '', // Add userId field
//   });
//   const [showForm, setShowForm] = useState(false); // State to toggle the form
//   const [userId, setUserId] = useState(''); // State to store user ID

//   // Fetching projects from the backend
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/projects/', {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch projects');
//         }

//         const data = await response.json();
//         setFetchedProjects(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []); // Empty dependency array means this runs once when the component mounts

//   // Fetch logged-in user's ID
//   useEffect(() => {
//     const fetchUserId = () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           // Decode the JWT payload
//           const base64Url = token.split('.')[1];
//           const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//           const decodedData = JSON.parse(atob(base64));
//           setUserId(decodedData.id); // Set the user ID
          
//         } catch (error) {
//           console.error('Error decoding token:', error);
//         }
//       }
//     };

//     fetchUserId();
//   }, []);

//   // Fetch and filter requests based on user ID
//   useEffect(() => {
    
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/requests');
//         const requests = response.data;

        
        
//         const filteredRequests = requests.filter(request => request.userId === userId);
//         console.log(filteredRequests);
//         setFetchedRequests(filteredRequests);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     if (userId) {
//       fetchRequests();
//     }
//   }, [userId]); // Refetch requests whenever userId changes

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
//   };

//   // Handle form submission to add new request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const requestWithUserId = { ...newRequest, userId }; // Add user ID to request
//       const response = await axios.post('http://localhost:5000/addRequest', requestWithUserId, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setFetchedRequests((prevRequests) => [...prevRequests, response.data]);
//       setShowForm(false); // Hide the form after adding the request
//     } catch (error) {
//       console.error('Error adding request:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm); // Toggle form visibility
//   };

//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={12}>
//           <Button variant="primary" onClick={toggleForm} className="mb-3">
//             {showForm ? 'Close Request Form' : 'Add New Request'}
//           </Button>

//           {showForm && (
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3" controlId="formProjectId">
//                 <Form.Label>Request ID</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="projectId"
//                   value={newRequest.projectId}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   <option value="" disabled>Select a project</option>
//                   {fetchedProjects.map((project) => (
//                     <option key={project._id} value={project._id}>
//                       {project.title}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formAmount">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="description"
//                   value={newRequest.description}
//                   onChange={handleInputChange}
//                   placeholder="Enter request description, Reason, need and all deatsils"
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formAmount">
//                 <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="amount"
//                   value={newRequest.amount}
//                   onChange={handleInputChange}
//                   placeholder="Enter request amount"
//                   required
//                 />
//               </Form.Group>

             

//               <Button variant="primary" type="submit">
//                 Add Request
//               </Button>
//             </Form>
//           )}
//         </Col>

//         <Col md={12}>
//           <h2>Requests List</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Project</th>
//                 <th>Description</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fetchedRequests.map((request, index) => (
//                 <tr key={request._id}>
//                   <td>{index + 1}</td>
//                   <td>{request.projectTitle}</td>
//                   <td>{request.description}</td>
//                   <td>{request.amount}</td>
//                   <td>{request.status}</td>
//                   <td>{new Date(request.date).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Requests;
