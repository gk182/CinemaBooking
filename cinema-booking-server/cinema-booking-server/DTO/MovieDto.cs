using System;

namespace cinema_booking_server.DTOs
{
    public class MovieDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string Status { get; set; }
    }

    public class CreateMovieDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string Status { get; set; }
    }

    public class UpdateMovieDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? DurationMinutes { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? Status { get; set; }
    }
}
