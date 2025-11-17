using cinema_booking_server.DTOs;
using System.Threading.Tasks;

namespace cinema_booking_server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request);
        Task<LoginResponseDTO> RegisterAsync(RegisterRequestDTO request);
        Task<LoginResponseDTO> RefreshTokenAsync(string refreshToken);
        Task<bool> ValidateTokenAsync(string token);
        Task LogoutAsync(string userId);
        Task<ChangePasswordResponseDTO> ChangePasswordAsync(string userId, ChangePasswordRequestDTO request);
    }
}