using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Room
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [ForeignKey("Cinema")]
        [Required]
        public Guid CinemaId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(1, 50)]
        public int RowsCount { get; set; }

        [Required]
        [Range(1, 50)]
        public int SeatsPerRow { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public Cinema? Cinema { get; set; }
        public ICollection<Seat> Seats { get; set; } = new List<Seat>();
        public ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
    }
}