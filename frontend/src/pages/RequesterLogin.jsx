import React, { useState } from 'react';
import { useLoginUserMutation } from '../redux/features/auth/authApi'; 
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import { Grid, Box, TextField, Button, CircularProgress, Typography, Link } from '@mui/material';
import {setUserInfo} from "../redux/features/auth/authSlice"

const RequesterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginUserMutation(); // Updated to use authApi

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password, role: 'Requester' }).unwrap();

      if (response.status) {
        const { token, user } = response;

        if (user.roles.includes('Requester')) {
          dispatch(setUserInfo({ user, token,  role: 'Requester'  }));
          toast.success('Login successful!');
          navigate('/requester-dashboard', { state: { role: 'Requester' } });
        } else {
          toast.error('You are not authorized as a Requester.');
        }
      } else {
        toast.error(response.message || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'Login failed. Please check your credentials.');
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
        background: 'linear-gradient(135deg, #A7C7E7, #D4E7F1)', // Light gradient background
      }}
    >
      <ToastContainer />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={5}
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          borderRadius: 4,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
        }}
      >

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#031b4e',
              marginBottom: 3,
              fontFamily: "'Poppins', sans-serif",
              textAlign: 'center',
            }}
          >
            Requester Login
          </Typography>

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#031b4e' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 25,
                '&:hover fieldset': { borderColor: '#62a9d2' },
              },
            }}
          />

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

          {/* Login Button */}
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
              'Login'
            )}
          </Button>

          {/* Create Account Link */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#031b4e' }}>
              Don't have an account?{' '}
              <NavLink to="/requester-signup" style={{ color: '#62a9d2', textDecoration: 'none' }}>
                Create Account
              </NavLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RequesterLogin;

