using System.ComponentModel.DataAnnotations;

namespace cinema_booking_server.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        // Navigation properties
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
