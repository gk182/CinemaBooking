using cinema_booking_server.Data;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using cinema_booking_server.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Linq;

namespace cinema_booking_server.Services.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly ApplicationDbContext _context;

        public MovieService(ApplicationDbContext context)
        {
            _context = context;
        }

        private static List<string> ParseStringList(string? raw)
        {
            if (string.IsNullOrWhiteSpace(raw))
                return new List<string>();

            var trimmed = raw.Trim();

            // If looks like JSON array, try to deserialize
            if (trimmed.StartsWith("[") || trimmed.StartsWith("{"))
            {
                try
                {
                    var list = JsonSerializer.Deserialize<List<string>>(trimmed);
                    return list ?? new List<string>();
                }
                catch
                {
                    // fallthrough to text parsing
                }
            }

            // If stored as plain text (comma or semicolon separated), split
            var separators = new[] { ',', ';', '|' };
            var parts = trimmed
                .Split(separators, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => !string.IsNullOrEmpty(s))
                .ToList();

            // If nothing parsed, return the raw string as single item
            if (parts.Count == 0)
                return new List<string> { trimmed };

            return parts;
        }

        private static string? SerializeListOrNull(IEnumerable<string>? list)
        {
            if (list == null) return null;
            var arr = list.Where(s => !string.IsNullOrWhiteSpace(s)).Select(s => s.Trim()).ToList();
            return arr.Count == 0 ? null : JsonSerializer.Serialize(arr);
        }

        public async Task<IEnumerable<MovieDTO>> GetAllMoviesAsync()
        {
            var movies = await _context.Movies.ToListAsync();

            return movies.Select(m => new MovieDTO
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                PosterUrl = m.PosterUrl,
                BannerUrl = m.BannerUrl,
                TrailerUrl = m.TrailerUrl,
                DurationMinutes = m.DurationMinutes,
                ReleaseDate = m.ReleaseDate,
                Genres = ParseStringList(m.Genres),
                Rating = m.Rating,
                Language = m.Language,
                Director = m.Director,
                Cast = ParseStringList(m.Cast),
                AgeRating = m.AgeRating,
                Status = m.Status
            }).ToList();
        }

        public async Task<MovieDTO?> GetMovieByIdAsync(Guid id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return null;

            return new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                PosterUrl = movie.PosterUrl,
                BannerUrl = movie.BannerUrl,
                TrailerUrl = movie.TrailerUrl,
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Genres = ParseStringList(movie.Genres),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = ParseStringList(movie.Cast),
                AgeRating = movie.AgeRating,
                Status = movie.Status
            };
        }

        public async Task<MovieDTO> CreateMovieAsync(CreateMovieDTO dto)
        {
            var movie = new Movie
            {
                Title = dto.Title,
                Description = dto.Description,
                PosterUrl = dto.PosterUrl,
                BannerUrl = dto.BannerUrl,
                TrailerUrl = dto.TrailerUrl,
                DurationMinutes = dto.DurationMinutes,
                ReleaseDate = dto.ReleaseDate,
                Genres = SerializeListOrNull(dto.Genres),
                Rating = dto.Rating,
                Language = dto.Language,
                Director = dto.Director,
                Cast = SerializeListOrNull(dto.Cast),
                AgeRating = dto.AgeRating,
                Status = dto.Status
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                PosterUrl = movie.PosterUrl,
                BannerUrl = movie.BannerUrl,
                TrailerUrl = movie.TrailerUrl,
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Genres = ParseStringList(movie.Genres),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = ParseStringList(movie.Cast),
                AgeRating = movie.AgeRating,
                Status = movie.Status
            };
        }

        public async Task<MovieDTO?> UpdateMovieAsync(Guid id, UpdateMovieDTO dto)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return null;

            if (dto.Title != null) movie.Title = dto.Title;
            if (dto.Description != null) movie.Description = dto.Description;
            if (dto.PosterUrl != null) movie.PosterUrl = dto.PosterUrl;
            if (dto.BannerUrl != null) movie.BannerUrl = dto.BannerUrl;
            if (dto.TrailerUrl != null) movie.TrailerUrl = dto.TrailerUrl;
            if (dto.DurationMinutes.HasValue) movie.DurationMinutes = dto.DurationMinutes.Value;
            if (dto.ReleaseDate.HasValue) movie.ReleaseDate = dto.ReleaseDate.Value;
            if (dto.Genres != null) movie.Genres = SerializeListOrNull(dto.Genres);
            if (dto.Rating.HasValue) movie.Rating = dto.Rating;
            if (dto.Language != null) movie.Language = dto.Language;
            if (dto.Director != null) movie.Director = dto.Director;
            if (dto.Cast != null) movie.Cast = SerializeListOrNull(dto.Cast);
            if (dto.AgeRating != null) movie.AgeRating = dto.AgeRating;
            if (dto.Status != null) movie.Status = dto.Status;

            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                PosterUrl = movie.PosterUrl,
                BannerUrl = movie.BannerUrl,
                TrailerUrl = movie.TrailerUrl,
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Genres = ParseStringList(movie.Genres),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = ParseStringList(movie.Cast),
                AgeRating = movie.AgeRating,
                Status = movie.Status
            };
        }

        public async Task<bool> DeleteMovieAsync(Guid id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return false;

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
