import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAdminAuth from '../layouts/RequireAdminAuth';
import RequireAuth from '../layouts/RequireAuth';
import RootLayout from '../layouts/RootLayout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Service from './Service';
import AdminLogin from './AdminLogin';
import DonorLogin from './DonorLogin';
import RequesterLogin from './RequesterLogin';
import DonorSignup from './DonorSignup';
import RequestSignup from './RequestSignup';
import DashboardCards from '../components/Dashboard/DashboardCards';
import Users from '../components/Pages/Users';
import Projects from '../components/Pages/Projects';
import AdminDonations from '../components/Pages/AdminDonations';
import AdminRequests from '../components/Pages/AdminRequests';
import AddDonation from '../components/UserPages/AddDonation';
import DonationHistory from '../components/UserPages/DonationHistory';
import Profile from '../components/Pages/Profile';
import UserProjects from '../components/UserPages/UserProjects';
import UserProfile from '../components/UserPages/UserProfile';
import AdminReports from '../components/Pages/AdminReports';
import CurrentMonth from '../components/Pages/CurrentMonth';
import NotFound from './NotFound';
import DonorDashboardCards from '../components/UserDashboard/DonorDashboardCards';
import RequesterDashboardCards from '../components/UserDashboard/RequesterDashboardCards';
import DonorTable from '../components/Pages/Tables/DonorTable';
import RequesterTable from '../components/Pages/Tables/RequesterTable'
import AddProject from '../components/Pages/AddProject';
import RequestHistory from '../components/UserPages/RequestHistory';
import AddRequest from '../components/UserPages/AddRequest';
import EditProfile from '../components/EditProfile/EditProfile';

const Dashboard = ({ toggleTheme, theme }) => {
  return (
    <Routes>
      <Route element={<RootLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/requester-login" element={<RequesterLogin />} />
        <Route path="/donor-signup" element={<DonorSignup />} />
        <Route path="/requester-signup" element={<RequestSignup />} />
       
      </Route>

      {/* Admin Pages */}
      <Route element={<RequireAdminAuth toggleTheme={toggleTheme} theme={theme} />}>
        <Route path="/dashboard" element={<DashboardCards />} />
        <Route path="users" element={<Users />} />
        <Route path="donorTable" element={<DonorTable/>}/>
        <Route path="requesterTable" element={<RequesterTable/>}/>
        <Route path='addProject' element={<AddProject/>}/>
        <Route path="projects" element={<Projects />} />
        <Route path="admindonations" element={<AdminDonations />} />
        <Route path="adminrequests" element={<AdminRequests />} />
        <Route path="adminreports" element={<AdminReports />} />
        <Route path="current-month" element={<CurrentMonth />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Donor and Requester Pages */}
      <Route element={<RequireAuth  toggleTheme={toggleTheme} theme={theme} />} >
        <Route path='donor-dashboard' element={<DonorDashboardCards/>}/>
        <Route path='requester-dashboard' element={<RequesterDashboardCards/>}/>
        <Route path="userprojects" element={<UserProjects />} />
        <Route path='addDonation' element={<AddDonation/>}/>
        <Route path='donationHistory' element={<DonationHistory/>}/>
        <Route path="addRequest" element={<AddRequest/>} />
        <Route path="requestHistory" element={<RequestHistory />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path='/edit-profile' element={<EditProfile/>}/>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
