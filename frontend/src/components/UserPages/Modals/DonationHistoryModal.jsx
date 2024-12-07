import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const DonationHistoryModal = ({
  showModal,
  handleClose,
  currentDonation,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Donation Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentDonation && (
          <Table striped bordered>
            <tbody>
              <tr>
                <th>Project</th>
                <td>{currentDonation.projectTitle}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>{currentDonation.amount}</td>
              </tr>
              <tr>
                <th>Transaction ID</th>
                <td>{currentDonation.transactionId}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{new Date(currentDonation.date).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationHistoryModal;