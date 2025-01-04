// import React, { useState } from 'react';
// import { Form, Button, Table, Row, Col, Card } from 'react-bootstrap';
// import { useGetAllDonationsQuery } from '../../redux/features/donation/donationApi';
// import { useGetAllRequestsQuery } from '../../redux/features/request/requestApi';
// import '../../styles/variables.css';
// import '../../assets/style.css';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const AdminReports = () => {
//   const { data: donations = [], isLoading: loadingDonations } = useGetAllDonationsQuery();
//   const { data: requests = [], isLoading: loadingRequests } = useGetAllRequestsQuery();

//   const [filteredDonations, setFilteredDonations] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [donationFilters, setDonationFilters] = useState({ from: '', to: '' });
//   const [requestFilters, setRequestFilters] = useState({ from: '', to: '' });

//   const handleDonationInputChange = (e) => {
//     const { name, value } = e.target;
//     setDonationFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRequestInputChange = (e) => {
//     const { name, value } = e.target;
//     setRequestFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDonationReport = (e) => {
//     e.preventDefault();
//     const { from, to } = donationFilters;
//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     toDate.setHours(23, 59, 59, 999);

//     const filtered = donations.filter((donation) => {
//       const donationDate = new Date(donation.date);
//       return donationDate >= fromDate && donationDate <= toDate;
//     });

//     setFilteredDonations(filtered);
//   };

//   const handleRequestReport = (e) => {
//     e.preventDefault();
//     const { from, to } = requestFilters;
//     const fromDate = new Date(from);
//     const toDate = new Date(to);
//     toDate.setHours(23, 59, 59, 999);

//     const filtered = requests.filter((request) => {
//       const requestDate = new Date(request.date);
//       return requestDate >= fromDate && requestDate <= toDate;
//     });

//     setFilteredRequests(filtered);
//   };

//   const totalDonatedAmount = filteredDonations.reduce((total, donation) => total + donation.amount, 0);
//   const totalRequestedAmount = filteredRequests.reduce((total, request) => total + request.amount, 0);

//   const handleDownloadPDF = (id, filename) => {
//     const input = document.getElementById(id);
//     html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgWidth = 200;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         pdf.addImage(imgData, 'PNG', 5, 20, imgWidth, imgHeight);
//         pdf.save(filename);
//       })
//       .catch((error) => console.error('Error generating PDF:', error));
//   };

//   if (loadingDonations || loadingRequests) return <div>Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <Card className="shadow-sm p-4">
//         <h2 className="text-center mb-4">Admin Reports</h2>
//         <Row className="mb-4">
//           <Col md={6} sm={12}>
//             <h4>Generate Donation Report</h4>
//             <Form onSubmit={handleDonationReport}>
//               <Row>
//                 <Col md={5}>
//                   <Form.Group className="mb-3" controlId="formFromDate">
//                     <Form.Label>From Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="from"
//                       onChange={handleDonationInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={5}>
//                   <Form.Group className="mb-3" controlId="formToDate">
//                     <Form.Label>To Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="to"
//                       onChange={handleDonationInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6} className="d-flex align-items-end">
//                   <Button variant="primary" type="submit" className="w-100">
//                     Generate Report
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Col>
//           <Col md={6} sm={12}>
//             <h4>Generate Request Report</h4>
//             <Form onSubmit={handleRequestReport}>
//               <Row>
//                 <Col md={5}>
//                   <Form.Group className="mb-3" controlId="formFromDate">
//                     <Form.Label>From Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="from"
//                       onChange={handleRequestInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={5}>
//                   <Form.Group className="mb-3" controlId="formToDate">
//                     <Form.Label>To Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="to"
//                       onChange={handleRequestInputChange}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6} className="d-flex align-items-end">
//                   <Button variant="primary" type="submit" className="w-100">
//                     Generate Report
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Col>
//         </Row>

//         {/* Display Filtered Donations */}
//         {filteredDonations.length > 0 && (
//           <div>
//             <h5 className="text-primary mb-3">Donation Report</h5>
//             <Table striped bordered hover id="donation-table" className="table-responsive">
//               <thead>
//                 <tr>
//                   <th>Project</th>
//                   <th>Donor Name</th>
//                   <th>Amount</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredDonations.map((donation, index) => (
//                   <tr key={index}>
//                     <td>{donation.projectTitle}</td>
//                     <td>{donation.userName}</td>
//                     <td>{donation.amount}</td>
//                     <td>{new Date(donation.date).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td><strong>Total Donated Amount</strong></td>
//                   <td></td>
//                   <td><strong>{totalDonatedAmount}</strong></td>
//                   <td></td>
//                 </tr>
//               </tbody>
//             </Table>
//             <Button variant="secondary" onClick={() => handleDownloadPDF('donation-table', 'donations-report.pdf')} className="w-100">
//               Download PDF
//             </Button>
//           </div>
//         )}

