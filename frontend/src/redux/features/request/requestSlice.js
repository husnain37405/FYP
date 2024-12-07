import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setRequests, setLoading, setError, clearError } = requestSlice.actions;
export const requestReducer = requestSlice.reducer;
