using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace cinema_booking_server.DTOs
{
    public class CinemaDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Phone { get; set; }
        public bool IsActive { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public List<RoomDTO> Rooms { get; set; } = [];   

    }

    public class CreateCinemaDTO
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Address { get; set; }

        [StringLength(200)]
        public string? City { get; set; }

        [StringLength(20)]
        public string? Phone { get; set; }
    }

    public class UpdateCinemaDTO : CreateCinemaDTO
    {
        public bool IsActive { get; set; } = true;
    }
}
