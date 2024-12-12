import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL =  'http://localhost:5000/api/requests';
export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    credentials: 'include', 
  }),
  tagTypes: ['Requests'],
  endpoints: (builder) => ({
   
    addRequest: builder.mutation({
      query: (requestData) => ({
        url: '/add', 
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Requests'],
    }),

   
    getAllRequests: builder.query({
      query: () => '/all', 
      providesTags: ['Requests'],
    }),
    
    getRequestsStats: builder.query({
      query: () => '/stats',  
      providesTags: ['Requests'],
    }),
   getRequesterRequests: builder.query({
    query: () => '/requesterRequests', 
    providesTags: ['Requests'],
   }),
    
    updateRequest: builder.mutation({
      query: ({ id, requestData }) => ({
        url: `/update/${id}`, 
        method: 'PATCH',
        body: requestData,
      }),
      invalidatesTags: ['Requests'],
    }),

    updateRequesterRequest: builder.mutation({
      query: ({ id, requestData }) => ({
        url: `/requesterRequestUpdate/${id}`, 
        method: 'PATCH',
        body: requestData,
      }),
      invalidatesTags: ['Requests'],
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requesterRequests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Requests'],
    }),
  }),
});

export const {
  useAddRequestMutation,
  useGetAllRequestsQuery,
  useGetRequesterRequestsQuery,
  useUpdateRequestMutation,
  useUpdateRequesterRequestMutation,
  useDeleteRequestMutation,
} = requestApi;
