import { BASE_URL } from '@/constants/urls';
import axios from 'axios';

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosResponse, AxiosError } from 'axios';

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: unknown;
    params?: unknown;
    auth?: boolean;
  }> =>
  async ({ url, method, data, params, auth }) => {
    const getAuthHeaders = (): Record<string, string> => {
      const token = localStorage.getItem('accessToken');
      return token ? { authorization: token } : {};
    };

    const makeRequest = async (
      headers: Record<string, string>
    ): Promise<AxiosResponse> => {
      return await axios({
        url: `${BASE_URL}${url}`,
        method,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    };

    try {
      const result = await makeRequest(auth ? getAuthHeaders() : {});
      return { data: result.data };
    } catch (axiosError: unknown) {
      if (axios.isAxiosError(axiosError)) {
        const error = axiosError as AxiosError;

        if (error.response?.status === 403) {
          const refreshToken = localStorage.getItem('refreshToken');

          if (refreshToken) {
            try {
              const refreshResponse = await axios.post<{
                success: boolean;
                accessToken: string;
                refreshToken: string;
              }>(`${BASE_URL}/auth/token`, { token: refreshToken });

              if (refreshResponse.data.success) {
                const { accessToken, refreshToken: newRefreshToken } =
                  refreshResponse.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                const result = await makeRequest(getAuthHeaders());
                return { data: result.data };
              }
            } catch (refreshError) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              console.error('Failed to refresh token', refreshError);
            }
          }
        }

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
