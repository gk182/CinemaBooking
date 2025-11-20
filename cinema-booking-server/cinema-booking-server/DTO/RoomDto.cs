using System.ComponentModel.DataAnnotations;

namespace cinema_booking_server.DTOs
{
    public class RoomDTO
    {
        public Guid Id { get; set; }
        public Guid CinemaId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int RowsCount { get; set; }
        public int SeatsPerRow { get; set; }
        public string? Description { get; set; }
    }

    public class CreateRoomDTO
    {
        [Required]
        public Guid CinemaId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 50)]
        public int RowsCount { get; set; }

        [Range(1, 50)]
        public int SeatsPerRow { get; set; }

        public string? Description { get; set; }
    }

    public class UpdateRoomDTO : CreateRoomDTO { }
}
