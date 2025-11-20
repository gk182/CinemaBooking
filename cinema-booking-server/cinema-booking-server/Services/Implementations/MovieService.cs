using cinema_booking_server.Data;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using cinema_booking_server.DTOs;
using Microsoft.EntityFrameworkCore;

namespace cinema_booking_server.Services.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly ApplicationDbContext _context;

        public MovieService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MovieDTO>> GetAllMoviesAsync()
        {
            var movies = await _context.Movies.ToListAsync(); // Lấy dữ liệu ra memory

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
                Genres = m.Genres != null ? m.Genres.Split(',').ToList() : null,
                Rating = m.Rating,
                Language = m.Language,
                Director = m.Director,
                Cast = m.Cast != null ? m.Cast.Split(',').ToList() : null,
                AgeRating = m.AgeRating,
                Status = m.Status
            });
        }


        public async Task<MovieDTO> GetMovieByIdAsync(Guid id)
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
                Genres = movie.Genres?.Split(',').ToList(),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = movie.Cast?.Split(',').ToList(),
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
                Genres = dto.Genres != null ? string.Join(',', dto.Genres) : null,
                Rating = dto.Rating,
                Language = dto.Language,
                Director = dto.Director,
                Cast = dto.Cast != null ? string.Join(',', dto.Cast) : null,
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
                Genres = movie.Genres?.Split(',').ToList(),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = movie.Cast?.Split(',').ToList(),
                AgeRating = movie.AgeRating,
                Status = movie.Status
            };
        }

        public async Task<MovieDTO> UpdateMovieAsync(Guid id, UpdateMovieDTO dto)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return null;

            if (dto.Title != null) movie.Title = dto.Title;
            if (dto.Description != null) movie.Description = dto.Description;
            if (dto.PosterUrl != null) movie.PosterUrl = dto.PosterUrl;
            if (dto.BannerUrl != null) movie.BannerUrl = dto.BannerUrl;
            if (dto.TrailerUrl != null) movie.TrailerUrl = dto.TrailerUrl;
            if (dto.DurationMinutes.HasValue) movie.DurationMinutes = dto.DurationMinutes;
            if (dto.ReleaseDate.HasValue) movie.ReleaseDate = dto.ReleaseDate;
            if (dto.Genres != null) movie.Genres = string.Join(',', dto.Genres);
            if (dto.Rating.HasValue) movie.Rating = dto.Rating;
            if (dto.Language != null) movie.Language = dto.Language;
            if (dto.Director != null) movie.Director = dto.Director;
            if (dto.Cast != null) movie.Cast = string.Join(',', dto.Cast);
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
                Genres = movie.Genres?.Split(',').ToList(),
                Rating = movie.Rating,
                Language = movie.Language,
                Director = movie.Director,
                Cast = movie.Cast?.Split(',').ToList(),
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
