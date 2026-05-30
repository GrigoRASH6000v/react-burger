import { BASE_URL } from '@/constants/urls.ts';
import axios, { type AxiosError } from 'axios';

import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: unknown;
    params?: unknown;
  }> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: `${BASE_URL}${url}`,
        method,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: result.data };
    } catch (axiosError: unknown) {
      if (axios.isAxiosError(axiosError)) {
        const error = axiosError as AxiosError;
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data ?? error.message,
          },
        };
      }

      return {
        error: {
          status: 500,
          data: (axiosError as Error).message || 'Unknown error',
        },
      };
    }
  };
