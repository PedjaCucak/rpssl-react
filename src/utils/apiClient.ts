import { AxiosError } from 'axios';
import { type ApiResponse } from '../types/api';

export async function apiCall<T>(
  fn: () => Promise<any>
): Promise<ApiResponse<T>> {
  try {
    const response = await fn();

    return {
      data: response.data,
      statusCode: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      error: {
        message: err.message || 'Unexpected error occurred',
        code: err.response?.status,
        details: err.response?.data,
      },
      statusCode: err.response?.status,
    };
  }
}
