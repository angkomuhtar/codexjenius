import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://contact.herokuapp.com/',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    return headers;
  },
});

export const baseService = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Contact'],
  endpoints: builder => ({}),
});
