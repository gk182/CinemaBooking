using cinema_booking_server.DTOs;
using cinema_booking_server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace cinema_booking_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        // GET: api/movies
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        // GET: api/movies/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        // POST: api/movies
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var movie = await _movieService.CreateMovieAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = movie.Id }, movie);
        }

        // PUT: api/movies/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateMovieDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updatedMovie = await _movieService.UpdateMovieAsync(id, dto);
            if (updatedMovie == null) return NotFound();

            return Ok(updatedMovie);
        }

        // DELETE: api/movies/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _movieService.DeleteMovieAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}
