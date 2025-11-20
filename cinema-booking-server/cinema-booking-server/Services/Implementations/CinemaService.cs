using cinema_booking_server.Data;
using cinema_booking_server.DTOs;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace cinema_booking_server.Services.Implementations
{
    public class CinemaService : ICinemaService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CinemaService> _logger;

        public CinemaService(ApplicationDbContext context, ILogger<CinemaService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<CinemaDTO>> GetAllCinemaAsync()
        {
            return await _context.Cinemas
                .Select(c => new CinemaDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Address = c.Address,
                    City = c.City,
                    Phone = c.Phone,
                    IsActive = c.IsActive,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<CinemaDTO> GetCinemaByIdAsync(Guid id)
        {
            var cinema = await _context.Cinemas.FindAsync(id)
                ?? throw new InvalidOperationException("Cinema not found");

            return new CinemaDTO
            {
                Id = cinema.Id,
                Name = cinema.Name,
                Address = cinema.Address,
                City = cinema.City,
                Phone = cinema.Phone,
                IsActive = cinema.IsActive,
                CreatedAt = cinema.CreatedAt
            };
        }

        public async Task<CinemaDTO> CreateCinemaAsync(CreateCinemaDTO dto)
        {
            var cinema = new Cinema
            {
                Name = dto.Name,
                Address = dto.Address,
                City = dto.City,
                Phone = dto.Phone,
            };

            _context.Cinemas.Add(cinema);
            await _context.SaveChangesAsync();

            return await GetCinemaByIdAsync(cinema.Id);
        }

        public async Task<CinemaDTO> UpdateCinemaAsync(Guid id, UpdateCinemaDTO dto)
        {
            var cinema = await _context.Cinemas.FindAsync(id)
                ?? throw new InvalidOperationException("Cinema not found");

            cinema.Name = dto.Name;
            cinema.Address = dto.Address;
            cinema.City = dto.City;
            cinema.Phone = dto.Phone;
            cinema.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();
            return await GetCinemaByIdAsync(id);
        }

        public async Task<bool> DeleteCinemaAsync(Guid id)
        {
            var cinema = await _context.Cinemas.FindAsync(id);
            if (cinema == null) return false;

            _context.Cinemas.Remove(cinema);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
