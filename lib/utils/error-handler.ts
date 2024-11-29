import { ApiError } from '../types/movie';

export function createApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error,
    };
  }
  
  return {
    message: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    details: error,
  };
}

export function isValidMovieResponse(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  
  try {
    const response = data as { movies?: unknown[] };
    return Array.isArray(response.movies) && response.movies.length > 0;
  } catch {
    return false;
  }
}