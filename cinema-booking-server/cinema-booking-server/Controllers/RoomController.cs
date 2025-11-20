using cinema_booking_server.DTOs;
using cinema_booking_server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace cinema_booking_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _service;

        public RoomController(IRoomService service)
        {
            _service = service;
        }

        // GET ALL ROOMS
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rooms = await _service.GetAllRoomsAsync();
            return Ok(rooms);
        }

        // GET ROOM BY ID
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var room = await _service.GetRoomByIdAsync(id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        // GET ROOMS BY CINEMA ID
        [HttpGet("cinema/{cinemaId:guid}")]
        public async Task<IActionResult> GetByCinemaId(Guid cinemaId)
        {
            var rooms = await _service.GetRoomByCinemaAsync(cinemaId);
            return Ok(rooms);
        }

        // CREATE ROOM
        [HttpPost]
        public async Task<IActionResult> Create(CreateRoomDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var room = await _service.CreateRoomAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = room.Id }, room);
        }

        // UPDATE ROOM
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, UpdateRoomDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = await _service.UpdateRoomAsync(id, dto);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        // DELETE ROOM
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteRoomAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
