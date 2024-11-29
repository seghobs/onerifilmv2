"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Monitor } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MovieCardProps {
  title: string;
  year: string;
  imdbRating: string;
  summary: string;
  cast: string[];
  platforms: string[];
  posterUrl: string;
}

export function MovieCard({
  title,
  year,
  imdbRating,
  summary,
  cast,
  platforms,
  posterUrl,
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = `https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`;

  return (
    <Card className="overflow-hidden transition-all hover:scale-102 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={imageError ? fallbackImage : (posterUrl || fallbackImage)}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold truncate flex-1">{title}</h3>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{year}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <span className="text-sm">{imdbRating}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {cast.slice(0, 3).map((actor) => (
            <Badge key={actor} variant="secondary" className="text-xs">
              {actor}
            </Badge>
          ))}
          {cast.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{cast.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-start gap-2">
          <Monitor className="w-4 h-4 mt-1 flex-shrink-0" />
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}