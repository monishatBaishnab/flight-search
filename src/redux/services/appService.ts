/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appService = createApi({
  reducerPath: 'appService',
  baseQuery: async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_URL}`,
      prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as any)?.auth?.accessToken;
        const defaultHeader: Headers = headers;
        if (token) {
          defaultHeader.set('Authorization', `Bearer ${token}`);
        }
      },
    });

    const result = await baseQuery(args, api, extraOptions);
    return result;
  },

  tagTypes: [],
  keepUnusedDataFor: 2,
  endpoints: () => ({}),
});
