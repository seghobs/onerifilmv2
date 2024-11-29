import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from "./config";

export async function getMoviePoster(movieTitle: string, year?: string): Promise<string> {
  try {
    const query = encodeURIComponent(movieTitle);
    const yearParam = year ? `&year=${year}` : "";
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}${yearParam}&language=tr-TR`
    );
    
    if (!response.ok) {
      throw new Error("TMDB API yanıt vermedi");
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const posterPath = data.results[0].poster_path;
      return posterPath ? `${TMDB_IMAGE_BASE_URL}${posterPath}` : "";
    }
    
    return "";
  } catch (error) {
    console.error("TMDB API error:", error);
    return "";
  }
}