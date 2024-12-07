import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL =  'http://localhost:5000/api/requests';
export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Base URL for requests routes
    credentials: 'include', // Include cookies if needed
  }),
  tagTypes: ['Requests'],
  endpoints: (builder) => ({
    // ** Add a New Request **
    addRequest: builder.mutation({
      query: (requestData) => ({
        url: '/add', // POST /requests/add
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['Requests'],
    }),

    // ** Get All Requests **
    getAllRequests: builder.query({
      query: () => '/all', // GET /requests/all
      providesTags: ['Requests'],
    }),
    
    // ** Fetch Requests Stats/Counts **
    getRequestsStats: builder.query({
      query: () => '/stats',  // GET /requests/stats
      providesTags: ['Requests'],
    }),
   getRequesterRequests: builder.query({
    query: () => '/requesterRequests', // get requesters own requests only
    providesTags: ['Requests'],
   }),
    // ** Update a Request by ID (Partial Update) **
    updateRequest: builder.mutation({
      query: ({ id, requestData }) => ({
        url: `/update/${id}`, // This is an Admin Update(only update status+ rejestReason)
        method: 'PATCH',
        body: requestData,
      }),
      invalidatesTags: ['Requests'],
    }),

    updateRequesterRequest: builder.mutation({
      query: ({ id, requestData }) => ({
        url: `/requesterRequestUpdate/${id}`, // PATCH This is an Requester Update(only update Amount+ description)
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
