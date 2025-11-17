using cinema_booking_server.Models;
using cinema_booking_server.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace cinema_booking_server.Services.Interfaces
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDTO>> GetAllMoviesAsync();
        Task<MovieDTO> GetMovieByIdAsync(Guid id);
        Task<MovieDTO> CreateMovieAsync(CreateMovieDTO dto);
        Task<MovieDTO> UpdateMovieAsync(Guid id, UpdateMovieDTO dto);
        Task<bool> DeleteMovieAsync(Guid id);
    }
}
