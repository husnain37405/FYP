import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios'; // Ensure axios is imported
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas
import '../../styles/variables.css';
import '../../assets/style.css';

const CurrentMonth = () => {
  const [fetchedRequests, setFetchedRequests] = useState([]);
  const [fetchedDonations, setFetchedDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  // Function to get the current month date range
  const getCurrentMonthRange = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from: startOfMonth, to: endOfMonth };
  };

  // Fetching donations from the backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/donations/');
        setFetchedDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  // Fetching requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/requests');
        setFetchedRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Filter donations and requests based on the current month
  useEffect(() => {
    const { from, to } = getCurrentMonthRange();

    // Filter donations
    const filteredDonations = fetchedDonations.filter((donation) => {
      const donationDate = new Date(donation.date);
      return donationDate >= from && donationDate <= to;
    });
    setFilteredDonations(filteredDonations);

    // Filter requests
    const filteredRequests = fetchedRequests.filter((request) => {
      const requestDate = new Date(request.date);
      return requestDate >= from && requestDate <= to;
    });
    setFilteredRequests(filteredRequests);
  }, [fetchedDonations, fetchedRequests]);

  // Calculate total donated amount
  const totalDonatedAmount = filteredDonations.reduce((total, donation) => total + donation.amount, 0);

  // Calculate total requested amount
  const totalRequestedAmount = filteredRequests.reduce((total, request) => total + request.amount, 0);

  // Handle PDF download for donations
  const handleDownloadPDF = () => {
    const input = document.getElementById('donation-table');
    
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 5, 20, imgWidth, imgHeight);
        pdf.save('current-month-donations-report.pdf');
      })
      .catch((error) => console.error('Error generating PDF:', error));
  };

  // Handle PDF download for requests
  const handleDownloadRequestsPDF = () => {
    const input = document.getElementById('request-table');
    
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 200;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 5, 20, imgWidth, imgHeight);
        pdf.save('current-month-requests-report.pdf');
      })
      .catch((error) => console.error('Error generating PDF:', error));
  };

  return (
    <div className="mt-4">
      {/* Display Filtered Donations */}
      {filteredDonations.length > 0 && (
        <div>
          <h4>Current Month Donations</h4>
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

          {/* Print Report Button */}
          <Button variant="primary" onClick={handleDownloadPDF}>
            Print Donations Report
          </Button>
        </div>
      )}

      {/* Display Filtered Requests */}
      {filteredRequests.length > 0 && (
        <div>
          <h4>Current Month Requests</h4>
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

          {/* Print Report Button */}
          <Button variant="primary" onClick={handleDownloadRequestsPDF}>
            Print Requests Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurrentMonth;
