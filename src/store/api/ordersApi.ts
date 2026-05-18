import { axiosBaseQuery } from '@/plugins/axiosBaseQuery.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

export type CreateOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type CreateOrderPayload = {
  ingredients: string[];
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: `/orders`, method: 'GET' }),
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (data: CreateOrderPayload) => ({
        url: '/orders',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApi;
