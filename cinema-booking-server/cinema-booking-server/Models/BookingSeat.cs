using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class BookingSeat
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("Booking")]
        [Required]
        public Guid BookingId { get; set; }

        [ForeignKey("Seat")]
        public Guid? SeatId { get; set; }

        [Required]
        [StringLength(10)]
        public string RowLabel { get; set; } = string.Empty;

        [Required]
        [Range(1, 100)]
        public int SeatNumber { get; set; }

        [Required]
        [Column(TypeName = "decimal(12,2)")]
        public decimal Price { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "booked"; // booked, cancelled, sold

        // Navigation properties
        public Booking? Booking { get; set; }
        public Seat? Seat { get; set; }
    }
}