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
