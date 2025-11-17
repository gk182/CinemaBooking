using cinema_booking_server.Data;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using cinema_booking_server.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return await _context.Movies
                .Select(m => new MovieDTO
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    DurationMinutes = m.DurationMinutes,
                    ReleaseDate = m.ReleaseDate,
                    Status = m.Status
                })
                .ToListAsync();
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
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Status = movie.Status
            };
        }

        public async Task<MovieDTO> CreateMovieAsync(CreateMovieDTO dto)
        {
            var movie = new Movie
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                DurationMinutes = dto.DurationMinutes,
                ReleaseDate = dto.ReleaseDate,
                Status = dto.Status
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Status = movie.Status
            };
        }

        public async Task<MovieDTO> UpdateMovieAsync(Guid id, UpdateMovieDTO dto)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return null;

            movie.Title = dto.Title ?? movie.Title;
            movie.Description = dto.Description ?? movie.Description;
            movie.DurationMinutes = dto.DurationMinutes ?? movie.DurationMinutes;
            movie.ReleaseDate = dto.ReleaseDate ?? movie.ReleaseDate;
            movie.Status = dto.Status ?? movie.Status;

            await _context.SaveChangesAsync();

            return new MovieDTO
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
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
