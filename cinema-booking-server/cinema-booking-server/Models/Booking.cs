using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Booking
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("User")]
        public Guid? UserId { get; set; }

        [ForeignKey("Showtime")]
        [Required]
        public Guid ShowtimeId { get; set; }

        [ForeignKey("Payment")]
        public Guid? PaymentId { get; set; }

        [Required]
        [Column(TypeName = "decimal(12,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "pending"; // pending, confirmed, cancelled

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        public DateTimeOffset? UpdatedAt { get; set; }

        // Navigation properties
        public User? User { get; set; }
        public Showtime? Showtime { get; set; }
        public Payment? Payment { get; set; }
        public ICollection<BookingSeat> BookingSeats { get; set; } = new List<BookingSeat>();
    }
}