//         {/* Display Filtered Requests */}
//         {filteredRequests.length > 0 && (
//           <div className="mt-5">
//             <h5 className="text-primary mb-3">Request Report</h5>
//             <Table striped bordered hover id="request-table" className="table-responsive">
//               <thead>
//                 <tr>
//                   <th>Requester Name</th>
//                   <th>Project</th>
//                   <th>Amount</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRequests.map((request, index) => (
//                   <tr key={index}>
//                     <td>{request.userName}</td>
//                     <td>{request.projectTitle}</td>
//                     <td>{request.amount}</td>
//                     <td>{new Date(request.date).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td><strong>Total Requested Amount</strong></td>
//                   <td></td>
//                   <td><strong>{totalRequestedAmount}</strong></td>
//                   <td></td>
//                 </tr>
//               </tbody>
//             </Table>
//             <Button variant="secondary" onClick={() => handleDownloadPDF('request-table', 'requests-report.pdf')} className="w-100">
//               Download PDF
//             </Button>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default AdminReports;

import React, { useState } from 'react';
import { Form, Button, Table, Row, Col, Card } from 'react-bootstrap';
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
  const [showDonationReport, setShowDonationReport] = useState(false); // Track visibility of donation report
  const [showRequestReport, setShowRequestReport] = useState(false); // Track visibility of request report

  const handleDonationInputChange = (e) => {
    const { name, value } = e.target;
    setDonationFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestInputChange = (e) => {
    const { name, value } = e.target;
    setRequestFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonationReport = (e) => {
    e.preventDefault();
    const { from, to } = donationFilters;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const filtered = donations.filter((donation) => {
      const donationDate = new Date(donation.date);
      return donationDate >= fromDate && donationDate <= toDate;
    });

    setFilteredDonations(filtered);
    setShowDonationReport(true); // Show donation report after generation
  };

  const handleRequestReport = (e) => {
    e.preventDefault();
    const { from, to } = requestFilters;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const filtered = requests.filter((request) => {
      const requestDate = new Date(request.date);
      return requestDate >= fromDate && requestDate <= toDate;
    });

    setFilteredRequests(filtered);
    setShowRequestReport(true); // Show request report after generation
  };

  const totalDonatedAmount = filteredDonations.reduce((total, donation) => total + donation.amount, 0);
  const totalRequestedAmount = filteredRequests.reduce((total, request) => total + request.amount, 0);

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

  const handleCloseDonationReport = () => {
    setShowDonationReport(false); // Close only the donation report
  };

  const handleCloseRequestReport = () => {
    setShowRequestReport(false); // Close only the request report
  };

  if (loadingDonations || loadingRequests) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4">
        <h2 className="text-center mb-4">Admin Reports</h2>
        <Row className="mb-4">
          <Col md={6} sm={12}>
            <h4>Generate Donation Report</h4>
            <Form onSubmit={handleDonationReport}>
              <Row>
                <Col md={5}>
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
                <Col md={5}>
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
                <Col md={6} className="d-flex align-items-end">
                  <Button variant="primary" type="submit" className="w-100">
                    Generate Report
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={6} sm={12}>
            <h4>Generate Request Report</h4>
            <Form onSubmit={handleRequestReport}>
              <Row>
                <Col md={5}>
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
                <Col md={5}>
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
                <Col md={6} className="d-flex align-items-end">
                  <Button variant="primary" type="submit" className="w-100">
                    Generate Report
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        {/* Display Filtered Donations */}
        {showDonationReport && filteredDonations.length > 0 && (
          <div>
            <h5 className="text-primary mb-3">Donation Report</h5>
            <Table striped bordered hover id="donation-table" className="table-responsive">
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
            <Button variant="secondary" onClick={() => handleDownloadPDF('donation-table', 'donations-report.pdf')} className="w-100">
              Download PDF
            </Button>
            <Button variant="danger" onClick={handleCloseDonationReport} className="mt-4 w-100">
              Close Report
            </Button>
          </div>
        )}

        {/* Display Filtered Requests */}
        {showRequestReport && filteredRequests.length > 0 && (
          <div className="mt-5">
            <h5 className="text-primary mb-3">Request Report</h5>
            <Table striped bordered hover id="request-table" className="table-responsive">
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
            <Button variant="secondary" onClick={() => handleDownloadPDF('request-table', 'requests-report.pdf')} className="w-100">
              Download PDF
            </Button>
            <Button variant="danger" onClick={handleCloseRequestReport} className="mt-4 w-100">
              Close Report
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminReports;
