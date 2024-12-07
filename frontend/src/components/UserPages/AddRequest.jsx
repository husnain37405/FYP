import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAddRequestMutation } from '../../redux/features/request/requestApi';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddRequest = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    description: '',
    amount: '',
  });

  const dispatch = useDispatch();
  const [addRequest, { isLoading }] = useAddRequestMutation();
  const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
  const defaultProjects = projects.filter(project => project.isDefault);
  const activeAdminProjects = projects.filter(project => !project.isDefault && project.status === 'Active');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRequest(formData).unwrap();//Error
      toast.success('Request added successfully!');
      setFormData({ projectId: '', description: '', amount: '' });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add request.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
     <ToastContainer/>
      <Form.Group controlId="formProjectId">
        <Form.Label>Request For</Form.Label>
        <Form.Control
            as="select"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose an Option
            </option>
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

      <Form.Group controlId="formDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter request description"
          rows={3}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAmount" className="mt-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          min={1}
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading} className="mt-3">
        {isLoading ? 'Adding...' : 'Add Request'}
      </Button>
    </Form>
  );
};

export default AddRequest;
