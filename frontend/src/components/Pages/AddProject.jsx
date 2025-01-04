import React, { useState } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { useAddProjectMutation, useGetStatusOptionsQuery } from '../../redux/features/project/projectApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProject = ({ onProjectAdded }) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: '',
  });

  const { data, isLoading, error } = useGetStatusOptionsQuery();
  const statuses = data?.statuses || [];
  const [addProject] = useAddProjectMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedProject = await addProject(newProject).unwrap();
      setNewProject({ title: '', description: '', status: '' }); // Reset form
      if (onProjectAdded) onProjectAdded(addedProject); // Callback to update parent

      // Show success toast
      toast.success('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);

      // Show error toast in case of failure
      toast.error('Failed to add project. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />

      <Row className="justify-content-center ">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Add New Project</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    placeholder="Enter project description"
                    required
                    rows={4}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  {isLoading ? (
                    <p>Loading statuses...</p>
                  ) : error ? (
                    <p className="text-danger">Error fetching statuses</p>
                  ) : (
                    <Form.Control
                      as="select"
                      name="status"
                      value={newProject.status}
                      onChange={handleInputChange}
                      required
                      className="form-control-lg"
                    >
                      <option value="" disabled>
                        Select project status
                      </option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Control>
                  )}
                </Form.Group>

                <div className="d-grid gap-2 mt-3">
                  <Button variant="primary" type="submit" size="lg">
                    Add Project
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddProject;
