using cinema_booking_server.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;

namespace cinema_booking_server.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Check if data already exists
                if (context.Roles.Any())
                {
                    return;
                }

                // Seed Roles
                var roles = new List<Role>
                {
                    new Role { Id = Guid.NewGuid(), Name = "Admin" },
                    new Role { Id = Guid.NewGuid(), Name = "Staff" },
                    new Role { Id = Guid.NewGuid(), Name = "Customer" }
                };
                context.Roles.AddRange(roles);
                context.SaveChanges();

                // Seed Users
                var adminRole = context.Roles.FirstOrDefault(r => r.Name == "Admin");
                var staffRole = context.Roles.FirstOrDefault(r => r.Name == "Staff");
                var customerRole = context.Roles.FirstOrDefault(r => r.Name == "Customer");

                var users = new List<User>
                {
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Email = "admin@cinema.com",
                        PasswordHash = "a",
                        FullName = "Admin User",
                        Phone = "0901234567",
                        RoleId = adminRole?.Id,
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Email = "staff@cinema.com",
                        PasswordHash = "a",
                        FullName = "Staff User",
                        Phone = "0902345678",
                        RoleId = staffRole?.Id,
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Email = "customer1@gmail.com",
                        PasswordHash = "a",
                        FullName = "John Doe",
                        Phone = "0903456789",
                        RoleId = customerRole?.Id,
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Email = "customer2@gmail.com",
                        PasswordHash = "a",
                        FullName = "Jane Smith",
                        Phone = "0904567890",
                        RoleId = customerRole?.Id,
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    }
                };
                context.Users.AddRange(users);
                context.SaveChanges();

                // Seed Cinemas
                var cinemas = new List<Cinema>
                {
                    new Cinema
                    {
                        Id = Guid.NewGuid(),
                        Name = "CGV Vincom Da Nang",
                        Address = "910A Ngo Quyen Street, Son Tra District",
                        City = "Da Nang",
                        Phone = "0236 3630 555",
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new Cinema
                    {
                        Id = Guid.NewGuid(),
                        Name = "CGV Lotte Mart",
                        Address = "6 Nam Ky Khoi Nghia Street, Hai Chau District",
                        City = "Da Nang",
                        Phone = "0236 3679 888",
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new Cinema
                    {
                        Id = Guid.NewGuid(),
                        Name = "BHD Star Cineplex",
                        Address = "159A Pasteur, District 1",
                        City = "Ho Chi Minh",
                        Phone = "028 3822 8188",
                        IsActive = true,
                        CreatedAt = DateTimeOffset.UtcNow
                    }
                };
                context.Cinemas.AddRange(cinemas);
                context.SaveChanges();

                // Seed Rooms
                var rooms = new List<Room>();
                foreach (var cinema in cinemas)
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        rooms.Add(new Room
                        {
                            Id = Guid.NewGuid(),
                            CinemaId = cinema.Id,
                            Name = $"Cinema {i}",
                            RowsCount = i == 1 ? 10 : i == 2 ? 8 : 12,
                            SeatsPerRow = i == 1 ? 15 : i == 2 ? 12 : 16,
                            Description = $"Screen {i} - {(i == 3 ? "4DX" : "Standard")} Format",
                            CreatedAt = DateTimeOffset.UtcNow
                        });
                    }
                }
                context.Rooms.AddRange(rooms);
                context.SaveChanges();

                // Seed Seats
                var seats = new List<Seat>();
                foreach (var room in rooms)
                {
                    char[] rowLabels = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' };
                    
                    for (int row = 0; row < room.RowsCount; row++)
                    {
                        for (int seatNum = 1; seatNum <= room.SeatsPerRow; seatNum++)
                        {
                            string seatType = "standard";
                            decimal price = 120000;

                            // VIP seats in middle rows
                            if (row >= room.RowsCount / 2 - 1 && row < room.RowsCount / 2 + 1 && seatNum > 5 && seatNum < room.SeatsPerRow - 4)
                            {
                                seatType = "vip";
                                price = 180000;
                            }

                            // Couple seats (side by side)
                            if (seatNum == room.SeatsPerRow - 1)
                            {
                                seatType = "couple";
                                price = 250000;
                            }

                            seats.Add(new Seat
                            {
                                Id = Guid.NewGuid(),
                                RoomId = room.Id,
                                RowLabel = rowLabels[row].ToString(),
                                SeatNumber = seatNum,
                                SeatType = seatType,
                                DefaultPrice = price,
                                IsBlocked = false,
                                CreatedAt = DateTimeOffset.UtcNow
                            });
                        }
                    }
                }
                context.Seats.AddRange(seats);
                context.SaveChanges();

                // Seed Movies
                var movies = new List<Movie>
                {
                    new Movie
                    {
                        Id = Guid.NewGuid(),
                        Title = "Inception",
                        Description = "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                        PosterUrl = "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                        BannerUrl = "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
                        TrailerUrl = "https://www.youtube.com/watch?v=YoHD9XEInc0",
                        DurationMinutes = 148,
                        ReleaseDate = new DateTime(2024, 1, 15),
                        Genres = "Action,Sci-Fi,Thriller",
                        Rating = 4.8m,
                        Language = "English",
                        Director = "Christopher Nolan",
                        Cast = "Leonardo DiCaprio,Ellen Page,Joseph Gordon-Levitt",
                        AgeRating = "PG-13",
                        Status = "now_showing",
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new Movie
                    {
                        Id = Guid.NewGuid(),
                        Title = "The Dark Knight",
                        Description = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
                        PosterUrl = "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                        BannerUrl = "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
                        TrailerUrl = "https://www.youtube.com/watch?v=EXeTwQWrcwY",
                        DurationMinutes = 152,
                        ReleaseDate = new DateTime(2024, 2, 20),
                        Genres = "Action,Crime,Drama",
                        Rating = 4.9m,
                        Language = "English",
                        Director = "Christopher Nolan",
                        Cast = "Christian Bale,Heath Ledger,Aaron Eckhart",
                        AgeRating = "PG-13",
                        Status = "coming_soon",
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new Movie
                    {
                        Id = Guid.NewGuid(),
                        Title = "Interstellar",
                        Description = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                        PosterUrl = "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                        BannerUrl = "https://image.tmdb.org/t/p/original/xJHokMbNMnRiGqnhcXX1aIAP87L.jpg",
                        TrailerUrl = "https://www.youtube.com/watch?v=zSID6PnTriE",
                        DurationMinutes = 169,
                        ReleaseDate = new DateTime(2024, 3, 10),
                        Genres = "Adventure,Drama,Sci-Fi",
                        Rating = 4.7m,
                        Language = "English",
                        Director = "Christopher Nolan",
                        Cast = "Matthew McConaughey,Anne Hathaway,Jessica Chastain",
                        AgeRating = "PG-13",
                        Status = "now_showing",
                        CreatedAt = DateTimeOffset.UtcNow
                    },
                    new Movie
                    {
                        Id = Guid.NewGuid(),
                        Title = "Avengers: Endgame",
                        Description = "After the devastating events, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                        PosterUrl = "https://image.tmdb.org/t/p/w500/or06FSLCaQeVfrvMNHA56oVZEDu.jpg",
                        BannerUrl = "https://image.tmdb.org/t/p/original/ptpr8CEIqcW6u5Sx76SA0b1u0dv.jpg",
                        TrailerUrl = "https://www.youtube.com/watch?v=TcMBFSGVi1c",
                        DurationMinutes = 181,
                        ReleaseDate = new DateTime(2024, 4, 5),
                        Genres = "Action,Adventure,Drama",
                        Rating = 4.6m,
                        Language = "English",
                        Director = "Anthony Russo,Joe Russo",
                        Cast = "Robert Downey Jr.,Chris Evans,Mark Ruffalo",
                        AgeRating = "PG-13",
                        Status = "ended",
                        CreatedAt = DateTimeOffset.UtcNow
                    }
                };
                context.Movies.AddRange(movies);
                context.SaveChanges();

                // Seed Showtimes
                var showtimes = new List<Showtime>();
                var selectedRooms = rooms.Take(6).ToList();
                var selectedMovies = movies.Take(3).ToList();

                var now = DateTimeOffset.UtcNow;
                foreach (var room in selectedRooms)
                {
                    var movie = selectedMovies[selectedRooms.IndexOf(room) % selectedMovies.Count];
                    var showtimesPerDay = new[] { 10, 13, 16, 19, 22 };

                    foreach (var hour in showtimesPerDay)
                    {
                        showtimes.Add(new Showtime
                        {
                            Id = Guid.NewGuid(),
                            MovieId = movie.Id,
                            RoomId = room.Id,
                            StartTime = now.AddDays(1).Date.AddHours(hour),
                            EndTime = now.AddDays(1).Date.AddHours(hour).AddMinutes(movie.DurationMinutes ?? 120),
                            BasePrice = 120000,
                            Status = "open",
                            CreatedAt = DateTimeOffset.UtcNow
                        });
                    }
                }
                context.Showtimes.AddRange(showtimes);
                context.SaveChanges();

                // Seed ShowtimeSeatStatus
                var seatStatuses = new List<ShowtimeSeatStatus>();
                foreach (var showtime in showtimes)
                {
                    var roomSeats = seats.Where(s => s.RoomId == showtime.RoomId).ToList();
                    foreach (var seat in roomSeats)
                    {
                        seatStatuses.Add(new ShowtimeSeatStatus
                        {
                            Id = Guid.NewGuid(),
                            ShowtimeId = showtime.Id,
                            SeatId = seat.Id,
                            RowLabel = seat.RowLabel,
                            SeatNumber = seat.SeatNumber,
                            Status = seat.IsBlocked ? "blocked" : "available",
                            LastUpdated = DateTimeOffset.UtcNow
                        });
                    }
                }
                context.ShowtimeSeatStatuses.AddRange(seatStatuses);
                context.SaveChanges();

                // Seed Payments
                var payments = new List<Payment>
                {
                    new Payment
                    {
                        Id = Guid.NewGuid(),
                        Amount = 240000,
                        Currency = "VND",
                        Status = "succeeded",
                        Method = "credit_card",
                        ProviderPaymentId = "PAY_001",
                        CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
                    },
                    new Payment
                    {
                        Id = Guid.NewGuid(),
                        Amount = 360000,
                        Currency = "VND",
                        Status = "succeeded",
                        Method = "momo",
                        ProviderPaymentId = "PAY_002",
                        CreatedAt = DateTimeOffset.UtcNow.AddHours(-2)
                    }
                };
                context.Payments.AddRange(payments);
                context.SaveChanges();

                // Seed Bookings
                var customer1 = context.Users.FirstOrDefault(u => u.Email == "customer1@gmail.com");
                var customer2 = context.Users.FirstOrDefault(u => u.Email == "customer2@gmail.com");
                var firstShowtime = showtimes.First();
                var secondShowtime = showtimes.Skip(1).First();

                var bookings = new List<Booking>
                {
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        UserId = customer1?.Id,
                        ShowtimeId = firstShowtime.Id,
                        PaymentId = payments[0].Id,
                        TotalAmount = 240000,
                        Status = "confirmed",
                        CreatedAt = DateTimeOffset.UtcNow.AddDays(-1)
                    },
                    new Booking
                    {
                        Id = Guid.NewGuid(),
                        UserId = customer2?.Id,
                        ShowtimeId = secondShowtime.Id,
                        PaymentId = payments[1].Id,
                        TotalAmount = 360000,
                        Status = "confirmed",
                        CreatedAt = DateTimeOffset.UtcNow.AddHours(-2)
                    }
                };
                context.Bookings.AddRange(bookings);
                context.SaveChanges();

                // Seed BookingSeats
                var bookingSeats = new List<BookingSeat>
                {
                    new BookingSeat
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookings[0].Id,
                        RowLabel = "A",
                        SeatNumber = 1,
                        Price = 120000,
                        Status = "sold"
                    },
                    new BookingSeat
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookings[0].Id,
                        RowLabel = "A",
                        SeatNumber = 2,
                        Price = 120000,
                        Status = "sold"
                    },
                    new BookingSeat
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookings[1].Id,
                        RowLabel = "B",
                        SeatNumber = 5,
                        Price = 180000,
                        Status = "sold"
                    },
                    new BookingSeat
                    {
                        Id = Guid.NewGuid(),
                        BookingId = bookings[1].Id,
                        RowLabel = "B",
                        SeatNumber = 6,
                        Price = 180000,
                        Status = "sold"
                    }
                };
                context.BookingSeats.AddRange(bookingSeats);
                context.SaveChanges();
            }
        }
    }
}