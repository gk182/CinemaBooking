using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(256)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(512)]
        public string? PasswordHash { get; set; }

        [StringLength(200)]
        public string? FullName { get; set; }

        [StringLength(50)]
        public string? Phone { get; set; }

        [ForeignKey("Role")]
        public Guid? RoleId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        public DateTimeOffset? UpdatedAt { get; set; }

        // Navigation properties
        public Role? Role { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();
    }
}