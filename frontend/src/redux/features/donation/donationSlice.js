import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  donations: [],
  loading: false,
  error: null,
};

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonations: (state, action) => {
      state.donations = action.payload;
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

export const { setDonations, setLoading, setError, clearError } = donationSlice.actions;
export const donationReducer = donationSlice.reducer;
