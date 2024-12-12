import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 const BASE_URL = 'http://localhost:5000/api/donations';

export const donationApi = createApi({
  reducerPath: 'donationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', 
  }),
  tagTypes: ['Donation'],
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
      providesTags: ['Donation'], 
    }),

    getAllDonations: builder.query({
      query: () => '/all',
      providesTags: ['Donation'],
    }),

    getDonationsStats: builder.query({
      query: () => '/stats',
      providesTags: ['Donation'], 
    }),

    stripePayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payment',
        method: 'POST',
        body: paymentData,
      }),
       invalidatesTags: ['Donation'], 
    }),

    handleStripeWebhook: builder.mutation({
      query: (webhookPayload) => ({
        url: '/stripe-webhook',
        method: 'POST',
        body: webhookPayload,
      }),
      invalidatesTags: ['Donation'], 
    }),
    getDonorTotalDonationsCount: builder.query({
      query: () => '/donorTotalDonationsCount',
      providesTags: ['Donation'],
    }),
    
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
