// import React from 'react';
// import { Navbar, Container, NavDropdown } from 'react-bootstrap';
// import { FaBars } from 'react-icons/fa';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../../redux/features/auth/authSlice';
// import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
// import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
// import { userApi } from '../../redux/features/user/userApi';
// import { authApi } from '../../redux/features/auth/authApi';
// import './Topbar.css';

// const Topbar = ({ toggleSidebar }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     data: userDetails,
//     isLoading: userDetailsLoading,
//     isError: userDetailsError,
//   } = useGetUserDetailsQuery();

//   const [logoutUser] = useLogoutUserMutation();
//   const { token, user, roles, currentRole } = useSelector((state) => state.auth);

 
//   const handleSignOut = async () => {
//     try {
//       await logoutUser().unwrap();
  
//       dispatch(authLogout());
//       dispatch(userApi.util.resetApiState());
//       dispatch(authApi.util.resetApiState());
  

//       if (currentRole === 'Admin') {
//         navigate('/admin');
//       } else if (currentRole === 'Donor') {
//         navigate('/donor-login');
//       } else if (currentRole === 'Requester') {
//         navigate('/requester-login');
//       } else {
//         navigate('/'); // Fallback: Redirect to homepage if no role
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

//   return (
//     <Navbar expand="lg" className="mb-3 custom-navbar">
//       <Container fluid className="topbar-container">
//         <FaBars
//           onClick={toggleSidebar}
//           style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '30px' }}
//           className="toggle-icon"
//         />
//         <Navbar.Brand href="#" className="navbar-brand" style={{ fontWeight: 'bold' }}>
//           NWF Dashboard
//         </Navbar.Brand>

//         <div className="d-flex align-items-center ms-auto">
//           {!token || !userDetails ? (
//             <div className="auth-links" style={{ marginRight: '30px' }}>
//               <Link to="/login" className="auth-link">Log In</Link>
//               <Link to="/register" className="auth-link">Create Account</Link>
//             </div>
//           ) : (
//             <NavDropdown
//               title={userDetails?.name || 'User'}
//               id="offcanvasNavbarDropdown"
//               align="end"
//               className="topbar-dropdown"
//             >
//               <NavDropdown.Item as={Link} to={roles.includes('Admin') ? "/profile" : "/userprofile"}>
//                 Profile
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
//             </NavDropdown>
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
import { userApi } from '../../redux/features/user/userApi';
import { authApi } from '../../redux/features/auth/authApi';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userDetails, isLoading: userDetailsLoading, isError: userDetailsError } =
    useGetUserDetailsQuery();

  const [logoutUser] = useLogoutUserMutation();
  const { token, user, roles, currentRole } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(authLogout());
      dispatch(userApi.util.resetApiState());
      dispatch(authApi.util.resetApiState());

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
    <Navbar expand="lg" className="mb-3 custom-navbar">
      <Container fluid className="topbar-container">
        <FaBars
          onClick={toggleSidebar}
          style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '30px' }}
          className="toggle-icon"
        />
        <Navbar.Brand href="#" className="navbar-brand">
          NWF Dashboard
        </Navbar.Brand>

        <div className="ms-auto d-flex align-items-center topbar-user">
          {token && userDetails ? (
            <div className="user-pill d-flex align-items-center">
              <Image
                src={user?.avatar?.secure_url || 'http://localhost:5000/static/uploads/users/default.png'}
                roundedCircle
                className="user-avatar"
              />
              <NavDropdown
                title={userDetails?.name || 'User'}
                id="offcanvasNavbarDropdown"
                align="end"
                className="topbar-dropdown"
              >
                <NavDropdown.Item as={Link} to={roles.includes('Admin') ? '/profile' : '/userprofile'} >
                <FaUser className="dropdown-icon" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}  >
                <FaSignOutAlt className="dropdown-icon"/>
                  Sign Out</NavDropdown.Item>
              </NavDropdown>
            </div>
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
