"use client";

import { useState } from "react";
import { PreferenceForm } from "@/components/preference-form";
import { MovieCard } from "@/components/movie-card";
import { getMovieRecommendations } from "@/lib/gemini";
import { Film } from "lucide-react";
import { Movie, ApiError } from "@/lib/types/movie";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePreferenceSubmit = async (preferences: string) => {
    setIsLoading(true);
    try {
      const response = await getMovieRecommendations(preferences);
      setMovies(response.movies);
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error getting recommendations:", apiError);
      
      toast({
        title: "Hata",
        description: apiError.message || "Film önerileri alınırken bir hata oluştu.",
        variant: "destructive",
      });
      
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8">
          <Film className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Film Öneri Chatbotu</h1>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <PreferenceForm onSubmit={handlePreferenceSubmit} isLoading={isLoading} />
        </div>

        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.title} {...movie} />
            ))}
          </div>
        )}

        {!movies.length && !isLoading && (
          <div className="text-center text-muted-foreground p-4">
            Film tercihlerinizi girin, size en uygun filmleri önerelim.
          </div>
        )}
      </div>
    </main>
  );
}