import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '../config/env';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2',
    prepareHeaders: (headers) => {
      if (env.NEWS_API_KEY) {
        headers.set('X-Api-Key', env.NEWS_API_KEY);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['News'],
});
