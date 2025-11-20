using cinema_booking_server.Data;
using cinema_booking_server.DTOs;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace cinema_booking_server.Services.Implementations
{
    public class RoomService : IRoomService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RoomService> _logger;

        public RoomService(ApplicationDbContext context, ILogger<RoomService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<RoomDTO>> GetAllRoomsAsync()
        {
            return await _context.Rooms
                .Select(r => new RoomDTO
                {
                    Id = r.Id,
                    CinemaId = r.CinemaId,
                    Name = r.Name,
                    RowsCount = r.RowsCount,
                    SeatsPerRow = r.SeatsPerRow,
                    Description = r.Description
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<RoomDTO>> GetRoomByCinemaAsync(Guid cinemaId)
        {
            return await _context.Rooms
                .Where(r => r.CinemaId == cinemaId)
                .Select(r => new RoomDTO
                {
                    Id = r.Id,
                    CinemaId = r.CinemaId,
                    Name = r.Name,
                    RowsCount = r.RowsCount,
                    SeatsPerRow = r.SeatsPerRow,
                    Description = r.Description
                })
                .ToListAsync();
        }

        public async Task<RoomDTO> GetRoomByIdAsync(Guid id)
        {
            var room = await _context.Rooms.FindAsync(id)
                ?? throw new InvalidOperationException("Room not found");

            return new RoomDTO
            {
                Id = room.Id,
                CinemaId = room.CinemaId,
                Name = room.Name,
                RowsCount = room.RowsCount,
                SeatsPerRow = room.SeatsPerRow,
                Description = room.Description
            };
        }

        public async Task<RoomDTO> CreateRoomAsync(CreateRoomDTO dto)
        {
            var room = new Room
            {
                CinemaId = dto.CinemaId,
                Name = dto.Name,
                RowsCount = dto.RowsCount,
                SeatsPerRow = dto.SeatsPerRow,
                Description = dto.Description,
            };

            // Add room
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            // Auto-generate seats
            var seats = new List<Seat>();
            for (int r = 0; r < dto.RowsCount; r++)
            {
                string rowLabel = ((char)('A' + r)).ToString();
                for (int s = 1; s <= dto.SeatsPerRow; s++)
                {
                    seats.Add(new Seat
                    {
                        RoomId = room.Id,
                        RowLabel = rowLabel,
                        SeatNumber = s,
                        SeatType = "standard",
                        IsBlocked = false,
                        CreatedAt = DateTimeOffset.UtcNow
                    });
                }
            }

            _context.Seats.AddRange(seats);
            await _context.SaveChangesAsync();

            return await GetRoomByIdAsync(room.Id);
        }

        public async Task<RoomDTO> UpdateRoomAsync(Guid id, UpdateRoomDTO dto)
        {
            var room = await _context.Rooms.FindAsync(id)
                ?? throw new InvalidOperationException("Room not found");

            room.Name = dto.Name;
            room.RowsCount = dto.RowsCount;
            room.SeatsPerRow = dto.SeatsPerRow;
            room.Description = dto.Description;

            await _context.SaveChangesAsync();
            return await GetRoomByIdAsync(id);
        }

        public async Task<bool> DeleteRoomAsync(Guid id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null) return false;

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
