using cinema_booking_server.DTOs;

namespace cinema_booking_server.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDTO>> GetAllRoomsAsync();

        Task<IEnumerable<RoomDTO>> GetRoomByCinemaAsync(Guid cinemaId);
        Task<RoomDTO> GetRoomByIdAsync(Guid id);
        Task<RoomDTO> CreateRoomAsync(CreateRoomDTO dto);
        Task<RoomDTO> UpdateRoomAsync(Guid id, UpdateRoomDTO dto);
        Task<bool> DeleteRoomAsync(Guid id);
    }
}
