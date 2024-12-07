import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000/api/account';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ BASE_URL }),
  endpoints: (builder) => ({
    getCurrentAccount: builder.query({
      query: () => '/current', 
    }),
  }),
});

export const { useGetCurrentAccountQuery } = accountApi;
