import {createApi} from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './services';

export const contactService = createApi({
  reducerPath: 'contactService',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchContact: builder.query({
      query: () => ({
        url: '/contact',
        method: 'get',
      }),
      transformResponse: responseData => {
        return responseData?.data;
      },
      providesTags: ['Contacts'], // provide unique name in which this unique key is used for invalidation
    }),
    editContact: builder.query({
      query: id => ({
        url: `/contact/${id}`,
        method: 'get',
      }),
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Contacts'], // provide unique name in which this unique key is used for invalidation
    }),
    updateContact: builder.mutation({
      query: ({id, ...formData}) => ({
        url: `/contact/${id}`,
        method: 'put',
        data: formData,
      }),
      invalidatesTags: ['Contacts'], // Invalidate fetchJokes on mutation success
    }),
    storeContact: builder.mutation({
      query: formData => ({
        url: '/contact',
        method: 'post',
        data: formData,
      }),
      invalidatesTags: ['Contacts'], // Invalidate fetchJokes on mutation success
    }),
  }),
});

export const {
  useFetchContactQuery,
  useUpdateContactMutation,
  useStoreContactMutation,
} = contactService;
