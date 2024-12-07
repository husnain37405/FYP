// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../assets/AdminLogin.css';
// import { toast, ToastContainer } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';
// import { useRegisterUserMutation } from "../redux/user/userApi";
// import { useLocation } from 'react-router-dom';

// const DonorSignup = () => {
//   const [username, setUsername] = useState(''); // For email
//   const [contact, setContact] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
  
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   // RTK Query mutation hook
//   const [registerUser, { isLoading }] = useRegisterUserMutation();

//   const location = useLocation();
//   const role = location.state?.role; 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate passwords
//     if (password !== confirmpassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // Prepare user data
//     const userData = { 
//       name: fullname, 
//       email: username, 
//       contact, 
//       password, 
//       role: 'Donor' 
//     };

//     try {
//       // Use RTK Query to register the user
//       const response = await registerUser(userData).unwrap();
//       toast.success(response.message || "Donor registration successful!");

//       // Reset the form and navigate to login page
//       if (formRef.current) formRef.current.reset();
//       // navigate('/userlogin');
//       // navigate('/userlogin', { state: { role: 'Donor' } });
//       navigate('/donor-login')
//     } catch (error) {
//       console.error("Registration error:", error);
//       const errorMessage = error.data?.message || "Registration failed. Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="donor-signup-container">
//       <h2>Donor Signup</h2>
//       <form 
//         className="signup-form" 
//         ref={formRef} 
//         onSubmit={handleSubmit} 
//         style={{ width: '60%' }}
//       >
//         <div className="row">
//           <div className="col-sm-6">
//             <div className="form-group">
//               <label htmlFor="fullname">Full Name</label>
//               <input
//                 type="text"
//                 id="fullname"
//                 value={fullname}
//                 onChange={(e) => setFullname(e.target.value)}
//                 required
//                 placeholder="Enter your full name"
//               />
//             </div>
//           </div>
//           <div className="col-sm-6">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-sm-6">
//             <div className="form-group">
//               <label htmlFor="contact">Contact No</label>
//               <input
//                 type="text"
//                 id="contact"
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//                 required
//                 placeholder="Enter your contact number"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-sm-6">
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>
//           <div className="col-sm-6">
//             <div className="form-group">
//               <label htmlFor="confirmpassword">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmpassword"
//                 value={confirmpassword}
//                 onChange={(e) => setConfirmpassword(e.target.value)}
//                 required
//                 placeholder="Re-enter your password"
//               />
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="signup-btn" disabled={isLoading}>
//           {isLoading ? "Registering..." : "Sign Up"}
//         </button>
//       </form>
//       <ToastContainer 
//         position="top-right" 
//         autoClose={3000} 
//         hideProgressBar={false} 
//         newestOnTop={true} 
//         closeOnClick 
//       />
//     </div>
//   );
// };

// export default DonorSignup;

// import React, { useState, useRef } from 'react';
// import {
//   Grid,
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Paper,
//   CircularProgress,
//   Link,
// } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useRegisterUserMutation } from '../redux/user/userApi';
// import 'react-toastify/dist/ReactToastify.css';

// const DonorSignup = () => {
//   const [fullname, setFullname] = useState('');
//   const [username, setUsername] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmpassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       name: fullname,
//       email: username,
//       contact,
//       password,
//       role: 'Donor',
//     };

//     try {
//       const response = await registerUser(userData).unwrap();
//       toast.success(response.message || 'Donor registration successful!');
//       if (formRef.current) formRef.current.reset();
//       navigate('/donor-login');
//     } catch (error) {
//       toast.error(error.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Grid
//       container
//       component="main"
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #dfe6e9, #74b9ff)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 2,
      
//       }}
//     >
//       <ToastContainer />
//       <Grid
//         item
//         xs={12}
//         sm={10}
//         md={6}
//         lg={5}
       
//         component={Paper}
//         elevation={6}
//         square
//         sx={{
//           padding: 4,
//           borderRadius: 4,
//           boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
//           maxWidth: '100%', // Ensure it fits horizontally on smaller devices
         
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
            
