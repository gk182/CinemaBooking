using Microsoft.EntityFrameworkCore;
using cinema_booking_server.Models;

namespace cinema_booking_server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Showtime> Showtimes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingSeat> BookingSeats { get; set; }
        public DbSet<ShowtimeSeatStatus> ShowtimeSeatStatuses { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add unique constraints
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Seat>()
                .HasIndex(s => new { s.RoomId, s.RowLabel, s.SeatNumber })
                .IsUnique();
            modelBuilder.Entity<ShowtimeSeatStatus>()
                .HasIndex(s => new { s.ShowtimeId, s.RowLabel, s.SeatNumber })
                .IsUnique();
        }
    }
}