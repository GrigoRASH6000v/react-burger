import { axiosBaseQuery } from '@/plugins/axiosBaseQuery.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { Ingredient } from '@/types/Ingredient.ts';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Ingredients'],
  endpoints: (builder) => ({
    getIngridiens: builder.query<{ data: Ingredient[] }, void>({
      query: () => ({ url: '/ingredients', method: 'GET' }),
      providesTags: ['Ingredients'],
    }),
  }),
});

export const { useGetIngridiensQuery } = ingredientsApi;