//           }}
//         >
//           <Typography
//             component="h1"
//             variant="h5"
//             sx={{
//               fontWeight: 'bold',
//               color: '#2d3436',
//               mb: 0,
//             }}
//           >
//             Donor Signup
//           </Typography>
//           <Box
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit}
//             sx={{
//               width: '100%',
//               mt: 0,
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full Name"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Contact Number"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Confirm Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={confirmpassword}
//                   onChange={(e) => setConfirmpassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 padding: 1.5,
//                 backgroundColor: '#0984e3',
//                 '&:hover': {
//                   backgroundColor: '#74b9ff',
//                 },
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 mt: 2,
//               }}
//             >
//               <Typography variant="body2">
//                 Already have an account?{' '}
//                 <Link href="/donor-login" underline="hover" sx={{ color: '#0984e3' }}>
//                   Login here
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default DonorSignup;

// import React, { useState, useRef } from 'react';
// import {
//   Grid,
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Paper,
//   CircularProgress,
//   Link,
// } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useRegisterUserMutation } from '../redux/user/userApi';
// import 'react-toastify/dist/ReactToastify.css';

// const DonorSignup = () => {
//   const [fullname, setFullname] = useState('');
//   const [username, setUsername] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmpassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       name: fullname,
//       email: username,
//       contact,
//       password,
//       role: 'Donor',
//     };

//     try {
//       const response = await registerUser(userData).unwrap();
//       toast.success(response.message || 'Donor registration successful!');
//       if (formRef.current) formRef.current.reset();
//       navigate('/donor-login');
//     } catch (error) {
//       toast.error(error.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Grid
//       container
//       component="main"
//       sx={{
//         minHeight: '100vh', // Full height of the viewport
//         display: 'flex', // Use flexbox for centering content
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', // Lighter gradient mix
//         margin: 0, // Remove margin to prevent overflow
//       }}
//     >
//       <ToastContainer />
//       <Grid
//         item
//         xs={12}
//         sm={10}
//         md={6}
//         lg={5}
//         component={Paper}
//         elevation={6}
//         square
//         sx={{
//           padding: 4,
//           borderRadius: 4,
//           boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
//           maxWidth: '100%',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography
//             component="h1"
//             variant="h5"
//             sx={{
//               fontWeight: 'bold',
//               color: '#031b4e', // Slightly darker text for better contrast
//               mb: 2,
//             }}
//           >
//             Donor Signup
//           </Typography>
//           <Box
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit}
//             sx={{
//               width: '100%',
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full Name"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Contact Number"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Confirm Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={confirmpassword}
//                   onChange={(e) => setConfirmpassword(e.target.value)}
//                   required
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 padding: 1.5,
//                 backgroundColor: '#62a9d2', // Previous button color
//                 '&:hover': {
//                   backgroundColor: '#4e8ca1',
//                 },
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 mt: 2,
//               }}
//             >
//               <Typography variant="body2" sx={{ color: '#031b4e' }}>
//                 Already have an account?{' '}
//                 <Link href="/donor-login" underline="hover" sx={{ color: '#62a9d2' }}>
//                   Login here
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default DonorSignup;
/////////////////////////////I Like this layout but for Login--////////
// import React, { useState, useRef } from 'react';
// import {
//   Grid,
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Paper,
//   CircularProgress,
//   Link,
// } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useRegisterUserMutation } from '../redux/user/userApi';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaHandsHelping } from 'react-icons/fa'; // Add a donation-related icon

// const DonorSignup = () => {
//   const [fullname, setFullname] = useState('');
//   const [username, setUsername] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmpassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       name: fullname,
//       email: username,
//       contact,
//       password,
//       role: 'Donor',
//     };

//     try {
//       const response = await registerUser(userData).unwrap();
//       toast.success(response.message || 'Donor registration successful!');
//       if (formRef.current) formRef.current.reset();
//       navigate('/donor-login');
//     } catch (error) {
//       toast.error(error.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Grid
//       container
//       component="main"
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', // Light gradient
//       }}
//     >
//       <ToastContainer />
//       <Grid
//         item
//         xs={12}
//         sm={10}
//         md={6}
//         lg={5}
//         component={Paper}
//         elevation={6}
//         square
//         sx={{
//           padding: 4,
//           borderRadius: 4,
//           boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
//           maxWidth: '100%',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             textAlign: 'center',
//           }}
//         >
//           {/* Donor Icon */}
//           <FaHandsHelping size={50} color="#62a9d2" sx={{ marginBottom: 2 }} />
//           <Typography
//             component="h1"
//             variant="h5"
//             sx={{
//               fontWeight: 'bold',
//               color: '#031b4e',
//               mb: 2,
//               fontFamily: "'Poppins', sans-serif",
//             }}
//           >
//             Become a Hero! Donate Today.
//           </Typography>
//           <Typography
//             component="h2"
//             variant="body1"
//             sx={{
//               color: '#031b4e',
//               marginBottom: 4,
//               fontSize: '1rem',
//               fontFamily: "'Poppins', sans-serif",
//             }}
//           >
//             Join us in making a positive impact! Please fill out the form to create your donor account.
//           </Typography>

