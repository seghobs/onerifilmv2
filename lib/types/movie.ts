export interface Movie {
  title: string;
  year: string;
  imdbRating: string;
  summary: string;
  cast: string[];
  platforms: string[];
  posterUrl: string;
}

export interface MovieResponse {
  movies: Movie[];
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}