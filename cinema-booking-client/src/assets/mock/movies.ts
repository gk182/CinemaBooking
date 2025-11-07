import type { Movie } from '../../interfaces/Movie';

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description: "A thief who enters the dreams of others to steal secrets finds himself tasked with planting an idea in someone's mind.",
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    duration: 148,
    releaseDate: "2024-01-15",
    genres: ["Action", "Sci-Fi", "Thriller"],
    rating: 4.8,
    language: "English",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Ellen Page", "Joseph Gordon-Levitt"],
    ageRating: "PG-13",
    status: "now_showing"
  },
  {
    id: "2",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    duration: 152,
    releaseDate: "2024-02-20",
    genres: ["Action", "Crime", "Drama"],
    rating: 4.9,
    language: "English",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    ageRating: "PG-13",
    status: "coming_soon"
  }
];