//           <Box
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit}
//             sx={{
//               width: '100%',
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full Name"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   // required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   // required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Contact Number"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   // required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   // required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Confirm Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={confirmpassword}
//                   onChange={(e) => setConfirmpassword(e.target.value)}
//                   // required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 padding: 1.5,
//                 backgroundColor: '#62a9d2', // Keep the button color
//                 '&:hover': {
//                   backgroundColor: '#4e8ca1',
//                 },
//                 borderRadius: 30, // Rounded corners
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 mt: 2,
//               }}
//             >
//               <Typography variant="body2" sx={{ color: '#031b4e' }}>
//                 Already have an account?{' '}
//                 <Link href="/donor-login" underline="hover" sx={{ color: '#62a9d2' }}>
//                   Login here
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default DonorSignup;
////////////////////////-------------------------//////////////////
// import React, { useState, useRef } from 'react';
// import {
//   Grid,
//   Box,
//   TextField,
//   Typography,
//   Button,
//   CircularProgress,
//   Link,
// } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { useRegisterUserMutation } from '../redux/features/user/userApi';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaHandsHelping } from 'react-icons/fa'; // Donation icon

// const DonorSignup = () => {
//   const [fullname, setFullname] = useState('');
//   const [username, setUsername] = useState('');
//   const [contact, setContact] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmpassword] = useState('');
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmpassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       name: fullname,
//       email: username,
//       contact,
//       password,
//       role: 'Donor',
//     };

//     try {
//       const response = await registerUser(userData).unwrap();
//       toast.success(response.message || 'Donor registration successful!');
//       if (formRef.current) formRef.current.reset();
//       navigate('/donor-login');
//     } catch (error) {
//       toast.error(error.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Grid
//       container
//       component="main"
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 0,
//         background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', // Light gradient
//       }}
//     >
//       <ToastContainer />
//       {/* Form and Text Container */}
//       <Grid
//         item
//         xs={12}
//         sm={10}
//         md={8}
//         lg={7}
//         container
//         spacing={2}
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: 2,
//           borderRadius: 4,
//           boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
//           background: '#ffffff',
//         }}
//       >
//         {/* Left side: Sign Up Form */}
//         <Grid item xs={12} sm={6}>
//           <Box
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit}
//             sx={{
//               width: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: '0px',
//               // padding: '20px',
//             }}
//           >
//             {/* Sign Up Heading */}
//             <Typography
//               variant="h4"
//               component="h1"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#031b4e',
//                 marginBottom: 1,
//                 fontFamily: "'Poppins', sans-serif",
//               }}
//             >
//              Donor Signup 
//             </Typography>
//             <Grid container spacing={1}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Full Name"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={fullname}
//                   onChange={(e) => setFullname(e.target.value)}
//                   required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Contact Number"
//                   type="text"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={contact}
//                   onChange={(e) => setContact(e.target.value)}
//                   required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Confirm Password"
//                   type="password"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   value={confirmpassword}
//                   onChange={(e) => setConfirmpassword(e.target.value)}
//                   required
//                   sx={{
//                     '& .MuiInputLabel-root': { color: '#031b4e' },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 25,
//                       '&:hover fieldset': { borderColor: '#62a9d2' },
//                     },
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 padding: 1.5,
//                 backgroundColor: '#62a9d2',
//                 '&:hover': {
//                   backgroundColor: '#4e8ca1',
//                 },
//                 borderRadius: 30,
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <CircularProgress size={24} sx={{ color: 'white' }} />
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//             <Box sx={{ textAlign: 'center', mt: 2 }}>
//               <Typography variant="body2" sx={{ color: '#031b4e' }}>
//                 Already have an account?{' '}
//                 <Link href="/donor-login" underline="hover" sx={{ color: '#62a9d2' }}>
//                   Login here
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Grid>

