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
// import { useRegisterUserMutation } from '../redux/features/auth/authApi'; 
// import 'react-toastify/dist/ReactToastify.css';
// import { FaHandsHelping } from 'react-icons/fa'; 

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
//         background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', 
//       }}
//     >
//       <ToastContainer />

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
       
//         <Grid item xs={12} sm={6}>
//           <Box
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit}
//             sx={{
//               width: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: 0,
//             }}
//           >
          
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
//               Donor Signup
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
//                   slotProps={{
//                     htmlInput: {
//                       maxLength: 11,  
//                       pattern: "[0-9]{11}",  
//                       inputMode: "numeric",  
//                     },
//                   }}
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
//               backgroundColor: '#f5f5f5',
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
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import 'react-toastify/dist/ReactToastify.css';
import { FaHandsHelping } from 'react-icons/fa';

const DonorSignup = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation rules
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRequirements.test(newPassword)) {
      setPasswordError(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (passwordError) {
      toast.error('Please fix password requirements before proceeding.');
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
        background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)',
      }}
    >
      <ToastContainer />

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
        {/* Left side: Signup Form */}
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
                  inputProps={{
                    maxLength: 11,
                    pattern: '[0-9]{11}',
                    inputMode: 'numeric',
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
                  onChange={handlePasswordChange}
                  required
                  error={!!passwordError}
                  helperText={passwordError}
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
