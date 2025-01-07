// import React from 'react';
// import { Table, Button, Form } from 'react-bootstrap';
// import {
//   useGetAllProjectsQuery,
//   useUpdateProjectMutation,
//   // useDeleteProjectMutation,
//   useGetStatusOptionsQuery,
// } from '../../redux/features/project/projectApi';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from 'react-toastify';

// const Projects = () => {
//   const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();
//   const { data  } = useGetStatusOptionsQuery(); 
//   const statuses = data?.statuses || [];
//   const [updateProject] = useUpdateProjectMutation();
//   // const [deleteProject] = useDeleteProjectMutation();

//   const handleFieldChange = async (projectId, fieldName, newValue) => {
//     try {
//       await updateProject({ id: projectId, updatedData: { [fieldName]: newValue } }).unwrap();
//       toast.success(`Project ${fieldName} updated successfully!`);
//     } catch (error) {
//       console.error(`Error updating project ${fieldName}:`, error);
//       toast.error(`Failed to update project ${fieldName}`);
//     }
//   };

//   // const handleDelete = async (projectId) => {
//   //   try {
//   //     await deleteProject(projectId).unwrap();
//   //     toast.success('Project deleted successfully!');
//   //   } catch (error) {
//   //     console.error('Error deleting project:', error);
//   //     toast.error('Failed to delete project. Please try again.');
//   //   }
//   // };

//   if (isLoading) return <div>Loading projects...</div>;
//   if (isError) return <div>Error loading projects!</div>;

//  return (
//     <>
//       <ToastContainer /> 

//       <div>
//         <h2>Projects List</h2>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Status</th>
//               {/* <th>Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, index) => (
//               <tr key={project._id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     value={project.title}
//                     onChange={(e) =>
//                       handleFieldChange(project._id, 'title', e.target.value)
//                     }
//                   />
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     value={project.description}
//                     onChange={(e) =>
//                       handleFieldChange(project._id, 'description', e.target.value)
//                     }
//                   />
//                 </td>
//                 <td>
//                   <Form.Control
//                     as="select"
//                     value={project.status}
//                     onChange={(e) =>
//                       handleFieldChange(project._id, 'status', e.target.value)
//                     }
//                   >
//                     {statuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </td>
//                  {/*<td>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDelete(project._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default Projects;

////////////////////////////////////////////////////////////

// import React from 'react';
// import { Table, Form } from 'react-bootstrap';
// import {
//   useGetAllProjectsQuery,
//   useUpdateProjectStatusMutation,
//   useGetStatusOptionsQuery,
// } from '../../redux/features/project/projectApi';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast, ToastContainer } from 'react-toastify';

// const Projects = () => {
//   const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();
//   const { data } = useGetStatusOptionsQuery();
//   const statuses = data?.statuses || [];
//   const [updateProjectStatus] = useUpdateProjectStatusMutation();

//   const handleStatusChange = async (projectId, newStatus) => {
//     try {
//       await updateProjectStatus({ id: projectId, status: newStatus }).unwrap();
//       toast.success(`Project status updated successfully!`);
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       toast.error('Failed to update project status');
//     }
//   };

//   if (isLoading) return <div>Loading projects...</div>;
//   if (isError) return <div>Error loading projects!</div>;

//   return (
//     <>
//       <ToastContainer />
//       <div>
//         <h2>Projects List</h2>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, index) => (
//               <tr key={project._id}>
//                 <td>{index + 1}</td>
//                 <td>{project.title}</td>
//                 <td>{project.description}</td>
//                 <td>
//                   <Form.Control
//                     as="select"
//                     value={project.status}
//                     onChange={(e) => handleStatusChange(project._id, e.target.value)}
//                   >
//                     {statuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default Projects;

import React, { useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import {
  useGetAllProjectsQuery,
  useUpdateProjectStatusMutation,
  useUpdateProjectMutation,
  useGetStatusOptionsQuery,
} from '../../redux/features/project/projectApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye } from 'react-icons/fa';

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();
  const { data } = useGetStatusOptionsQuery();
  const statuses = data?.statuses || [];
  const [updateProjectStatus] = useUpdateProjectStatusMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [updatedData, setUpdatedData] = useState({ title: '', description: '', status: '' });

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus({ id: projectId, status: newStatus }).unwrap();
      toast.success(`Project status updated successfully!`);
    } catch (error) {
      toast.error('Failed to update project status');
    }
  };

  const handleOpenUpdateModal = (project) => {
    setCurrentProject(project);
    setUpdatedData({ title: project.title, description: project.description, status: project.status });
    setShowUpdateModal(true);
  };

  const handleOpenViewModal = (project) => {
    setCurrentProject(project);
    setShowViewModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setCurrentProject(null);
    setUpdatedData({ title: '', description: '', status: '' });
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setCurrentProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProject = async () => {
    try {
      if (currentProject) {
        await updateProject({ id: currentProject._id, updatedData }).unwrap();
        toast.success('Project updated successfully!');
        handleCloseUpdateModal();
      }
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects!</div>;

  return (
    <>
      <ToastContainer />
      <div>
        <h2>Projects List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>{project.title}</td>
                {/* <td>{project.description}</td> */}
                <td>
                  {project.description.length > 35
                    ? `${project.description.substring(0, 35)}...`
                    : project.description}
                </td>
                <td>
                  <Form.Control
                    as="select"
                    value={project.status}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenViewModal(project)}
                    className="me-2"
                    title="View Details"

                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleOpenUpdateModal(project)}
                    title="Edit Project"
                  >
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Update Project Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProjectTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={updatedData.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={updatedData.status}
                onChange={handleInputChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Project Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProject && (
            <>
              <p><strong>Title:</strong> {currentProject.title}</p>
              <p><strong>Description:</strong> {currentProject.description}</p>
              <p><strong>Status:</strong> {currentProject.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Projects;
