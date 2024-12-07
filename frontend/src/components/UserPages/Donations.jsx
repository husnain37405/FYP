import React, { useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useAddDonationMutation, useGetDonorDonationsQuery } from '../../redux/features/donation/donationApi';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/variables.css';
import '../../assets/style.css';

const stripePromise = loadStripe('pk_test_51QClnh003VHeQywVmmO8Gf0qPsjQ2jLl1kc8jQGfVyFQij2xqOSrGOPlZEk4ivDeqvYK10c9pTEf4KnWU7OUxbK000TPiULd6E');

const Donations = () => {
  const [newDonation, setNewDonation] = useState({ projectId: '', amount: '' });
  const [showForm, setShowForm] = useState(false);

  // RTK Query Hooks
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
  const { data: donations = [], isLoading: donationsLoading } = useGetDonorDonationsQuery();
  const [addDonation] = useAddDonationMutation();
 
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const stripe = await stripePromise;
      const response = await addDonation(newDonation).unwrap(); // RTK Query mutation
      // const response = await addDonation({ ...newDonation, userId });
      console.log("THis is a add new donation response",response)
      await stripe.redirectToCheckout({ sessionId: response.sessionId }); // Redirect to Stripe checkout
      toast.success('Donation successfully added!');
    } catch (error) {
      console.error('Error adding donation:', error);
      toast.error('Failed to add donation. Please try again.');
    }
  };

  // Toggle donation form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (projectsLoading || donationsLoading) return <div>Loading...</div>;

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
               
              {/* <Form.Group className="mb-3" controlId="formTransactionId">
                <Form.Label>Transaction ID</Form.Label>
                <Form.Control
                  type="number"
                  name="transactionId"
                  value={newDonation.transactionId}
                  onChange={handleInputChange}
                  placeholder="Enter transaction ID"
                  required
                />
              </Form.Group> */}

              <Button variant="primary" type="submit">
                Add Donation
              </Button>
            </Form>
          )}
        </Col>

        <Col md={12}>
          <h2>Your Donation History</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Project</th>
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

export default Donations;
