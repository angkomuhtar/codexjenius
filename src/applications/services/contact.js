import {baseService} from './services';

export const contactService = baseService.injectEndpoints({
  endpoints: builder => ({
    getContact: builder.query({
      query: () => '/contact',
      transformResponse: responseData => {
        return responseData.data;
      },
      providesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: ({id}) => ({url: `/contact/${id}`, method: 'delete'}),
      invalidatesTags: ['Contact'],
    }),
    storeContact: builder.mutation({
      query: data => ({
        url: `/contact`,
        method: 'post',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    editContact: builder.query({
      query: id => ({url: `/contact/${id}`, method: 'get'}),
      transformResponse: responseData => {
        return responseData.data;
      },
    }),
    updateContact: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/contact/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactQuery,
  useDeleteContactMutation,
  useEditContactQuery,
  useStoreContactMutation,
  useUpdateContactMutation,
} = contactService;
