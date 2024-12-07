// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = "http://localhost:5000";

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState()?.user?.token; // Get token from user slice
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       headers.set('Content-Type', 'application/json');
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     loginUser: builder.mutation({
//       query: ({ email, password, role }) => ({
//         url: '/userlogin',
//         method: 'POST',
//         body: { email, password, role },
//       }),
//     }),
//     registerUser: builder.mutation({
//       query: (userData) => ({
//         url: '/userReg',
//         method: 'POST',
//         body: userData,
//       }),
//     }),

//     getUserDetails: builder.query({
//       query: (id) => {
//         if (!id) throw new Error("User ID is required"); // Prevent undefined ID
//         return `user/${id}`; 
//       },
//     }),
//     getUserStats: builder.query({
//       query: () => 'userStats', 
//     }),
//     fetchUsers: builder.query({
//       query: () => 'users',
//     }),
//     deleteUser: builder.mutation({
//       query: ({ id }) => ({
//         url: `users/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//     updateUser: builder.mutation({
//       query: ({ id, fields }) => ({
//         url: `users/${id}`,
//         method: 'PUT',
//         body: fields,
//       }),
//     }),

//     // Donations
//     getDonations: builder.query({
//       query: () => 'donations',
//     }),

//     // Requests
//     getRequests: builder.query({
//       query: () => 'requests',
//     }),

//     // Miscellaneous
//     addStuff: builder.mutation({
//       query: (fields) => ({
//         url: 'stuffCreate',
//         method: 'POST',
//         body: fields,
//       }),
//     }),
//   }),
// });

// export const {
//   useLoginUserMutation,
//   useRegisterUserMutation,
//   useGetUserDetailsQuery,
//   useGetUserStatsQuery,
//   useFetchUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//   useAddStuffMutation,
//   useGetDonationsQuery,
//   useGetRequestsQuery,
// } = userApi;



// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = 'http://localhost:5000/api/users';

// export const userApi = createApi({
//   reducerPath: 'userApi', 
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL, 
//     credentials: 'include', 
//   }),
//   endpoints: (builder) => ({
//     // ** Fetch All Users **
//     getAllUsers: builder.query({
//       query: () => '/', // GET /users
//       transformResponse: (response) => response, // Optional: transform response if needed
//     }),

//     // ** Fetch User Stats **
//     getUserStats: builder.query({
//       query: () => '/stats', // GET /users/stats
//     }),

//     // ** Fetch Current User Profile Details **
//     getUserDetails: builder.query({
//       query: () => '/profile', // Ths way we are getting current uer details.GET /users/profile
//     }),

//     // ** Delete a User by ID **
//     deleteUserById: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`, // DELETE /users/:id
//         method: 'DELETE',
//       }),
//     }),

//     // ** Delete Multiple Users (Batch) **
//     deleteMultipleUsers: builder.mutation({
//       query: (filter) => ({
//         url: '/batch', // DELETE /users/batch
//         method: 'DELETE',
//         body: filter, // Pass the filter criteria in the request body
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllUsersQuery,
//   useGetUserStatsQuery,
//   useGetUserDetailsQuery,
//   useDeleteUserByIdMutation,
//   useDeleteMultipleUsersMutation,
// } = userApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/users';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', 
  }),
  tagTypes: ['User'], 
  endpoints: (builder) => ({
    
    getAllUsers: builder.query({
      query: () => '/', 
      transformResponse: (response) => response, 
      providesTags: ['User'], 
    }),

    getUserStats: builder.query({
      query: () => '/stats', 
      providesTags: ['User'], 
    }),

    getUserDetails: builder.query({
      query: () => '/profile', 
      providesTags: ['User'], 
    }),

    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/${id}`, 
        method: 'DELETE',
      }),
      invalidatesTags: ['User'], 
    }),

    
    deleteMultipleUsers: builder.mutation({
      query: (filter) => ({
        url: '/batch', 
        method: 'DELETE',
        body: filter, 
      }),
      invalidatesTags: ['User'], 
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/update',  
        method: 'PATCH',
        body: userData,  
      }),
      invalidatesTags: ['User'], 
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserStatsQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
  useDeleteMultipleUsersMutation,
} = userApi;
