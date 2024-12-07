// import React, { useState, useEffect } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import axios from 'axios'; // Ensure axios is imported
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const AdminDonations = () => {
//   const [fetchedDonations, setFetchedDonations] = useState([]);
//   const [fetchedProjects, setFetchedProjects] = useState([]);
//   const [newDonation, setNewDonation] = useState({ projectId: '', amount: '', transactionId: '' });
//   const [showForm, setShowForm] = useState(false); // State to toggle the form

//     // Fetching projects from the backend
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('http://localhost:5000/api/projects/all/', {
//               method: 'GET',
//             });
    
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
    
//             const data = await response.json();
//             console.log(data);
//             setFetchedProjects(Array.isArray(data) ? data : []); // Set fetched projects to state
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []); 

//   // Fetching donations from the backend
//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/donations/all'); // Adjust endpoint to fetch donations
        
//         setFetchedDonations(response.data);
//       } catch (error) {
//         console.error('Error fetching donations:', error);
//       }
//     };

//     fetchDonations();
//   }, []);

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonation((prevDonation) => ({ ...prevDonation, [name]: value }));
//   };

//   // Handle form submission to add new donation
//   const handleSubmit = async (e) => {
//     e.preventDefault(newDonation);
//     console.log(newDonation);
//     try {
//       const response = await axios.post('http://localhost:5000/api/donations/add', newDonation, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setFetchedDonations((prevDonations) => [...prevDonations, response.data]);
//       setShowForm(false); // Hide the form after adding the donation
//     } catch (error) {
//       console.error('Error adding donation:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm); // Toggle form visibility
//   };

//   return (
//     <div className="mt-4">
//       <Row>
        
//       <Col md={12}>
//           <Button variant="primary" onClick={toggleForm} className="mb-3">
//             {showForm ? 'Close Donation Form' : 'Add New Donation'}
//           </Button>

//           {showForm && (
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3" controlId="formProjectId">
//                 <Form.Label>Project ID</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="projectId"
//                   value={newDonation.projectId}
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
//                 <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="amount"
//                   value={newDonation.amount}
//                   onChange={handleInputChange}
//                   placeholder="Enter donation amount"
//                   required
//                 />
//               </Form.Group>

           

//               <Button variant="primary" type="submit">
//                 Add Donation
//               </Button>
//             </Form>
//           )}
//         </Col>
//         <Col md={12}>
//           <h2>Donations List</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Project Title</th>
//                 <th>Donor</th>
//                 <th>Amount</th>
//                 <th>Transaction ID</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fetchedDonations.map((donation, index) => (
//                 <tr key={donation._id}> {/* Assuming MongoDB returns _id */}
//                   <td>{index + 1}</td>
//                   <td>{donation.projectTitle}</td>
//                   <td>{donation.userName}</td>
//                   <td>{donation.amount}</td>
//                   <td>{donation.transactionId}</td>
//                   <td>{new Date(donation.date).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminDonations;

import React, { useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useGetAllDonationsQuery, useAddDonationMutation } from '../../redux/features/donation/donationApi'; // Import RTK Query hooks
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi'; // Assuming projects API is set up
import 'react-toastify/dist/ReactToastify.css'; 

const AdminDonations = () => {
  const [newDonation, setNewDonation] = useState({ projectId: '', amount: '', transactionId: '' });
  const [showForm, setShowForm] = useState(false); // State to toggle the form

  const { data: donations, isLoading: donationsLoading, error: donationsError } = useGetAllDonationsQuery();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useGetAllProjectsQuery();
console.log(donations,"DOnato s")
  const [addDonation, { isLoading: isAdding }] = useAddDonationMutation();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prevDonation) => ({ ...prevDonation, [name]: value }));
  };

  // Handle form submission to add new donation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDonation(newDonation).unwrap(); // Add donation using RTK Query
      setNewDonation({ projectId: '', amount: '', transactionId: '' }); // Reset form
      setShowForm(false); // Hide the form after adding the donation

      // Show success toast
      toast.success('Donation added successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error adding donation:', error);

      // Show error toast
      toast.error('Failed to add donation. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  if (donationsLoading || projectsLoading) {
    return <div>Loading...</div>;
  }

  if (donationsError || projectsError) {
    return <div>Error loading data!</div>;
  }

  return (
    <div className="mt-4">
      <ToastContainer />
      <Row>
        <Col md={12}>
          <Button variant="primary" onClick={toggleForm} className="mb-3">
            {showForm ? 'Close Donation Form' : 'Add New Donation'}
          </Button>

          {showForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formProjectId">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  as="select"
                  name="projectId"
                  value={newDonation.projectId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select a project
                  </option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={newDonation.amount}
                  onChange={handleInputChange}
                  placeholder="Enter donation amount"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTransactionId">
                <Form.Label>Transaction ID</Form.Label>
                <Form.Control
                  type="text"
                  name="transactionId"
                  value={newDonation.transactionId}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isAdding}>
                {isAdding ? 'Adding Donation...' : 'Add Donation'}
              </Button>
            </Form>
          )}
        </Col>

        <Col md={12}>
          <h2>Donations List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Title</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.projectTitle}</td>
                  <td>{donation.userName}</td>
                  <td>{donation.amount}</td>
                  <td>{donation.transactionId}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDonations;

