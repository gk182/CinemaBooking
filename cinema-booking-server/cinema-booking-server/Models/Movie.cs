using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cinema_booking_server.Models
{
    public class Movie
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Column(TypeName = "nvarchar(max)")]
        public string? Description { get; set; }

        [StringLength(1000)]
        public string? PosterUrl { get; set; }

        [StringLength(1000)]
        public string? BannerUrl { get; set; }

        [StringLength(1000)]
        public string? TrailerUrl { get; set; }

        [Range(1, 500)]
        public int? DurationMinutes { get; set; }

        public DateTime? ReleaseDate { get; set; }

        [StringLength(500)]
        public string? Genres { get; set; } // JSON or comma-separated

        [Column(TypeName = "decimal(3,2)")]
        [Range(0, 10)]
        public decimal? Rating { get; set; }

        [StringLength(100)]
        public string? Language { get; set; }

        [StringLength(200)]
        public string? Director { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Cast { get; set; }

        [StringLength(20)]
        public string? AgeRating { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "coming_soon"; // now_showing, coming_soon, ended

        [Required]
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Navigation properties
        public ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
    }
}