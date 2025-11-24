export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl?: string;
  trailerUrl?: string;
  durationMinutes: number; // in minutes
  releaseDate: string;
  genres: string[];
  rating: number; // 0-10
  language: string;
  director: string;
  cast: string[];
  ageRating: string;
  status: "now_showing" | "coming_soon" | "ended";  // Note: This is a union type
}