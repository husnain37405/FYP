// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = 'http://localhost:5000/api/donations';
// export const donationApi = createApi({
//   reducerPath: 'donationApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl:  BASE_URL, 
//     credentials: 'include', // Include cookies for authentication
//   }),
//   endpoints: (builder) => ({
//     // ** Add a New Donation **
//     addDonation: builder.mutation({
//       query: (donationData) => ({
//         url: '/add', // POST /donations/add
//         method: 'POST',
//         body: donationData,
//       }),
//     }),

//     // ** Fetch All Donations **
//     getAllDonations: builder.query({
//       query: () => '/all', // GET /donations/all
//     }),

//     // ** Fetch Donations Stats/Counts**
//     getDonationsStats: builder.query({
//       query: () => '/stats',  // GET /donations/stats
//     }),
//     getDonorDonations: builder.query({
//       query: () => '/donorDonations',
      
//     }),
//     // ** Process Payment **
//     stripePayment: builder.mutation({
//       query: (paymentData) => ({
//         url: '/payment', // POST /donations/payment
//         method: 'POST',
//         body: paymentData,
//       }),
//     }),

//     // ** Handle Stripe Webhook (This is typically a server-side handler, not called from client-side) **
//     handleStripeWebhook: builder.mutation({
//       query: (webhookPayload) => ({
//         url: '/stripe-webhook', // POST /donations/stripe-webhook
//         method: 'POST',
//         body: webhookPayload,
//       }),
//     }),
//   }),
// });

// export const {
//   useAddDonationMutation,
//   useGetAllDonationsQuery,
//   useGetDonorDonationsQuery,
//   useGetDonationsStatsQuery,
//   useStripePaymentMutation,
//   useHandleStripeWebhookMutation,
// } = donationApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = 'http://localhost:5000/api/donations';

// export const donationApi = createApi({
//   reducerPath: 'donationApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     credentials: 'include', // Include cookies for authentication
//   }),
//   endpoints: (builder) => ({

//     addDonation: builder.mutation({
//       query: (donationData) => ({
//         url: '/add',
//         method: 'POST',
//         body: donationData,
//       }),

//       invalidatesTags: ({ donorId }) => [
//         { type: 'Donation', id: donorId },
//         { type: 'Donation', id: 'LIST' }
//       ],
//     }),


//     getDonorDonations: builder.query({
//       query: () => '/donorDonations',
//       providesTags: ({ donorId }) => [
//         { type: 'Donation', id: donorId },
//       ],
//     }),


//     getAllDonations: builder.query({
//       query: () => '/all',
//       providesTags: (result) =>
//         result ? [{ type: 'Donation', id: 'LIST' }] : [],
//     }),

//     getDonationsStats: builder.query({
//       query: () => '/stats',
//     }),


//     stripePayment: builder.mutation({
//       query: (paymentData) => ({
//         url: '/payment',
//         method: 'POST',
//         body: paymentData,
//       }),
//     }),

//     handleStripeWebhook: builder.mutation({
//       query: (webhookPayload) => ({
//         url: '/stripe-webhook',
//         method: 'POST',
//         body: webhookPayload,
//       }),
//     }),
//   }),
// });

// export const {
//   useAddDonationMutation,
//   useGetDonorDonationsQuery,
//   useGetAllDonationsQuery,
//   useGetDonationsStatsQuery,
//   useStripePaymentMutation,
//   useHandleStripeWebhookMutation,
// } = donationApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/donations';

export const donationApi = createApi({
  reducerPath: 'donationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // Include cookies for authentication
  }),
  tagTypes: ['Donation'], // Define the single tag type
  endpoints: (builder) => ({

    addDonation: builder.mutation({
      query: (donationData) => ({
        url: '/add',
        method: 'POST',
        body: donationData,
      }),
      invalidatesTags: ['Donation'], 
    }),

    getDonorDonations: builder.query({
      query: () => '/donorDonations',
      providesTags: ['Donation'], // Provides a single tag for all queries
    }),

    getAllDonations: builder.query({
      query: () => '/all',
      providesTags: ['Donation'], // Provides a single tag for all queries
    }),

    getDonationsStats: builder.query({
      query: () => '/stats',
      providesTags: ['Donation'], // Provides a single tag for all queries
    }),

    stripePayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payment',
        method: 'POST',
        body: paymentData,
      }),
      // invalidatesTags: ['Donation'], 
    }),

    handleStripeWebhook: builder.mutation({
      query: (webhookPayload) => ({
        url: '/stripe-webhook',
        method: 'POST',
        body: webhookPayload,
      }),
      // invalidatesTags: ['Donation'], 
    }),
    getDonorTotalDonationsCount: builder.query({
      query: () => '/donorTotalDonationsCount',
      providesTags: ['Donation'],
    }),
    // Fetch total donated amount for the donor
    getDonorTotalDonatedAmount: builder.query({
      query: () => '/donorTotalDonatedAmount',
      providesTags: ['Donation'],
    }),
  }),
});

export const {
  useAddDonationMutation,
  useGetDonorDonationsQuery,
  useGetAllDonationsQuery,
  useGetDonationsStatsQuery,
  useStripePaymentMutation,
  useHandleStripeWebhookMutation,
  useGetDonorTotalDonationsCountQuery,
  useGetDonorTotalDonatedAmountQuery,
} = donationApi;
