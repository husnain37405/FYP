// import React from 'react';
// import { Navbar, Container, NavDropdown, Image } from 'react-bootstrap';
// import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../../redux/features/auth/authSlice';
// import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
// import { useLogoutUserMutation } from '../../redux/features/auth/authApi';

// import './Topbar.css';

// const Topbar = ({ toggleSidebar }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userId = useSelector((state) => state.auth.user.id);
//   const { data: userDetails, isLoading: userDetailsLoading, isError: userDetailsError } =
//     useGetUserDetailsQuery(userId);

//   const [logoutUser] = useLogoutUserMutation();
//   const { token, user, roles, currentRole } = useSelector((state) => state.auth);

//   const handleSignOut = async () => {
//     try {
//       await logoutUser().unwrap();
//       dispatch(authLogout());

//       if (currentRole === 'Admin') {
//         navigate('/admin');
//       } else if (currentRole === 'Donor') {
//         navigate('/donor-login');
//       } else if (currentRole === 'Requester') {
//         navigate('/requester-login');
//       } else {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   if (userDetailsLoading) return <div>Loading user details...</div>;

//   if (userDetailsError) {
//     return (
//       <div className="error-state">
//         <p>Failed to load user details. Please try again later.</p>
//         <button onClick={handleSignOut}>Logout</button>
//       </div>
//     );
//   }

//   console.log('User Details:', userDetails);

//   return (
//     <Navbar expand="lg" className="mb-3 custom-navbar">
//       <Container fluid className="topbar-container">
//         <FaBars
//           onClick={toggleSidebar}
//           style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '30px' }}
//           className="toggle-icon"
//         />
//         <Navbar.Brand href="#" className="navbar-brand">
//           NWF Dashboard
//         </Navbar.Brand>

//         <div className="ms-auto d-flex align-items-center topbar-user">
//           {token && userDetails ? (
//             <div className="user-pill d-flex align-items-center">
              
//               {userDetails?.avatar?.secure_url && userDetails.avatar.secure_url !== 'http://localhost:5000/static/uploads/users/default.png'? (
//                 <Image
//                   src={userDetails?.avatar?.secure_url}
//                   roundedCircle
//                   className="user-avatar"
//                   style={{
//                     width: '40px',
//                     height: '40px', 
//                     objectFit: 'cover',
//                   }}
//                 />
//               ) : (
//                 <div
//                   className="avatar-placeholder"
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: '40px', 
//                     height: '40px',
//                     borderRadius: '50%',
//                     backgroundColor: '#4285F4', 
//                     color: 'white', 
//                     fontSize: '18px', 
//                     fontWeight: 'bold', 
//                     textAlign: 'center', 
//                     lineHeight: '40px',
//                     marginRight: '5px',
//                   }}
//                 >
//                   {userDetails?.name?.[0]?.toUpperCase() || ''} 
                  
//                 </div>
//               )}

//               <NavDropdown
//                 title={userDetails?.name ? userDetails?.name : 'User'} // Fallback to 'User' if name is missing
//                 id="offcanvasNavbarDropdown"
//                 align="end"
//                 className="topbar-dropdown"
//               >
//                 <NavDropdown.Item as={Link} to={roles.includes('Admin') ? '/profile' : '/userprofile'} >
//                   <FaUser className="dropdown-icon" />
//                   Profile
//                 </NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item onClick={handleSignOut}>
//                   <FaSignOutAlt className="dropdown-icon"/>
//                   Sign Out
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </div>
//           ) : (
//             <div className="auth-links">
//               <Link to="/login" className="auth-link">
//                 Log In
//               </Link>
//               <Link to="/register" className="auth-link">
//                 Create Account
//               </Link>
//             </div>
//           )}
//         </div>
//       </Container>
//     </Navbar>
//   );
// };

// export default Topbar;


import React from 'react';
import { Navbar, Container, NavDropdown, Image } from 'react-bootstrap';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const { data: userDetails, isLoading: userDetailsLoading, isError: userDetailsError } =
    useGetUserDetailsQuery(userId);

  const [logoutUser] = useLogoutUserMutation();
  const { token, roles, currentRole } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(authLogout());

      if (currentRole === 'Admin') {
        navigate('/admin');
      } else if (currentRole === 'Donor') {
        navigate('/donor-login');
      } else if (currentRole === 'Requester') {
        navigate('/requester-login');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (userDetailsLoading) return <div>Loading user details...</div>;

  if (userDetailsError) {
    return (
      <div className="error-state">
        <p>Failed to load user details. Please try again later.</p>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    );
  }

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="topbar-container">
        <FaBars
          onClick={toggleSidebar}
          style={{ cursor: 'pointer' }}
          className="toggle-icon"
        />
        <Navbar.Brand href="#" className="navbar-brand">
          NWF Dashboard
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center topbar-user">
          {token && userDetails ? (
            <NavDropdown
              title={
                <div className="d-flex align-items-center">
                  {/* Name on the left */}
                  <span className="topbar-username d-none d-md-inline ms-2">
                    {userDetails?.name || 'User'}
                  </span>
                  {/* Avatar on the right */}
                  <Image
                    src={userDetails?.avatar?.secure_url || 'default-avatar-url'}
                    roundedCircle
                    className="user-avatar"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                </div>
              }
              id="offcanvasNavbarDropdown"
              align="end"
              className="topbar-dropdown"
              noCaret // Hide dropdown arrow
            >
              <NavDropdown.Item as={Link} to={roles.includes('Admin') ? '/profile' : '/userprofile'}>
                <FaUser className="dropdown-icon" />
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>
                <FaSignOutAlt className="dropdown-icon" />
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">
                Log In
              </Link>
              <Link to="/register" className="auth-link">
                Create Account
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
