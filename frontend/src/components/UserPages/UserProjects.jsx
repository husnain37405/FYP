import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/variables.css';
import '../../assets/style.css';

const UserProjects = () => {
  const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery(); // Fetch all projects

  // Filter out projects with status 'Completed'
  //const activeProjects = projects.filter((project) => project.status === 'Active');
  const activeProjects = projects.filter(project => !project.isDefault && project.status === 'Active');
  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error fetching projects!</div>;

  return (
    <div className="mt-4">
      <ToastContainer />
      <Row>
        <Col md={12}>
          <h2>Projects List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeProjects.map((project, index) => (
                <tr key={project._id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UserProjects;
