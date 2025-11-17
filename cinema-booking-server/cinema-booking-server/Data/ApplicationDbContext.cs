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

        // Add RefreshTokens DbSet
        public DbSet<cinema_booking_server.Models.RefreshToken> RefreshTokens { get; set; }

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

            // Configure RefreshToken
            modelBuilder.Entity<cinema_booking_server.Models.RefreshToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Token).IsUnique();
                entity.HasOne(e => e.User)
                      .WithMany() // keep it loose if User nav prop not present
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}