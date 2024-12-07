// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = 'http://localhost:5000/api/auth';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     credentials: 'include', 
//   }),
//   endpoints: (builder) => ({
//     // ** Register a New User **
//     registerUser: builder.mutation({
//       query: (userData) => ({
//         url: '/register',
//         method: 'POST',
//         body: userData,
//       }),
//     }),

//     // ** Login User **
//     loginUser: builder.mutation({
//       query: (credentials) => ({
//         url: '/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),

//     // ** Logout User **
//     logoutUser: builder.mutation({
//       query: () => ({
//         url: '/logout',
//         method: 'POST',
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLogoutUserMutation,
// } = authApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['Auth'], // Tags for authentication-related data
  endpoints: (builder) => ({
    // ** Register a New User **
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // ** Login User **
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      // Invalidates the 'Auth' tag on login to refresh auth state
      invalidatesTags: ['Auth'],
    }),

    // ** Logout User **
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      // Invalidate the cache when logging out
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
