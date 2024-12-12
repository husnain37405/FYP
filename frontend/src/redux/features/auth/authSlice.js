import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  token: null,
  user: null,
  roles: [],
  currentRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.currentRole = null;
      state.token = null;
      state.user = null;
      state.roles = [];
    },

    setUserInfo: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.user.roles; // Storing all roles
      state.currentRole = action.payload.role; // Set the currentRole explicitly from login (Donor/Requester/Admin)
    },

    setCurrentRole: (state, action) => {
      state.currentRole = action.payload; // Dynamically set the active role
    },

    // authRequest: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },

    // authFailed: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },

    // setError: (state, action) => {
    //   state.error = action.payload;
    // },

    // clearError: (state) => {
    //   state.error = null;
    // },
  },
});

export const {
  authRequest,
  authFailed,
  authLogout,
  setUserInfo,
  setCurrentRole,
  setLoading,
  setError,
  
} = authSlice.actions;

export const authReducer = authSlice.reducer;
