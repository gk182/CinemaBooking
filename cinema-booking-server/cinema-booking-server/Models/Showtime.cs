using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Showtime
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("Movie")]
        [Required]
        public Guid MovieId { get; set; }

        [ForeignKey("Room")]
        [Required]
        public Guid RoomId { get; set; }

        [Required]
        public DateTimeOffset StartTime { get; set; }

        [Required]
        public DateTimeOffset EndTime { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal BasePrice { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "open"; // open, cancelled, finished

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public Movie? Movie { get; set; }
        public Room? Room { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<ShowtimeSeatStatus> SeatStatuses { get; set; } = new List<ShowtimeSeatStatus>();
    }
}