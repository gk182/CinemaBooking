using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class ShowtimeSeatStatus
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("Showtime")]
        [Required]
        public Guid ShowtimeId { get; set; }

        [ForeignKey("Seat")]
        public Guid? SeatId { get; set; }

        [Required]
        [StringLength(10)]
        public string RowLabel { get; set; } = string.Empty;

        [Required]
        [Range(1, 100)]
        public int SeatNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "available"; // available, blocked, reserved, sold

        [Required]
        public DateTimeOffset LastUpdated { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public Showtime? Showtime { get; set; }
        public Seat? Seat { get; set; }
    }
}