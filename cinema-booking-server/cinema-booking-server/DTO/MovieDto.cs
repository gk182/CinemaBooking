using System;
using System.Collections.Generic;

namespace cinema_booking_server.DTOs
{
    public class MovieDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? PosterUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public List<string>? Genres { get; set; }
        public decimal? Rating { get; set; }
        public string? Language { get; set; }
        public string? Director { get; set; }
        public List<string>? Cast { get; set; }
        public string? AgeRating { get; set; }
        public string Status { get; set; } = "coming_soon";
    }

    public class CreateMovieDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? PosterUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public List<string>? Genres { get; set; }
        public decimal? Rating { get; set; }
        public string? Language { get; set; }
        public string? Director { get; set; }
        public List<string>? Cast { get; set; }
        public string? AgeRating { get; set; }
        public string Status { get; set; } = "coming_soon";
    }

    public class UpdateMovieDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PosterUrl { get; set; }
        public string? BannerUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public List<string>? Genres { get; set; }
        public decimal? Rating { get; set; }
        public string? Language { get; set; }
        public string? Director { get; set; }
        public List<string>? Cast { get; set; }
        public string? AgeRating { get; set; }
        public string? Status { get; set; }
    }
}
