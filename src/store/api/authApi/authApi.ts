import { axiosBaseQuery } from '@/plugins/axiosBaseQuery.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  RegisterUserResponse,
  RegisterUserPayload,
  LoginResponse,
  LoginPayload,
  UserResponse,
  ResetPasswordPayload,
  StandartResponse,
  ConfirmResetPasswordPayload,
} from './types';
import type { User } from '@/types/user.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    registerUser: build.mutation<RegisterUserResponse, RegisterUserPayload>({
      query: (data: RegisterUserPayload) => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
    }),
    login: build.mutation<LoginResponse, LoginPayload>({
      query: (data: LoginPayload) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const {
            data: { accessToken, refreshToken },
          } = await queryFulfilled;
          accessToken && localStorage.setItem('accessToken', accessToken);
          refreshToken && localStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    logout: build.mutation<StandartResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        data: { token: localStorage.getItem('refreshToken') ?? null },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const {
            data: { success },
          } = await queryFulfilled;
          if (success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
    getUser: build.query<UserResponse, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
        auth: true,
      }),
    }),
    updateUser: build.mutation<UserResponse, User>({
      query: (data: User) => ({
        url: '/auth/user',
        method: 'PATCH',
        data,
        auth: true,
      }),
    }),
    resetPassword: build.mutation<StandartResponse, ResetPasswordPayload>({
      query: (data: ResetPasswordPayload) => ({
        url: '/password-reset',
        method: 'POST',
        data,
      }),
    }),
    confirmResetPassword: build.mutation<StandartResponse, ConfirmResetPasswordPayload>({
      query: (data: ConfirmResetPasswordPayload) => ({
        url: '/password-reset/reset ',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
  useUpdateUserMutation,
} = authApi;
