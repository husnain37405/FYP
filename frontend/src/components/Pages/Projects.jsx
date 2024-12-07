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



import React from 'react';
import { Table, Form } from 'react-bootstrap';
import {
  useGetAllProjectsQuery,
  useUpdateProjectStatusMutation,
  useGetStatusOptionsQuery,
} from '../../redux/features/project/projectApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useGetAllProjectsQuery();
  const { data } = useGetStatusOptionsQuery();
  const statuses = data?.statuses || [];
  const [updateProjectStatus] = useUpdateProjectStatusMutation();

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus({ id: projectId, status: newStatus }).unwrap();
      toast.success(`Project status updated successfully!`);
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Failed to update project status');
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
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id}>
                <td>{index + 1}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Projects;
