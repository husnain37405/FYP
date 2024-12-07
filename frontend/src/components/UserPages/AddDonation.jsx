import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useAddDonationMutation } from '../../redux/features/donation/donationApi';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51QClnh003VHeQywVmmO8Gf0qPsjQ2jLl1kc8jQGfVyFQij2xqOSrGOPlZEk4ivDeqvYK10c9pTEf4KnWU7OUxbK000TPiULd6E');

const AddDonation = () => {
  const [newDonation, setNewDonation] = useState({ projectId: '', amount: '', transactionId: '' });
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
  const [addDonation] = useAddDonationMutation();
  const [searchParams] = useSearchParams();
  // const activeProjects = projects.filter((project) => project.status === 'Active');
  const defaultProjects = projects.filter(project => project.isDefault);
  const activeAdminProjects = projects.filter(project => !project.isDefault && project.status === 'Active');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const stripe = await stripePromise;
      const response = await addDonation(newDonation).unwrap();
      await stripe.redirectToCheckout({ sessionId: response.sessionId });
    } catch (error) {
      console.error('Error adding donation:', error);
      toast.error('Failed to add donation. Please try again.');
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast.success('Thank you! Your donation has been processed successfully.');
    }
  }, [searchParams]);

  if (projectsLoading) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <ToastContainer />
      {/* <h2>Add Donation</h2> */}
      <h2>Donation Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formProjectId">
          <Form.Label>Donations For</Form.Label>
          <Form.Control
            as="select"
            name="projectId"
            value={newDonation.projectId}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Choose an Option
            </option>
            {/* {activeProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))} */}
             {defaultProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
            {activeAdminProjects.map((project) => (
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
            min="1" 
            value={newDonation.amount}
            onChange={handleInputChange}
            placeholder="Enter donation amount"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Donation
        </Button>
      </Form>
    </div>
  );
};

export default AddDonation;
