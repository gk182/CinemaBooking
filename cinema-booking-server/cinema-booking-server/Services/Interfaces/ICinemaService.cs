using cinema_booking_server.DTOs;

namespace cinema_booking_server.Services.Interfaces
{
    public interface ICinemaService
    {
        Task<IEnumerable<CinemaDTO>> GetAllCinemaAsync();
        Task<CinemaDTO> GetCinemaByIdAsync(Guid id);
        Task<CinemaDTO> CreateCinemaAsync(CreateCinemaDTO dto);
        Task<CinemaDTO> UpdateCinemaAsync(Guid id, UpdateCinemaDTO dto);
        Task<bool> DeleteCinemaAsync(Guid id);
    }
}
