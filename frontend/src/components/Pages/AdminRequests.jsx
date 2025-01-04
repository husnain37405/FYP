// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi'; 
// import { toast, ToastContainer } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; 

// const AdminRequests = () => {
//   const { token } = useSelector((state) => state.auth); 
//   const { data: requests, isLoading, error } = useGetAllRequestsQuery(token); 
//   const [updateRequest] = useUpdateRequestMutation(); 
//   const [showFormForId, setShowFormForId] = useState(null); 
//   console.log(requests)
//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       const requestToUpdate = requests.find((request) => request._id === requestId);

//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: newStatus,
//           amount: requestToUpdate.amount
//     }}).unwrap();

//       toast.success('Request status updated successfully!');

//       if (newStatus === "Rejected") {
//         setShowFormForId(requestId);
//       } else {
//         setShowFormForId(null); 
//       }
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       toast.error('Failed to update request status!');
//     }
//   };

//   const handleReasonChange = async (e, requestId) => {
//     e.preventDefault();
//     const newReason = e.target.reason.value;

//     try {
//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: "Rejected",
//           rejectReason: newReason
//     }}).unwrap();

//       toast.success('Rejection reason updated successfully!');

//       const updatedRequests = requests.map((request) =>
//         request._id === requestId ? { ...request, rejectReason: newReason, status: "Rejected" } : request
//       );

//       setShowFormForId(null);
//     } catch (error) {
//       console.error('Error updating reason:', error);
//       toast.error('Failed to update rejection reason!');
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   if (error) {
//     const errorMessage = error.data?.message || 'Error fetching data';
//     return <p className="text-danger">{errorMessage}</p>;
//   }

//   if (!requests || requests.length === 0) {
//     return <p className="text-danger">No requests available.</p>;
//   }

//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={12}>
//           <h2>Requests List</h2>
//           <Table striped bordered hover responsive>
//             <thead className="bg-light">
//               <tr>
//                 <th>ID</th>
//                 <th>Requester</th> 
//                 <th>Project</th>
//                 <th>Description</th>
//                 <th>Amount</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Reason, if Rejected / Contact, if Accepted</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests?.map((request, index) => (
//                 <tr key={request._id}>
//                   <td>{index + 1}</td>
//                   <td>{request.requesterName}</td> 
//                   <td>{request.projectTitle}</td>
//                   <td>{request.description}</td>
//                   <td>{request.amount}</td>
//                   <td>{new Date(request.date).toLocaleDateString()}</td>
//                   <td>
//                     <Form.Control
//                       as="select"
//                       value={request.status}
//                       onChange={(e) => handleStatusChange(request._id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                     </Form.Control>
//                   </td>
//                   <td>
//                   {request.status === "Accepted" && (
//                       <a
//                         href={`https://wa.me/${request.userContact}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {request.userContact}
//                       </a>
//                     )}
//   {request.status === "Rejected" && (
//     <span>{request.rejectReason || 'N/A'}</span>
//   )}
//   {showFormForId === request._id && (
//     <form onSubmit={(e) => handleReasonChange(e, request._id)} style={{ display: "flex", gap: "10px" }}>
//       <Form.Control
//         type="text"
//         name="reason"
//         placeholder="Enter reason for rejection"
//         required
//       />
//       <Button variant="primary" type="submit">
//         Save
//       </Button>
//     </form>
//   )}
// </td>

//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminRequests;

import React, { useState } from 'react';
import { Form, Button, Table, Row, Col, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa'; // Eye icon for the view button

const AdminRequests = () => {
  const { token } = useSelector((state) => state.auth);
  const { data: requests, isLoading, error } = useGetAllRequestsQuery(token);
  const [updateRequest] = useUpdateRequestMutation();
  const [showFormForId, setShowFormForId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // For modal display
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const requestToUpdate = requests.find((request) => request._id === requestId);

      await updateRequest({
        id: requestId,
        requestData: {
          status: newStatus,
          amount: requestToUpdate.amount,
        },
      }).unwrap();

      toast.success('Request status updated successfully!');

      if (newStatus === 'Rejected') {
        setShowFormForId(requestId);
      } else {
        setShowFormForId(null);
      }
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Failed to update request status!');
    }
  };

  const handleReasonChange = async (e, requestId) => {
    e.preventDefault();
    const newReason = e.target.reason.value;

    try {
      await updateRequest({
        id: requestId,
        requestData: {
          status: 'Rejected',
          rejectReason: newReason,
        },
      }).unwrap();

      toast.success('Rejection reason updated successfully!');

      setShowFormForId(null);
    } catch (error) {
      console.error('Error updating reason:', error);
      toast.error('Failed to update rejection reason!');
    }
  };

  const handleShowModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    const errorMessage = error.data?.message || 'Error fetching data';
    return <p className="text-danger">{errorMessage}</p>;
  }

  if (!requests || requests.length === 0) {
    return <p className="text-danger">No requests available.</p>;
  }

  return (
    <div className="mt-4">
      <Row>
        <Col md={12}>
          <h2>Requests List</h2>
          <Table striped bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Requester</th>
                <th>Project</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th> {/* For the view button */}
              </tr>
            </thead>
            <tbody>
              {requests?.map((request, index) => (
                <tr key={request._id}>
                  <td>{index + 1}</td>
                  <td>{request.requesterName}</td>
                  <td>{request.projectTitle}</td>
                  <td>
                    {request.description.length > 15
                      ? `${request.description.slice(0, 15)}...`
                      : request.description}
                  </td>
                  <td>{request.amount}</td>
                  <td>{new Date(request.date).toLocaleDateString()}</td>
                  <td>
                    <Form.Control
                      as="select"
                      value={request.status}
                      onChange={(e) => handleStatusChange(request._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </Form.Control>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowModal(request)}
                      className="d-flex align-items-center"
                       title="View Details"
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

      {/* Modal for viewing full details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p>
                <strong>Requester:</strong> {selectedRequest.requesterName}
              </p>
              <p>
                <strong>Project:</strong> {selectedRequest.projectTitle}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description}
              </p>
              <p>
                <strong>Amount:</strong> {selectedRequest.amount}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(selectedRequest.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default AdminRequests;
