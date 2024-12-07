// import React, { useState, useEffect } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import axios from 'axios'; // Ensure axios is imported
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const AdminRequests = () => {
//   const [fetchedRequests, setFetchedRequests] = useState([]);
//   const [fetchedProjects, setFetchedProjects] = useState([]);
//   const [newRequest, setNewRequest] = useState({ projectId: '', amount: '', status: '' });
//   const [showFormForId, setShowFormForId] = useState(null); // State to track which request's form is shown

//   // Fetching projects from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/projects/', {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const data = await response.json();
//         console.log(data);
//         setFetchedProjects(Array.isArray(data) ? data : []); // Set fetched projects to state
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this runs once when the component mounts

//   // Fetching requests from the backend
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/requests'); // Adjust endpoint to fetch requests

//         setFetchedRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRequest((prevRequest) => ({ ...prevRequest, [name]: value }));
//   };

//   // Handle form submission to add new request
//   const handleSubmit = async (e) => {
//     e.preventDefault(newRequest);
//     console.log(newRequest);
//     try {
//       const response = await axios.post('http://localhost:5000/addRequest', newRequest, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setFetchedRequests((prevRequests) => [...prevRequests, response.data]);
//       setShowFormForId(null); // Hide the form after adding the Request
//     } catch (error) {
//       console.error('Error adding Request:', error);
//     }
//   };

//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//         const requestToUpdate = fetchedRequests.find(request => request._id === requestId);
//         const amount = requestToUpdate.amount; // Get the amount from the current request

//         await axios.patch(`http://localhost:5000/updateReq/${requestId}`, {
//             status: newStatus,
//             amount: amount // Include the amount in the request
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//         // Update the local state with the updated project status
//         const updatedRequests = fetchedRequests.map((request) =>
//             request._id === requestId ? { ...request, status: newStatus } : request
//         );
//         setFetchedRequests(updatedRequests);

//         // Set the showFormForId to the requestId if status is "Rejected"
//         if (newStatus === "Rejected") {
//             setShowFormForId(requestId);
//         } else {
//             setShowFormForId(null); // Hide the form for other statuses
//         }
//     } catch (error) {
//         console.error('Error updating project status:', error);
//     }
// };


//   // Function to handle updating reason for rejection
//   const handleReasonChange = async (e, requestId) => {
//     e.preventDefault();
//     const newReason = e.target.reason.value;

//     try {
//         const requestToUpdate = fetchedRequests.find(request => request._id === requestId);
//         const amount = requestToUpdate.amount; // Get the amount from the current request

//         await axios.patch(`http://localhost:5000/updateReq/${requestId}`, {
//             status: "Rejected", // Ensure the status is set to Rejected
//             rejectreason: newReason, // Use rejectreason instead of reason
//             amount: amount // Include the amount in the request
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//         // Update the local state with the updated rejectreason
//         const updatedRequests = fetchedRequests.map((request) =>
//             request._id === requestId ? { ...request, rejectreason: newReason, status: "Rejected" } : request
//         );
//         setFetchedRequests(updatedRequests);
//         setShowFormForId(null); // Hide the form after saving the reason
//     } catch (error) {
//         console.error('Error updating reason:', error);
//     }
// };



//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={12}>
//           <h2>Requests List</h2>
//           <Table striped bordered hover>
//             <thead>
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
//               {fetchedRequests.map((request, index) => (
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
//                       <option value="Accepted">Accept</option>
//                       <option value="Rejected">Reject</option>
//                     </Form.Control>
//                   </td>
//                   <td>
//     {request.status === "Accepted" && (
//         <a
//             href={`https://wa.me/+92${request.userContact}`}
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             {request.userContact}
//         </a>
//     )}
//     {request.status === "Rejected" && request.rejectreason && (
//         <span>{request.rejectreason}</span> // Display reject reason
//     )}
//     {showFormForId === request._id && (
//         <form onSubmit={(e) => handleReasonChange(e, request._id)}>
//             <Form.Control
//                 type="text"
//                 name="reason"
//                 placeholder="Enter reason for rejection"
//                 required
//             />
//             <Button variant="primary" type="submit">
//                 Save Reason
//             </Button>
//         </form>
//     )}
// </td>

//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminRequests;

// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi'; // Adjust import to match your structure
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const AdminRequests = () => {
//   const { token } = useSelector((state) => state.auth);  // Get the token from Redux
//   const { data: requests, isLoading, error } = useGetAllRequestsQuery(token); // Fetch all requests
//   const [updateRequest] = useUpdateRequestMutation(); // Mutation for updating request status

//   const [showFormForId, setShowFormForId] = useState(null); // State to track which request's form is shown

//   // Handle status change for requests
//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       const requestToUpdate = requests.find((request) => request._id === requestId);

//       await updateRequest({
//         id: requestId,
//         requestData: { 
//           status: newStatus, 
//           amount: requestToUpdate.amount // Keep amount in the updated request
//     }}).unwrap();

//       // Set the showFormForId to the requestId if status is "Rejected"
//       if (newStatus === "Rejected") {
//         setShowFormForId(requestId);
//       } else {
//         setShowFormForId(null); // Hide the form for other statuses
//       }
//     } catch (error) {
//       console.error('Error updating request status:', error);
//     }
//   };

//   // Handle reason change when request is rejected
//   const handleReasonChange = async (e, requestId) => {
//     e.preventDefault();
//     const newReason = e.target.reason.value;

//     try {
//       await updateRequest({
//         id: requestId,
//         requestData: { 
//           status: "Rejected",
//           rejectreason: newReason 
//     }}).unwrap();

//       // Update the local state with the updated rejectreason
//       const updatedRequests = requests.map((request) =>
//         request._id === requestId ? { ...request, rejectreason: newReason, status: "Rejected" } : request
//       );

//       // Here we should also update the data with the new rejected reason.
//       setShowFormForId(null); // Hide the form after saving the reason
//     } catch (error) {
//       console.error('Error updating reason:', error);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p className="text-danger">Error fetching data</p>;

//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={12}>
//           <h2>Requests List</h2>
//           <Table striped bordered hover>
//             <thead>
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
//                     {request.status === "Accepted" && (
//                       <a
//                         href={`https://wa.me/+92${request.userContact}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {request.userContact}
//                       </a>
//                     )}
//                     {request.status === "Rejected" && request.rejectreason && (
//                       <span>{request.rejectreason}</span> // Display reject reason
//                     )}
//                     {showFormForId === request._id && (
//                       <form onSubmit={(e) => handleReasonChange(e, request._id)}>
//                         <Form.Control
//                           type="text"
//                           name="reason"
//                           placeholder="Enter reason for rejection"
//                           required
//                         />
//                         <Button variant="primary" type="submit">
//                           Save Reason
//                         </Button>
//                       </form>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminRequests;

// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi'; // Adjust import to match your structure
// import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const AdminRequests = () => {
//   const { token } = useSelector((state) => state.auth); // Get the token from Redux
//   const { data: requests, isLoading, error } = useGetAllRequestsQuery(token); // Fetch all requests
//   const [updateRequest] = useUpdateRequestMutation(); // Mutation for updating request status
//   const [showFormForId, setShowFormForId] = useState(null); // State to track which request's form is shown

//   // Handle status change for requests
//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       const requestToUpdate = requests.find((request) => request._id === requestId);

//       // Call the mutation to update the status
//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: newStatus,
//           amount: requestToUpdate.amount // Keep amount in the updated request
//     }}).unwrap();

//       // Show success toast
//       toast.success('Request status updated successfully!');

//       // Set the showFormForId to the requestId if status is "Rejected"
//       if (newStatus === "Rejected") {
//         setShowFormForId(requestId);
//       } else {
//         setShowFormForId(null); // Hide the form for other statuses
//       }
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       toast.error('Failed to update request status!');
//     }
//   };

//   // Handle reason change when request is rejected
//   const handleReasonChange = async (e, requestId) => {
//     e.preventDefault();
//     const newReason = e.target.reason.value;

//     try {
//       // Call the mutation to update the reject reason
//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: "Rejected",
//           rejectreason: newReason
//     }}).unwrap();

//       // Show success toast
//       toast.success('Rejection reason updated successfully!');

//       // Update the requests state locally (optional)
//       const updatedRequests = requests.map((request) =>
//         request._id === requestId ? { ...request, rejectreason: newReason, status: "Rejected" } : request
//       );

//       // Set the showFormForId to null to hide the form after the update
//       setShowFormForId(null);
//     } catch (error) {
//       console.error('Error updating reason:', error);
//       toast.error('Failed to update rejection reason!');
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p className="text-danger">Error fetching data</p>;

//   return (
//     <div className="mt-4">
//       <Row>
//         <Col md={12}>
//           <h2>Requests List</h2>
//           <Table striped bordered hover>
//             <thead>
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
//                     {request.status === "Accepted" && (
//                       <a
//                         href={`https://wa.me/${request.userContact}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {request.userContact}
//                       </a>
//                     )}
//                     {request.status === "Rejected" && request.rejectreason && (
//                       <span>{request.rejectreason}</span> // Display reject reason
//                     )}
//                     {showFormForId === request._id && (
//                       <form onSubmit={(e) => handleReasonChange(e, request._id)} style={{display:"flex"}}>
//                         <Form.Control
//                           type="text"
//                           name="reason"
//                           placeholder="Enter reason for rejection"
//                           required
//                         />
//                         <Button variant="primary" type="submit">
//                           Save
//                         </Button>
//                       </form>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Toast Container to display toast messages */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminRequests;
//.............................
// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi'; // Adjust import to match your structure
// import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import '../../styles/variables.css';
// import '../../assets/style.css';

// const AdminRequests = () => {
//   const { token } = useSelector((state) => state.auth); // Get the token from Redux
//   const { data: requests, isLoading, error } = useGetAllRequestsQuery(token); // Fetch all requests
//   const [updateRequest] = useUpdateRequestMutation(); // Mutation for updating request status
//   const [showFormForId, setShowFormForId] = useState(null); // State to track which request's form is shown

//   // Handle status change for requests
//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       const requestToUpdate = requests.find((request) => request._id === requestId);

//       // Call the mutation to update the status
//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: newStatus,
//           amount: requestToUpdate.amount // Keep amount in the updated request
//     }}).unwrap();

//       // Show success toast
//       toast.success('Request status updated successfully!');

//       // Set the showFormForId to the requestId if status is "Rejected"
//       if (newStatus === "Rejected") {
//         setShowFormForId(requestId);
//       } else {
//         setShowFormForId(null); // Hide the form for other statuses
//       }
//     } catch (error) {
//       console.error('Error updating request status:', error);
//       toast.error('Failed to update request status!');
//     }
//   };

//   // Handle reason change when request is rejected
//   const handleReasonChange = async (e, requestId) => {
//     e.preventDefault();
//     const newReason = e.target.reason.value;

//     try {
//       // Call the mutation to update the reject reason
//       await updateRequest({
//         id: requestId,
//         requestData: {
//           status: "Rejected",
//           rejectreason: newReason
//     }}).unwrap();

//       // Show success toast
//       toast.success('Rejection reason updated successfully!');

//       // Update the requests state locally (optional)
//       const updatedRequests = requests.map((request) =>
//         request._id === requestId ? { ...request, rejectreason: newReason, status: "Rejected" } : request
//       );

//       // Set the showFormForId to null to hide the form after the update
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
//           <Table striped bordered hover>
//             <thead>
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
//                     {request.status === "Accepted" && (
//                       <a
//                         href={`https://wa.me/${request.userContact}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {request.userContact}
//                       </a>
//                     )}
//                     {request.status === "Rejected" && request.rejectreason && (
//                       <span>{request.rejectreason}</span> // Display reject reason
//                     )}
//                     {showFormForId === request._id && (
//                       <form onSubmit={(e) => handleReasonChange(e, request._id)} style={{display:"flex"}}>
//                         <Form.Control
//                           type="text"
//                           name="reason"
//                           placeholder="Enter reason for rejection"
//                           required
//                         />
//                         <Button variant="primary" type="submit">
//                           Save
//                         </Button>
//                       </form>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Toast Container to display toast messages */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminRequests;

import React, { useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAllRequestsQuery, useUpdateRequestMutation } from '../../redux/features/request/requestApi'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AdminRequests = () => {
  const { token } = useSelector((state) => state.auth); 
  const { data: requests, isLoading, error } = useGetAllRequestsQuery(token); 
  const [updateRequest] = useUpdateRequestMutation(); 
  const [showFormForId, setShowFormForId] = useState(null); 

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const requestToUpdate = requests.find((request) => request._id === requestId);

      await updateRequest({
        id: requestId,
        requestData: {
          status: newStatus,
          amount: requestToUpdate.amount
    }}).unwrap();

      toast.success('Request status updated successfully!');

      if (newStatus === "Rejected") {
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
          status: "Rejected",
          rejectreason: newReason
    }}).unwrap();

      toast.success('Rejection reason updated successfully!');

      const updatedRequests = requests.map((request) =>
        request._id === requestId ? { ...request, rejectreason: newReason, status: "Rejected" } : request
      );

      setShowFormForId(null);
    } catch (error) {
      console.error('Error updating reason:', error);
      toast.error('Failed to update rejection reason!');
    }
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
                <th>Reason, if Rejected / Contact, if Accepted</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request, index) => (
                <tr key={request._id}>
                  <td>{index + 1}</td>
                  <td>{request.requesterName}</td> 
                  <td>{request.projectTitle}</td>
                  <td>{request.description}</td>
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
                    {request.status === "Accepted" && (
                      <a
                        href={`https://wa.me/${request.userContact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {request.userContact}
                      </a>
                    )}
                    {request.status === "Rejected" && request.rejectreason && (
                      <span>{request.rejectreason}</span>
                    )}
                    {showFormForId === request._id && (
                      <form onSubmit={(e) => handleReasonChange(e, request._id)} style={{ display: "flex", gap: "10px" }}>
                        <Form.Control
                          type="text"
                          name="reason"
                          placeholder="Enter reason for rejection"
                          required
                        />
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminRequests;
