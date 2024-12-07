// import React from 'react';
// import { Table } from 'react-bootstrap';
// import { useGetDonorDonationsQuery } from '../../redux/features/donation/donationApi';

// const DonationHistory = () => {
//   const { data: donations = [], isLoading, error } = useGetDonorDonationsQuery();

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="mt-4">
//       <h2>My Donation History</h2>
//       {donations.length === 0 ? (
//         // If no donations, display the error message
//         <div style={{marginLeft :"22px", marginTop: "60px"}}>{error?.data?.message || "No donations found."}</div>
//       ) : (
//         // If donations exist, display the donation table
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Project</th>
//               <th>Amount</th>
//               <th>Transaction ID</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.map((donation, index) => (
//               <tr key={donation._id}>
//                 <td>{index + 1}</td>
//                 <td>{donation.projectTitle}</td>
//                 <td>{donation.amount}</td>
//                 <td>{donation.transactionId}</td>
//                 <td>{new Date(donation.date).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default DonationHistory;



import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useGetDonorDonationsQuery } from '../../redux/features/donation/donationApi';
import DonationHistoryModal from './Modals/DonationHistoryModal';

const DonationHistory = () => {
  const { data: donations = [], isLoading, error } = useGetDonorDonationsQuery();
  const [showModal, setShowModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);

  // Modal Handlers
  const handleModalOpen = (donation) => {
    setCurrentDonation(donation);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentDonation(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <h2>My Donation History</h2>
      {donations.length === 0 ? (
        <div style={{ marginLeft: '22px', marginTop: '60px' }}>
          {error?.data?.message || 'No donations found.'}
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>{donation.projectTitle}</td>
                <td>{donation.amount}</td>
                <td>{donation.transactionId}</td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleModalOpen(donation)}
                  >
                    <i className="fas fa-eye"></i> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal Component */}
      <DonationHistoryModal
        showModal={showModal}
        handleClose={handleModalClose}
        currentDonation={currentDonation}
      />
    </div>
  );
};

export default DonationHistory;