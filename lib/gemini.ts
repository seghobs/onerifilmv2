import { GoogleGenerativeAI } from "@google/generative-ai";
import { MovieResponse, ApiError } from "./types/movie";
import { createApiError, isValidMovieResponse } from "./utils/error-handler";
import { getMoviePoster } from "./tmdb";

const genAI = new GoogleGenerativeAI("AIzaSyBNprZNQfMuUg2U8Sfybp3EXTivFmgMfHI");

export async function getMovieRecommendations(preferences: string): Promise<MovieResponse> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Sen bir film uzmanısın. Aşağıdaki tercihlere göre 5 film önerisi yap. Sadece JSON formatında yanıt ver, başka hiçbir metin ekleme.

Tercihler:
${preferences}

Yanıtını tam olarak bu formatta ver:
{
  "movies": [
    {
      "title": "Film Adı",
      "year": "2023",
      "imdbRating": "8.5",
      "summary": "Filmin kısa özeti",
      "cast": ["Oyuncu 1", "Oyuncu 2", "Oyuncu 3"],
      "platforms": ["Netflix", "Prime Video"]
    }
  ]
}

Önemli kurallar:
1. Sadece JSON formatında yanıt ver
2. JSON dışında hiçbir metin ekleme
3. Her film için tüm alanları doldur
4. Platformları gerçek streaming servislerinden seç (Netflix, Prime Video, Disney+, Mubi, BluTV)
5. IMDB puanlarını gerçekçi tut (1-10 arası)`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    let parsedResponse: unknown;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error("Parse error:", text);
      throw new Error("Film önerileri alınamadı. Lütfen tekrar deneyin.");
    }

    if (!isValidMovieResponse(parsedResponse)) {
      throw new Error("Film önerileri geçerli formatta değil. Lütfen tekrar deneyin.");
    }

    const movieResponse = parsedResponse as MovieResponse;
    
    const moviesWithPosters = await Promise.all(
      movieResponse.movies.map(async (movie) => {
        const posterUrl = await getMoviePoster(movie.title, movie.year);
        return { ...movie, posterUrl };
      })
    );

    return { movies: moviesWithPosters };
  } catch (error) {
    const apiError = createApiError(error);
    console.error("Gemini API error:", apiError);
    throw apiError;
  }
}