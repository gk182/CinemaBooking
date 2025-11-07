import type { Cinema, Room } from "./Cinema";
import type { Movie } from "./Movie";

export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  cinemaId: string;
  startTime: string;
  endTime: string;
  date: string;
  availableSeats: number;
  basePrice: number;
  movie?: Movie;
  room?: Room;
  cinema?: Cinema;
}