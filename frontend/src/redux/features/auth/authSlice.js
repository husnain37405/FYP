// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   loading: false,   
//   error: null,       
//   token: null,
//   user: null,
//   roles: [], 
//   currentRole: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     authRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     // authSuccess: (state, action) => {
//     //   const { role } = action.payload;
//     //   state.loading = false;
//     //   state.currentRole = role || null;
//     //   state.token = action.payload.token;
//     //   state.user = action.payload.user;
//     // },
//     authFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     authLogout: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.currentRole = null;
//       state.token = null; 
//       state.user = null;
//       state.roles = [];
//     },
//     //This is a working setUserInfo but it only good when user have one role.
//     // setUserInfo(state, action) {
//     //   state.user = action.payload.user;
//     //   state.token = action.payload.token;
//     // },
//     setUserInfo: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.roles = action.payload.user.roles; // Storing all roles
//       if (state.roles.length === 1) {
//         state.currentRole = state.roles[0]; // If only one role, automatically set it
//       }
//     },
//     // ** Role Management **
//     setCurrentRole: (state, action) => {
//       state.currentRole = action.payload;  // lets chek if it is Setting the active role only

//     },

//     // ** Error and Loading Management **
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   authRequest,
//   authSuccess,
//   authFailed,
//   authLogout,
//   setUserInfo,
//   setCurrentRole,
//   setLoading,
//   setError,
//   clearError,
// } = authSlice.actions;

// export const authReducer = authSlice.reducer;
//^Working fine

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   loading: false,
//   error: null,
//   token: null,
//   user: null,
//   roles: [],
//   currentRole: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     authRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     // When authentication fails, reset state values
//     authFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // Handle user logout, clearing all session data
//     authLogout: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.currentRole = null;  // Reset currentRole on logout
//       state.token = null;
//       state.user = null;
//       state.roles = [];
//     },

//     // Handle user info, set roles and current role dynamically
//     setUserInfo: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.roles = action.payload.user.roles; // Storing all roles

//       // Automatically set currentRole if there is only one role
//       if (state.roles.length === 1) {
//         state.currentRole = state.roles[0];
//       } else {
//         state.currentRole = null; // Reset currentRole if there are multiple roles
//       }
//     },

//     // Set the currentRole dynamically, useful for handling multiple roles
//     setCurrentRole: (state, action) => {
//       state.currentRole = action.payload; // Dynamically set the active role
//     },

//     // Set loading state
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },

//     // Set error state
//     setError: (state, action) => {
//       state.error = action.payload;
//     },

//     // Clear error state
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   authRequest,
//   authFailed,
//   authLogout,
//   setUserInfo,
//   setCurrentRole,
//   setLoading,
//   setError,
//   clearError,
// } = authSlice.actions;

// export const authReducer = authSlice.reducer;
//^delete this if not in use
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
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    authFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

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

export const {
  authRequest,
  authFailed,
  authLogout,
  setUserInfo,
  setCurrentRole,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
