import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebars/Sidebar';

const RequireAdminAuth = ({ toggleTheme, theme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { user, token } = useSelector((state) => state.auth);

  if (user === undefined || token === undefined) {
    return <div>Loading...</div>;
  }

  const roles = user?.roles || [];
  const isAdmin = roles.includes('Admin'); 

  if (!token || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="admin-dashboard">
      <Topbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme} />
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default RequireAdminAuth;