//         {/* Right side: Text Content */}
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'flex-start',
//               paddingLeft: 3,
//               backgroundColor: '#f5f5f5', // Light background color for the text side
//               borderRadius: 4,
//               padding: 3,
//             }}
//           >
//             <FaHandsHelping size={60} color="#62a9d2" sx={{ marginBottom: 2 }} />
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{
//                 fontWeight: 'bold',
//                 color: '#031b4e',
//                 mb: 2,
//                 fontFamily: "'Poppins', sans-serif",
//               }}
//             >
//               Make a Difference. Donate Today!
//             </Typography>
//             <Typography
//               component="p"
//               variant="body1"
//               sx={{
//                 color: '#031b4e',
//                 fontSize: '1rem',
//                 fontFamily: "'Poppins', sans-serif",
//                 marginBottom: 3,
//               }}
//             >
//               Your contribution can change lives. Please sign up to become a donor and start making an impact in the lives of those in need.
//             </Typography>
//             <Typography
//               component="p"
//               variant="body2"
//               sx={{
//                 color: '#031b4e',
//                 fontSize: '0.9rem',
//                 fontFamily: "'Poppins', sans-serif",
//               }}
//             >
//               We thank you for your kindness and generosity. Every donation counts!
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default DonorSignup;
//---------------------------------------------------------/--/--/
import React, { useState, useRef } from 'react';
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Link,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi'; // Update path to use authApi
import 'react-toastify/dist/ReactToastify.css';
import { FaHandsHelping } from 'react-icons/fa'; // Donation icon

const DonorSignup = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const userData = {
      name: fullname,
      email: username,
      contact,
      password,
      role: 'Donor',
    };

    try {
      const response = await registerUser(userData).unwrap();
      toast.success(response.message || 'Donor registration successful!');
      if (formRef.current) formRef.current.reset();
      navigate('/donor-login');
    } catch (error) {
      toast.error(error.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', // Light gradient
      }}
    >
      <ToastContainer />
      {/* Form and Text Container */}
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={7}
        container
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          borderRadius: 4,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
        }}
      >
        {/* Left side: Sign Up Form */}
        <Grid item xs={12} sm={6}>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
            }}
          >
            {/* Sign Up Heading */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#031b4e',
                marginBottom: 1,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Donor Signup
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  sx={{
                    '& .MuiInputLabel-root': { color: '#031b4e' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 25,
                      '&:hover fieldset': { borderColor: '#62a9d2' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  sx={{
                    '& .MuiInputLabel-root': { color: '#031b4e' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 25,
                      '&:hover fieldset': { borderColor: '#62a9d2' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contact Number"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  slotProps={{
                    htmlInput: {
                      maxLength: 11,  
                      pattern: "[0-9]{11}",  
                      inputMode: "numeric",  
                    },
                  }}
                  sx={{
                    '& .MuiInputLabel-root': { color: '#031b4e' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 25,
                      '&:hover fieldset': { borderColor: '#62a9d2' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{
                    '& .MuiInputLabel-root': { color: '#031b4e' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 25,
                      '&:hover fieldset': { borderColor: '#62a9d2' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  required
                  sx={{
                    '& .MuiInputLabel-root': { color: '#031b4e' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 25,
                      '&:hover fieldset': { borderColor: '#62a9d2' },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                padding: 1.5,
                backgroundColor: '#62a9d2',
                '&:hover': {
                  backgroundColor: '#4e8ca1',
                },
                borderRadius: 30,
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Sign Up'
              )}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#031b4e' }}>
                Already have an account?{' '}
                <Link href="/donor-login" underline="hover" sx={{ color: '#62a9d2' }}>
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right side: Text Content */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              padding: 3,
            }}
          >
            <FaHandsHelping size={60} color="#62a9d2" sx={{ marginBottom: 2 }} />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#031b4e',
                mb: 2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Make a Difference. Donate Today!
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{
                color: '#031b4e',
                fontSize: '1rem',
                fontFamily: "'Poppins', sans-serif",
                marginBottom: 3,
              }}
            >
              Your contribution can change lives. Please sign up to become a donor and start making an impact in the lives of those in need.
            </Typography>
            <Typography
              component="p"
              variant="body2"
              sx={{
                color: '#031b4e',
                fontSize: '0.9rem',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              We thank you for your kindness and generosity. Every donation counts!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DonorSignup;

