// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { useGetAllDonationsQuery, useAddDonationMutation } from '../../redux/features/donation/donationApi';
// import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi'; 
// import 'react-toastify/dist/ReactToastify.css'; 

// const AdminDonations = () => {
//   const [newDonation, setNewDonation] = useState({ projectId: '', amount: '', transactionId: '' });
//   const [showForm, setShowForm] = useState(false); 

//   const { data: donations, isLoading: donationsLoading, error: donationsError } = useGetAllDonationsQuery();
//   const { data: projects, isLoading: projectsLoading, error: projectsError } = useGetAllProjectsQuery();
// console.log(donations,"DOnato s")
//   const [addDonation, { isLoading: isAdding }] = useAddDonationMutation();

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonation((prevDonation) => ({ ...prevDonation, [name]: value }));
//   };

//   // Handle form submission to add new donation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await addDonation(newDonation).unwrap(); // Add donation using RTK Query
//       setNewDonation({ projectId: '', amount: '', transactionId: '' }); // Reset form
//       setShowForm(false); // Hide the form after adding the donation

//       // Show success toast
//       toast.success('Donation added successfully!', {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error('Error adding donation:', error);

//       // Show error toast
//       toast.error('Failed to add donation. Please try again.', {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//       });
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm); // Toggle form visibility
//   };

//   if (donationsLoading || projectsLoading) {
//     return <div>Loading...</div>;
//   }

//   if (donationsError || projectsError) {
//     return <div>Error loading data!</div>;
//   }

//   return (
//     <div className="mt-4">
//       <ToastContainer />
//       <Row>
//         <Col md={12}>
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
//                   <option value="" disabled>
//                     Select a project
//                   </option>
//                   {projects.map((project) => (
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

//               <Form.Group className="mb-3" controlId="formTransactionId">
//                 <Form.Label>Transaction ID</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="transactionId"
//                   value={newDonation.transactionId}
//                   onChange={handleInputChange}
//                   placeholder="Enter transaction ID"
//                   required
//                 />
//               </Form.Group>

//               <Button variant="primary" type="submit" disabled={isAdding}>
//                 {isAdding ? 'Adding Donation...' : 'Add Donation'}
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
//               {donations.map((donation, index) => (
//                 <tr key={donation._id}>
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
import { Form, Button, Table, Row, Col, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useGetAllDonationsQuery, useAddDonationMutation } from '../../redux/features/donation/donationApi';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi'; 
import { FaEye } from 'react-icons/fa'; 
import 'react-toastify/dist/ReactToastify.css';

const AdminDonations = () => {
  const [newDonation, setNewDonation] = useState({ projectId: '', amount: '', transactionId: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: donations, isLoading: donationsLoading, error: donationsError } = useGetAllDonationsQuery();
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useGetAllProjectsQuery();

  const [addDonation, { isLoading: isAdding }] = useAddDonationMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prevDonation) => ({ ...prevDonation, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDonation(newDonation).unwrap();
      setNewDonation({ projectId: '', amount: '', transactionId: '' });
      setShowAddModal(false);
      toast.success('Donation added successfully!', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    } catch (error) {
      console.error('Error adding donation:', error);
      toast.error('Failed to add donation. Please try again.', { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 });
    }
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setSelectedDonation(null);
    setShowViewModal(false);
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

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
        <Col md={12} className="d-flex justify-content-between align-items-center mb-3">
          <h2>Donations List</h2>
          <Button variant="primary" onClick={handleShowAddModal}>
            Add Donation
          </Button>
        </Col>
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Title</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.projectTitle}</td>
                  <td>{donation.userName}</td>
                  <td>{donation.amount}</td>
                  <td>
                    {donation.transactionId.length > 15
                      ? `${donation.transactionId.substring(0, 15)}...`
                      : donation.transactionId}
                  </td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleViewDonation(donation)}
                      className="d-flex align-items-center"
                    >
                      <FaEye className="me-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Donation Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProjectId">
              <Form.Label>Project</Form.Label>
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
              {isAdding ? 'Adding...' : 'Add Donation'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

     
      {selectedDonation && (
        <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Donation Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Project Title:</strong> {selectedDonation.projectTitle}</p>
            <p><strong>Donor:</strong> {selectedDonation.userName}</p>
            <p><strong>Amount:</strong> {selectedDonation.amount}</p>
            <p><strong>Transaction ID:</strong> <span style={{ wordBreak: 'break-word' }}>{selectedDonation.transactionId}</span></p>
            <p><strong>Date:</strong> {new Date(selectedDonation.date).toLocaleDateString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
     
    </div>
  );
};

export default AdminDonations;
