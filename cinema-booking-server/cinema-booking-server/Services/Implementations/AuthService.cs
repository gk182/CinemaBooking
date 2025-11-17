using cinema_booking_server.Data;
using cinema_booking_server.Models;
using cinema_booking_server.Services.Interfaces;
using cinema_booking_server.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace cinema_booking_server.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            ApplicationDbContext context,
            IConfiguration configuration,
            ILogger<AuthService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO request)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                {
                    _logger.LogWarning($"Failed login attempt for email: {request.Email}");
                    throw new UnauthorizedAccessException("Invalid email or password");
                }

                if (!user.IsActive)
                {
                    throw new UnauthorizedAccessException("User account is inactive");
                }

                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();

                // Lưu refresh token vào DB (nếu cần)
                user.UpdatedAt = DateTimeOffset.UtcNow;
                await _context.SaveChangesAsync();

                return new LoginResponseDTO
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    User = new UserDTO
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        FullName = user.FullName,
                        Phone = user.Phone,
                        Role = user.Role?.Name ?? "Customer",
                        CreatedAt = user.CreatedAt.DateTime
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login error");
                throw;
            }
        }

        public async Task<LoginResponseDTO> RegisterAsync(RegisterRequestDTO request)
        {
            try
            {
                // Check email already exists
                if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                {
                    throw new InvalidOperationException("Email already registered");
                }

                var customerRole = await _context.Roles
                    .FirstOrDefaultAsync(r => r.Name == "Customer");

                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Email = request.Email,
                    PasswordHash = HashPassword(request.Password),
                    FullName = request.FullName,
                    Phone = request.Phone,
                    RoleId = customerRole?.Id,
                    IsActive = true,
                    CreatedAt = DateTimeOffset.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Reload user with role
                user = await _context.Users
                    .Include(u => u.Role)
                    .FirstAsync(u => u.Id == user.Id);

                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();

                return new LoginResponseDTO
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    User = new UserDTO
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        FullName = user.FullName,
                        Phone = user.Phone,
                        Role = user.Role?.Name ?? "Customer",
                        CreatedAt = user.CreatedAt.DateTime
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Registration error");
                throw;
            }
        }

        public async Task<LoginResponseDTO> RefreshTokenAsync(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
                throw new UnauthorizedAccessException("Invalid refresh token");

            var tokenEntry = await _context.RefreshTokens
                .Include(rt => rt.User)
                .ThenInclude(u => u.Role)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (tokenEntry == null)
            {
                _logger.LogWarning("Refresh token not found");
                throw new UnauthorizedAccessException("Invalid refresh token");
            }

            if (tokenEntry.RevokedAt.HasValue || tokenEntry.ExpiresAt <= DateTimeOffset.UtcNow)
            {
                _logger.LogWarning("Refresh token expired or revoked");
                throw new UnauthorizedAccessException("Refresh token expired or revoked");
            }

            var user = tokenEntry.User;
            if (user == null)
            {
                _logger.LogWarning("Refresh token has no associated user");
                throw new UnauthorizedAccessException("Invalid refresh token");
            }

            // Generate new tokens
            var newJwt = GenerateJwtToken(user);
            var newRefresh = GenerateRefreshToken();
            var refreshExpiryDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpiryDays"] ?? "7");

            // Revoke old token and set replacement
            tokenEntry.RevokedAt = DateTimeOffset.UtcNow;
            tokenEntry.ReplacedByToken = newRefresh;

            // Create new refresh token record
            var newRefreshToken = new RefreshToken
            {
                UserId = user.Id,
                Token = newRefresh,
                ExpiresAt = DateTimeOffset.UtcNow.AddDays(refreshExpiryDays),
                CreatedAt = DateTimeOffset.UtcNow
            };

            _context.RefreshTokens.Add(newRefreshToken);
            await _context.SaveChangesAsync();

            return new LoginResponseDTO
            {
                Token = newJwt,
                RefreshToken = newRefresh,
                User = new UserDTO
                {
                    Id = user.Id.ToString(),
                    Email = user.Email,
                    FullName = user.FullName,
                    Phone = user.Phone,
                    Role = user.Role?.Name ?? "Customer",
                    CreatedAt = user.CreatedAt.DateTime
                }
            };
        }

        public async Task LogoutAsync(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return;

            if (!Guid.TryParse(userId, out var uid))
            {
                _logger.LogWarning("Invalid userId passed to LogoutAsync: {UserIdStr}", userId);
                return;
            }

            var tokens = await _context.RefreshTokens
                .Where(rt => rt.UserId == uid && rt.RevokedAt == null && rt.ExpiresAt > DateTimeOffset.UtcNow)
                .ToListAsync();

            foreach (var t in tokens)
            {
                t.RevokedAt = DateTimeOffset.UtcNow;
            }

            await _context.SaveChangesAsync();
            _logger.LogInformation("Revoked {Count} refresh tokens for user {UserId}", tokens.Count, userId);
        }

        public async Task<ChangePasswordResponseDTO> ChangePasswordAsync(string userId, ChangePasswordRequestDTO request)
        {
            var user = await _context.Users.FindAsync(Guid.Parse(userId));
            if (user == null)
            {
                return new ChangePasswordResponseDTO
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            if (!VerifyPassword(request.CurrentPassword, user.PasswordHash))
            {
                return new ChangePasswordResponseDTO
                {
                    Success = false,
                    Message = "Current password is incorrect"
                };
            }

            user.PasswordHash = HashPassword(request.NewPassword);
            user.UpdatedAt = DateTimeOffset.UtcNow;
            await _context.SaveChangesAsync();

            return new ChangePasswordResponseDTO
            {
                Success = true,
                Message = "Password changed successfully"
            };
        }

        // Helper Methods
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);
            var issuer = _configuration["JwtSettings:Issuer"];
            var audience = _configuration["JwtSettings:Audience"];
            var expiryMinutes = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "60");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Role, user.Role?.Name ?? "Customer")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private string HashPassword(string password)
        {
            using (var sha512 = SHA512.Create())
            {
                var hashBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var hashOfInput = HashPassword(password);
            return hashOfInput == hash;
        }

        public Task<bool> ValidateTokenAsync(string token)
        {
            throw new NotImplementedException();
        }
    }
}