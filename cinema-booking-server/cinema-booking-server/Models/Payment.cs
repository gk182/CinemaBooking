using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [StringLength(200)]
        public string? ProviderPaymentId { get; set; }

        [Required]
        [Column(TypeName = "decimal(12,2)")]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(10)]
        public string Currency { get; set; } = "VND";

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "pending"; // pending, succeeded, failed, refunded

        [StringLength(50)]
        public string? Method { get; set; } // credit_card, debit_card, momo, zalopay

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}