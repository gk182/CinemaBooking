using cinema_booking_server.DTOs;
using cinema_booking_server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace cinema_booking_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaService _service;

        public CinemaController(ICinemaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cinema = await _service.GetAllCinemaAsync();
            return Ok(cinema);
        }
            

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var cinema = await _service.GetCinemaByIdAsync(id);
            if (cinema == null) return NotFound();
            return Ok(cinema);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCinemaDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var cinema = await _service.CreateCinemaAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = cinema.Id }, cinema);

        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, UpdateCinemaDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updatedCinema = await _service.UpdateCinemaAsync(id, dto);
            if(updatedCinema == null) return NotFound(); 
            return Ok(updatedCinema);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteCinemaAsync(id);
            if(!deleted) return NotFound();
            return NoContent();
        }
            
    }
}
