import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import {setUserInfo} from "../redux/features/auth/authSlice"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginUserMutation(); 
  const user = useSelector((state)=>state.auth.user)
 
    const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({ email, password, role: 'Admin' }).unwrap();
      console.log('API Response:', response);
  
      if (response.status) {
        const { token, user } = response;
  
        // Ensure user has the Admin role
        if (user.roles.includes('Admin')) {
          // Dispatch to Redux store
          dispatch(setUserInfo({ user, token,  role: 'Admin'  }));
  
          console.log('Navigating to /dashboard');
          toast.success('Admin login successful!');
          
          navigate('/dashboard'); // Ensure this route exists
        } else {
          toast.error('You are not authorized as an Admin.');
        }
      } else {
        toast.error(response.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error?.message || 'Login failed. Please check your credentials.');
    }
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        background: 'linear-gradient(135deg, #0984e3, #74b9ff)',
      }}
    >
      <ToastContainer />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          margin: 'auto',
          padding: 4,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Admin Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ width: '100%' }}
          >
            <TextField
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiInputLabel-root': { color: '#031b4e' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 25,
                  '&:hover fieldset': { borderColor: '#0984e3' },
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiInputLabel-root': { color: '#031b4e' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 25,
                  '&:hover fieldset': { borderColor: '#0984e3' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                padding: 1,
                background: 'linear-gradient(90deg, #6c5ce7, #0984e3)',
                '&:hover': { background: '#6c5ce7' },
                borderRadius: 30,
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Login'
              )}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;

