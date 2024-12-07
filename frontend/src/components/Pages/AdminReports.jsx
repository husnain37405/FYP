import React, { useState } from 'react';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import { useGetAllDonationsQuery } from '../../redux/features/donation/donationApi';
import { useGetAllRequestsQuery } from '../../redux/features/request/requestApi';
import '../../styles/variables.css';
import '../../assets/style.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminReports = () => {
  const { data: donations = [], isLoading: loadingDonations } = useGetAllDonationsQuery();
  const { data: requests = [], isLoading: loadingRequests } = useGetAllRequestsQuery();

  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [donationFilters, setDonationFilters] = useState({ from: '', to: '' });
  const [requestFilters, setRequestFilters] = useState({ from: '', to: '' });

  // Handle input change for filters
  const handleDonationInputChange = (e) => {
    const { name, value } = e.target;
    setDonationFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestInputChange = (e) => {
    const { name, value } = e.target;
    setRequestFilters((prev) => ({ ...prev, [name]: value }));
  };


  // Handle donation report generation
  const handleDonationReport = (e) => {
    e.preventDefault();
    const { from, to } = donationFilters;
    const fromDate = new Date(from);
    const toDate = new Date(to);
 
    toDate.setHours(23, 59, 59, 999);

    const filtered = donations.filter((donation) => {
    
      const donationDate = new Date(donation.date); // Assuming donations have a `date` field
      return donationDate >= fromDate && donationDate <= toDate;
    });

    setFilteredDonations(filtered);
  };

  // Handle request report generation
  const handleRequestReport = (e) => {
    e.preventDefault();
    const { from, to } = requestFilters;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const filtered = requests.filter((request) => {
      const requestDate = new Date(request.date); // Assuming requests have a `date` field
      return requestDate >= fromDate && requestDate <= toDate;
    });

    setFilteredRequests(filtered);
  };

  // Calculate total amounts
  const totalDonatedAmount = filteredDonations.reduce((total, donation) => total + donation.amount, 0);
  const totalRequestedAmount = filteredRequests.reduce((total, request) => total + request.amount, 0);

  // Handle PDF downloads
  const handleDownloadPDF = (id, filename) => {
    const input = document.getElementById(id);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 5, 20, imgWidth, imgHeight);
        pdf.save(filename);
      })
      .catch((error) => console.error('Error generating PDF:', error));
  };

  if (loadingDonations || loadingRequests) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      {/* Donation Report Form */}
      <form onSubmit={handleDonationReport}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formFromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                name="from"
                onChange={handleDonationInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formToDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                name="to"
                onChange={handleDonationInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Label>Action</Form.Label>
            <br />
            <Button variant="primary" type="submit">
              Generate Donations Report
            </Button>
          </Col>
        </Row>
      </form>

      {/* Display Filtered Donations */}
      {filteredDonations.length > 0 && (
        <div>
          <h4>Filtered Donations</h4>
          <Table striped bordered hover id="donation-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Donor Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.projectTitle}</td>
                  <td>{donation.userName}</td>
                  <td>{donation.amount}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total Donated Amount</strong></td>
                <td></td>
                <td><strong>{totalDonatedAmount}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => handleDownloadPDF('donation-table', 'donations-report.pdf')}>
            Print Report
          </Button>
        </div>
      )}

      {/* Request Report Form */}
      <form onSubmit={handleRequestReport}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formFromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                name="from"
                onChange={handleRequestInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="formToDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                name="to"
                onChange={handleRequestInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Label>Action</Form.Label>
            <br />
            <Button variant="primary" type="submit">
              Generate Requests Report
            </Button>
          </Col>
        </Row>
      </form>

      {/* Display Filtered Requests */}
      {filteredRequests.length > 0 && (
        <div>
          <h4>Filtered Requests</h4>
          <Table striped bordered hover id="request-table">
            <thead>
              <tr>
                <th>Requester Name</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.userName}</td>
                  <td>{request.projectTitle}</td>
                  <td>{request.amount}</td>
                  <td>{new Date(request.date).toLocaleDateString()}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total Requested Amount</strong></td>
                <td></td>
                <td><strong>{totalRequestedAmount}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => handleDownloadPDF('request-table', 'requests-report.pdf')}>
            Print Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
