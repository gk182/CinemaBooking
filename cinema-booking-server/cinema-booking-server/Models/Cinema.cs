using System.ComponentModel.DataAnnotations;

namespace cinema_booking_server.Models
{
    public class Cinema
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(200)]
        public string? City { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public ICollection<Room> Rooms { get; set; } = new List<Room>();
    }
}