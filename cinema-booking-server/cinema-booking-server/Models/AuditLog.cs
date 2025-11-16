using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class AuditLog
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [StringLength(200)]
        public string? Entity { get; set; }

        public Guid? EntityId { get; set; }

        [Required]
        [StringLength(100)]
        public string Action { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(max)")]
        public string? Detail { get; set; }

        [ForeignKey("User")]
        public Guid? CreatedBy { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public User? User { get; set; }
    }
}