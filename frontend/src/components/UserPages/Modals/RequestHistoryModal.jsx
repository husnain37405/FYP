import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RequestHistoryModal = ({
  showModal,
  handleClose,
  currentRequest,
  formData,
  handleInputChange,
  handleSaveClick,
  handleDeleteClick,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentRequest && (
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={['Accepted', 'Rejected'].includes(currentRequest.status)}
              />
            </Form.Group>

            <Form.Group controlId="formAmount" className="mt-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                min={1}
                value={formData.amount}
                onChange={handleInputChange}
                disabled={['Accepted', 'Rejected'].includes(currentRequest.status)}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={currentRequest.status}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                value={new Date(currentRequest.date).toLocaleDateString()}
                disabled
              />
            </Form.Group>

            {currentRequest.status === 'Rejected' && (
              <Form.Group controlId="formRejectReason" className="mt-3">
                <Form.Label>Rejection Reason</Form.Label>
                <Form.Control
                  type="text"
                  value={currentRequest.rejectReason || 'N/A'}
                  disabled
                />
              </Form.Group>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={handleDeleteClick}
          disabled={['Accepted', 'Rejected'].includes(currentRequest?.status)}
        >
          Delete
        </Button>
        <Button
          variant="success"
          onClick={handleSaveClick}
          disabled={['Accepted', 'Rejected'].includes(currentRequest?.status)}
        >
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestHistoryModal;