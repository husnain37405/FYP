// import React, { useState } from 'react';
// import { Table, Button, Form, Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { 
//   useGetRequesterRequestsQuery, 
//   useUpdateRequesterRequestMutation, 
//   useDeleteRequestMutation ,
  
// } from '../../redux/features/request/requestApi';

// const RequestHistory = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { data: requests, isLoading, error } = useGetRequesterRequestsQuery(token);
  
  
//   const [updateRequest] =  useUpdateRequesterRequestMutation();
//   const [deleteRequest] = useDeleteRequestMutation();

//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     description: '',
//     amount: '',
//   });

//   // Toast Messages
//   const notifySuccess = (message) => toast.success(message);
//   const notifyError = (message) => toast.error(message);

//   // Handle edit button click
//   const handleEditClick = (request) => {
//     if (['Accepted', 'Rejected'].includes(request.status)) return; // Prevent editing for these statuses
//     setEditId(request._id);
//     setFormData({
//       description: request.description || '',
//       amount: request.amount || '',
//     });
//   };

//   // Handle form field changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle save/update button
//   const handleSaveClick = async () => {
//     try {
//       // Pass editId and formData to update the request
//       await updateRequest({ id: editId, requestData: formData }).unwrap();
      
//       // After successful update, show success message
//       notifySuccess('Request updated successfully!');
//       setEditId(null); // Exit edit mode after saving
//     } catch (err) {
//       // Handle error
//       notifyError('Error updating request.');
//       console.error('Update error:', err);  // Log the error for debugging
//     }
//   };

//   // Handle delete button
//   const handleDeleteClick = async (id) => {
//     try {
//       await deleteRequest(id).unwrap();
//       notifySuccess('Request deleted successfully!');
//     } catch (err) {
//       notifyError('Error deleting request.');
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   // Check for error in fetching data
//   if (error) {
//     return (
//       <Container className="mt-4">
//         <h2 className="text-center mb-4">Request History</h2>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//         <p className="text-center text-danger">{error.data?.message || 'An error occurred while fetching requests.'}</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Request History</h2>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

//       {requests?.requests?.length > 0 ? (
//         <Table striped bordered hover responsive className="table-custom">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Project Title</th>
//               <th>Description</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Rejection Reason</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.requests.map((request, index) => (
//               <tr key={request._id}>
//                 <td>{index + 1}</td>
//                 <td>{request.projectTitle || 'Unknown Project'}</td>
//                 {editId === request._id ? (
//                   // Editable row
//                   <>
//                     <td>
//                       <Form.Control
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>
//                       <Form.Control
//                         type="number"
//                         name="amount"
//                         min={1}
//                         value={formData.amount}
//                         onChange={handleInputChange}
//                       />
//                     </td>
//                     <td>{request.status}</td>
//                     <td>{new Date(request.date).toLocaleDateString()}</td>
//                     <td>{request.status === 'Rejected' ? request.rejectReason : 'N/A'}</td>
//                     <td style={{ display: 'flex', gap: '0.5rem' }}>
//                       <Button variant="success" size="sm" onClick={handleSaveClick}>
//                         Save
//                       </Button>
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         onClick={() => setEditId(null)}
//                       >
//                         Cancel
//                       </Button>
//                     </td>
//                   </>
//                 ) : (
//                   // Static row
//                   <>
//                     <td>{request.description}</td>
//                     <td>{request.amount}</td>
//                     <td>{request.status}</td>
//                     <td>{new Date(request.date).toLocaleDateString()}</td>
//                     <td>
//                       {request.status === 'Rejected' ? request.rejectReason || 'N/A' : 'N/A'}
//                     </td>
//                     <td style={{ display: 'flex', gap: '0.5rem' }}>
//                       {!['Accepted', 'Rejected'].includes(request.status) && (
//                         <>
//                           <Button
//                             variant="warning"
//                             size="sm"
//                             onClick={() => handleEditClick(request)}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             size="sm"
//                             onClick={() => handleDeleteClick(request._id)}
//                           >
//                             Delete
//                           </Button>
//                         </>
//                       )}
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p className="text-center text-muted">No requests found.</p>
//       )}
//     </Container>
//   );
// };

// export default RequestHistory;

// import React, { useState } from 'react';
// import { Modal, Button, Table, Form, Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   useGetRequesterRequestsQuery,
//   useUpdateRequesterRequestMutation,
//   useDeleteRequestMutation,
// } from '../../redux/features/request/requestApi';

// const RequestHistory = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { data: requests, isLoading, error } = useGetRequesterRequestsQuery(token);

//   const [updateRequest] = useUpdateRequesterRequestMutation();
//   const [deleteRequest] = useDeleteRequestMutation();

//   const [showModal, setShowModal] = useState(false);
//   const [currentRequest, setCurrentRequest] = useState(null);
//   const [formData, setFormData] = useState({
//     description: '',
//     amount: '',
//   });

//   // Toast Messages
//   const notifySuccess = (message) => toast.success(message);
//   const notifyError = (message) => toast.error(message);

//   // Open Modal with Request Data
//   const handleModalOpen = (request) => {
//     setCurrentRequest(request);
//     setFormData({
//       description: request.description || '',
//       amount: request.amount || '',
//     });
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setCurrentRequest(null);
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle save/update button
//   const handleSaveClick = async () => {
//     try {
//       await updateRequest({ id: currentRequest._id, requestData: formData }).unwrap();
//       notifySuccess('Request updated successfully!');
//       setShowModal(false);
//     } catch (err) {
//       notifyError('Error updating request.');
//       console.error('Update error:', err);
//     }
//   };

//   // Handle delete button
//   const handleDeleteClick = async () => {
//     try {
//       await deleteRequest(currentRequest._id).unwrap();
//       notifySuccess('Request deleted successfully!');
//       setShowModal(false);
//     } catch (err) {
//       notifyError('Error deleting request.');
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   if (error) {
//     return (
//       <Container className="mt-4">
//         <h2 className="text-center mb-4">Request History</h2>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//         <p className="text-center text-danger">
//           {error.data?.message || 'An error occurred while fetching requests.'}
//         </p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Request History</h2>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

//       {requests?.requests?.length > 0 ? (
//         <Table striped bordered hover responsive className="table-custom">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Project Title</th>
//               <th>Description</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.requests.map((request, index) => (
//               <tr key={request._id}>
//                 <td>{index + 1}</td>
//                 <td>{request.projectTitle || 'Unknown Project'}</td>
//                 <td>{request.description}</td>
//                 <td>{request.amount}</td>
//                 <td>{request.status}</td>
//                 <td>{new Date(request.date).toLocaleDateString()}</td>
//                 <td>
//                   <Button
//                     variant="info"
//                     size="sm"
//                     onClick={() => handleModalOpen(request)}
//                   >
//                     <i className="fas fa-eye"></i> View
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <p className="text-center text-muted">No requests found.</p>
//       )}

//       {/* Modal */}
//       <Modal show={showModal} onHide={handleModalClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Request Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentRequest && (
//             <>
//               <Form>
//                 <Form.Group controlId="formDescription">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     disabled={['Accepted', 'Rejected'].includes(currentRequest.status)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formAmount" className="mt-3">
//                   <Form.Label>Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="amount"
//                     min={1}
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     disabled={['Accepted', 'Rejected'].includes(currentRequest.status)}
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formStatus" className="mt-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={currentRequest.status}
//                     disabled
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formDate" className="mt-3">
//                   <Form.Label>Date</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={new Date(currentRequest.date).toLocaleDateString()}
//                     disabled
//                   />
//                 </Form.Group>

//                 {currentRequest.status === 'Rejected' && (
//                   <Form.Group controlId="formRejectReason" className="mt-3">
//                     <Form.Label>Rejection Reason</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={currentRequest.rejectReason || 'N/A'}
//                       disabled
//                     />
//                   </Form.Group>
//                 )}
//               </Form>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="danger"
//             onClick={handleDeleteClick}
//             disabled={['Accepted', 'Rejected'].includes(currentRequest?.status)}
//           >
//             Delete
//           </Button>
//           <Button
//             variant="success"
//             onClick={handleSaveClick}
//             disabled={['Accepted', 'Rejected'].includes(currentRequest?.status)}
//           >
//             Save
//           </Button>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RequestHistory;
//^Important Code

import React, { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useGetRequesterRequestsQuery,
  useUpdateRequesterRequestMutation,
  useDeleteRequestMutation,
} from '../../redux/features/request/requestApi';
import RequestHistoryModal from './Modals/RequestHistoryModal';

const RequesterHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { data: requests, isLoading, error } = useGetRequesterRequestsQuery(token);

  const [updateRequest] = useUpdateRequesterRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();

  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
  });

  // Toast Messages
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // Open Modal with Request Data
  const handleModalOpen = (request) => {
    setCurrentRequest(request);
    setFormData({
      description: request.description || '',
      amount: request.amount || '',
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentRequest(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save/update button
  const handleSaveClick = async () => {
    try {
      await updateRequest({ id: currentRequest._id, requestData: formData }).unwrap();
      notifySuccess('Request updated successfully!');
      setShowModal(false);
    } catch (err) {
      notifyError('Error updating request.');
      console.error('Update error:', err);
    }
  };

  // Handle delete button
  const handleDeleteClick = async () => {
    try {
      await deleteRequest(currentRequest._id).unwrap();
      notifySuccess('Request deleted successfully!');
      setShowModal(false);
    } catch (err) {
      notifyError('Error deleting request.');
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return (
      <Container className="mt-4">
        <h2 className="text-center mb-4">Request History</h2>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <p className="text-center text-danger">
          {error.data?.message || 'An error occurred while fetching requests.'}
        </p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Request History</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {requests?.requests?.length > 0 ? (
        <Table striped bordered hover responsive className="table-custom">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.requests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.projectTitle || 'Unknown Project'}</td>
                <td>{request.description}</td>
                <td>{request.amount}</td>
                <td>{request.status}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleModalOpen(request)}
                  >
                    <i className="fas fa-eye"></i> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted">No requests found.</p>
      )}

      {/* Modal Component */}
      <RequestHistoryModal
        showModal={showModal}
        handleClose={handleModalClose}
        currentRequest={currentRequest}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      />
    </Container>
  );
};

export default RequesterHistory;
