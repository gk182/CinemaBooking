using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Seat
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("Room")]
        [Required]
        public Guid RoomId { get; set; }

        [Required]
        [StringLength(10)]
        public string RowLabel { get; set; } = string.Empty;

        [Required]
        [Range(1, 100)]
        public int SeatNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string SeatType { get; set; } = "standard"; // standard, vip, couple

        [Column(TypeName = "decimal(10,2)")]
        public decimal? DefaultPrice { get; set; }

        [Required]
        public bool IsBlocked { get; set; } = false;

        // Navigation properties
        public Room? Room { get; set; }
        public ICollection<BookingSeat> BookingSeats { get; set; } = new List<BookingSeat>();
        public ICollection<ShowtimeSeatStatus> ShowtimeSeatStatuses { get; set; } = new List<ShowtimeSeatStatus>();
        public DateTimeOffset CreatedAt { get; internal set; }
    }
}