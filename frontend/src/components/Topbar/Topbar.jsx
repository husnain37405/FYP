import React from 'react';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout, setCurrentRole } from '../../redux/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { userApi } from '../../redux/features/user/userApi';
import { authApi } from '../../redux/features/auth/authApi';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    isError: userDetailsError,
  } = useGetUserDetailsQuery();

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
        navigate('/'); // Fallback: Redirect to homepage if no role
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
        <Navbar.Brand href="#" className="navbar-brand" style={{ fontWeight: 'bold' }}>
          NWF Dashboard
        </Navbar.Brand>

        <div className="d-flex align-items-center ms-auto">
          {!token || !userDetails ? (
            <div className="auth-links" style={{ marginRight: '30px' }}>
              <Link to="/login" className="auth-link">Log In</Link>
              <Link to="/register" className="auth-link">Create Account</Link>
            </div>
          ) : (
            <NavDropdown
              title={userDetails?.name || 'User'}
              id="offcanvasNavbarDropdown"
              align="end"
              className="topbar-dropdown"
            >
              <NavDropdown.Item as={Link} to={roles.includes('Admin') ? "/profile" : "/userprofile"}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
