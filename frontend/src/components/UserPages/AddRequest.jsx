// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { useAddRequestMutation } from '../../redux/features/request/requestApi';
// import { useGetAllProjectsQuery } from '../../redux/features/project/projectApi';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const AddRequest = () => {
//   const [formData, setFormData] = useState({
//     projectId: '',
//     description: '',
//     amount: '',
//   });

//   const dispatch = useDispatch();
//   const [addRequest, { isLoading }] = useAddRequestMutation();
//   const { data: projects = [], isLoading: projectsLoading } = useGetAllProjectsQuery();
//   const defaultProjects = projects.filter(project => project.isDefault);
//   const activeAdminProjects = projects.filter(project => !project.isDefault && project.status === 'Active');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addRequest(formData).unwrap();//Error
//       toast.success('Request added successfully!');
//       setFormData({ projectId: '', description: '', amount: '' });
//     } catch (error) {
//       toast.error(error?.data?.message || 'Failed to add request.');
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="mt-4">
//      <ToastContainer/>
//       <Form.Group controlId="formProjectId">
//         <Form.Label>Request For</Form.Label>
//         <Form.Control
//             as="select"
//             name="projectId"
//             value={formData.projectId}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Choose an Option
//             </option>
//              {defaultProjects.map((project) => (
//               <option key={project._id} value={project._id}>
//                 {project.title}
//               </option>
//             ))}
//             {activeAdminProjects.map((project) => (
//               <option key={project._id} value={project._id}>
//                 {project.title}
//               </option>
//             ))}
//           </Form.Control>
        
//       </Form.Group>

//       <Form.Group controlId="formDescription" className="mt-3">
//         <Form.Label>Description</Form.Label>
//         <Form.Control
//           as="textarea"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           placeholder="Enter request description"
//           rows={3}
//           required
//         />
//       </Form.Group>

//       <Form.Group controlId="formAmount" className="mt-3">
//         <Form.Label>Amount</Form.Label>
//         <Form.Control
//           type="number"
//           name="amount"
//           min={1}
//           value={formData.amount}
//           onChange={handleChange}
//           placeholder="Enter amount"
//           required
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" disabled={isLoading} className="mt-3">
//         {isLoading ? 'Adding...' : 'Add Request'}
//       </Button>
//     </Form>
//   );
// };

// export default AddRequest;

import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
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
  const defaultProjects = projects.filter((project) => project.isDefault);
  const activeAdminProjects = projects.filter(
    (project) => !project.isDefault && project.status === 'Active'
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRequest(formData).unwrap();
      toast.success('Request added successfully!');
      setFormData({ projectId: '', description: '', amount: '' });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add request.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        color: '#343a40',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: "'Poppins', sans-serif",
          color: '#2c3e50',
        }}
      >
        Add a New Request
      </h2>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectId">
          <Form.Label
            style={{
              fontWeight: '600',
              color: '#2c3e50',
            }}
          >
            Request For
          </Form.Label>
          <Form.Control
            as="select"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
            style={{
              border: '1px solid #4e8ca1',
              borderRadius: '8px',
              padding: '10px',
              color: '#495057',
              backgroundColor: '#f8f9fa',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 5px rgba(78, 140, 161, 0.5)')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
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
          <Form.Label
            style={{
              fontWeight: '600',
              color: '#2c3e50',
            }}
          >
            Description
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter request description"
            rows={3}
            required
            style={{
              border: '1px solid #4e8ca1',
              borderRadius: '8px',
              padding: '10px',
              color: '#495057',
              backgroundColor: '#f8f9fa',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 5px rgba(78, 140, 161, 0.5)')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />
        </Form.Group>

        <Form.Group controlId="formAmount" className="mt-3">
          <Form.Label
            style={{
              fontWeight: '600',
              color: '#2c3e50',
            }}
          >
            Amount
          </Form.Label>
          <Form.Control
            type="number"
            name="amount"
            min={1}
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            style={{
              border: '1px solid #4e8ca1',
              borderRadius: '8px',
              padding: '10px',
              color: '#495057',
              backgroundColor: '#f8f9fa',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 5px rgba(78, 140, 161, 0.5)')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#62a9d2',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
              borderRadius: '8px',
              marginTop: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = '#4e8ca1')
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = '#62a9d2')
            }
            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Add Request'
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddRequest;
