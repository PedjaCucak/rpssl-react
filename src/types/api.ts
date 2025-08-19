export interface ApiError {
  message: string;
  code?: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  statusCode?: number;
}
