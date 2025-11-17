using System.ComponentModel.DataAnnotations;

namespace cinema_booking_server.DTOs
{
    public class LoginRequestDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class RegisterRequestDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [StringLength(200)]
        public string FullName { get; set; }

        [Phone]
        public string Phone { get; set; }
    }

    public class LoginResponseDTO
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public UserDTO User { get; set; }
    }

    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ChangePasswordRequestDTO
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }

    public class ChangePasswordResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}