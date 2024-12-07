// import React, {useState} from 'react'
// import { Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Topbar from '../components/Topbar/Topbar';
// import DonorSidebar from '../components/Sidebars/UserSidebars/DonorSidebar';
// import RequesterSidebar from '../components/Sidebars/UserSidebars/RequesterSidebar';

// function RequireAuth({ toggleTheme, theme }) {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const currentRole = useSelector((state) => state.auth.currentRole)
//     console.log("This is currentRole from UserDashboard Layout", currentRole)
//     const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//     const renderSidebar = () => {
//         if (currentRole?.includes('Donor')) {
//             return <DonorSidebar isOpen={isSidebarOpen} />;
//         }
//         if (currentRole?.includes('Requester')) {
//             return <RequesterSidebar isOpen={isSidebarOpen} />;
//         }
//         return null;
//     };
//     return (
//         <div className="user-dashboard">
//             <Topbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme} />
//             {renderSidebar()}
//             <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default RequireAuth

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import Topbar from '../components/Topbar/Topbar';
// import DonorSidebar from '../components/Sidebars/UserSidebars/DonorSidebar';
// import RequesterSidebar from '../components/Sidebars/UserSidebars/RequesterSidebar';

// function RequireAuth({ toggleTheme, theme }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Access token and currentRole from Redux store
//   const token = useSelector((state) => state.auth.token);
//   const currentRole = useSelector((state) => state.auth.currentRole);

//   console.log("Current Role from User Dashboard Layout:", currentRole);

//   // Sidebar toggle logic
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Render Sidebar based on role
//   const renderSidebar = () => {
//     if (currentRole?.includes('Donor')) {
//       return <DonorSidebar isOpen={isSidebarOpen} />;
//     }
//     if (currentRole?.includes('Requester')) {
//       return <RequesterSidebar isOpen={isSidebarOpen} />;
//     }
//     return null;
//   };

//   // Redirect logic
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!currentRole || (!currentRole.includes('Donor') && !currentRole.includes('Requester'))) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return (
//     <div className="user-dashboard">
//       <Topbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme} />
//       {renderSidebar()}
//       <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default RequireAuth;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar/Topbar';
import DonorSidebar from '../components/Sidebars/UserSidebars/DonorSidebar';
import RequesterSidebar from '../components/Sidebars/UserSidebars/RequesterSidebar';

function RequireAuth({ toggleTheme, theme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Access token and currentRole from Redux store
  const token = useSelector((state) => state.auth.token);
  const currentRole = useSelector((state) => state.auth.currentRole);

  // Get the current location
  const location = useLocation();

  console.log("Current Role from User Dashboard Layout:", currentRole);

  // Sidebar toggle logic
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Render Sidebar based on role
  const renderSidebar = () => {
    if (currentRole?.includes('Donor')) {
      return <DonorSidebar isOpen={isSidebarOpen} />;
    }
    if (currentRole?.includes('Requester')) {
      return <RequesterSidebar isOpen={isSidebarOpen} />;
    }
    return null;
  };

  // Redirect logic based on missing token and route
  if (!token) {
    if (location.pathname.startsWith('/donor-dashboard')) {
      return <Navigate to="/donor-login" replace />;
    }
    if (location.pathname.startsWith('/requester-dashboard')) {
      return <Navigate to="/requester-login" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  //Role validation logic
  if (!currentRole || (!currentRole.includes('Donor') && !currentRole.includes('Requester'))) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="user-dashboard">
      <Topbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} theme={theme} />
      {renderSidebar()}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default RequireAuth;

