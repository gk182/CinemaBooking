-- Schema for Cinema Booking System (SQL Server)

SET NOCOUNT ON;

-- Roles (optional)
CREATE TABLE dbo.Roles (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Roles PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(50) NOT NULL UNIQUE
);

-- Users
CREATE TABLE dbo.Users (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Users PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(512) NULL,        -- store hashed password or null for OAuth
    FullName NVARCHAR(200) NULL,
    Phone NVARCHAR(50) NULL,
    RoleId UNIQUEIDENTIFIER NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIMEOFFSET NULL,
    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES dbo.Roles(Id)
);

-- Cinemas
CREATE TABLE dbo.Cinemas (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Cinemas PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500) NULL,
    City NVARCHAR(200) NULL,
    Phone NVARCHAR(50) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_Cinemas_City ON dbo.Cinemas(City);

-- Rooms (screens) per cinema
CREATE TABLE dbo.Rooms (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Rooms PRIMARY KEY DEFAULT NEWID(),
    CinemaId UNIQUEIDENTIFIER NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    RowsCount INT NOT NULL,
    SeatsPerRow INT NOT NULL,
    Description NVARCHAR(1000) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Rooms_Cinemas FOREIGN KEY (CinemaId) REFERENCES dbo.Cinemas(Id) ON DELETE CASCADE
);
CREATE INDEX IX_Rooms_CinemaId ON dbo.Rooms(CinemaId);

-- Seat definitions per room (layout)
CREATE TABLE dbo.Seats (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Seats PRIMARY KEY DEFAULT NEWID(),
    RoomId UNIQUEIDENTIFIER NOT NULL,
    RowLabel NVARCHAR(10) NOT NULL,   -- e.g. "A", "B", or "1"
    SeatNumber INT NOT NULL,          -- seat number within row
    SeatType NVARCHAR(50) NOT NULL DEFAULT 'standard', -- e.g. standard, vip, couple
    DefaultPrice DECIMAL(10,2) NULL,
    IsBlocked BIT NOT NULL DEFAULT 0, -- if seat physically blocked
    CONSTRAINT UQ_Seats_Room_Row_Number UNIQUE (RoomId, RowLabel, SeatNumber),
    CONSTRAINT FK_Seats_Rooms FOREIGN KEY (RoomId) REFERENCES dbo.Rooms(Id) ON DELETE CASCADE
);
CREATE INDEX IX_Seats_RoomId ON dbo.Seats(RoomId);

-- Movies
CREATE TABLE dbo.Movies (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Movies PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(300) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    PosterUrl NVARCHAR(1000) NULL,
    BannerUrl NVARCHAR(1000) NULL,
    TrailerUrl NVARCHAR(1000) NULL,
    DurationMinutes INT NULL,
    ReleaseDate DATE NULL,
    Genres NVARCHAR(500) NULL, -- consider normalized Genre table if needed
    Rating DECIMAL(3,2) NULL,
    Language NVARCHAR(100) NULL,
    Director NVARCHAR(200) NULL,
    Cast NVARCHAR(MAX) NULL,
    AgeRating NVARCHAR(20) NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'coming_soon', -- now_showing, coming_soon, ended
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX IX_Movies_Title ON dbo.Movies(Title);

-- Showtimes (screenings)
CREATE TABLE dbo.Showtimes (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Showtimes PRIMARY KEY DEFAULT NEWID(),
    MovieId UNIQUEIDENTIFIER NOT NULL,
    RoomId UNIQUEIDENTIFIER NOT NULL,
    StartTime DATETIMEOFFSET NOT NULL,
    EndTime DATETIMEOFFSET NOT NULL,
    BasePrice DECIMAL(10,2) NOT NULL,   -- base price for showtime
    Status NVARCHAR(50) NOT NULL DEFAULT 'open', -- open, cancelled, finished
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Showtimes_Movies FOREIGN KEY (MovieId) REFERENCES dbo.Movies(Id) ON DELETE CASCADE,
    CONSTRAINT FK_Showtimes_Rooms FOREIGN KEY (RoomId) REFERENCES dbo.Rooms(Id) ON DELETE CASCADE
);
CREATE INDEX IX_Showtimes_Room_Start ON dbo.Showtimes(RoomId, StartTime);
CREATE INDEX IX_Showtimes_Movie_Start ON dbo.Showtimes(MovieId, StartTime);

-- Payments
CREATE TABLE dbo.Payments (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Payments PRIMARY KEY DEFAULT NEWID(),
    ProviderPaymentId NVARCHAR(200) NULL,
    Amount DECIMAL(12,2) NOT NULL,
    Currency NVARCHAR(10) NOT NULL DEFAULT 'VND',
    Status NVARCHAR(50) NOT NULL, -- pending, succeeded, failed, refunded
    Method NVARCHAR(50) NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Bookings (a booking / order)
CREATE TABLE dbo.Bookings (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Bookings PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NULL,
    ShowtimeId UNIQUEIDENTIFIER NOT NULL,
    PaymentId UNIQUEIDENTIFIER NULL,
    TotalAmount DECIMAL(12,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL, -- pending, confirmed, cancelled
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIMEOFFSET NULL,
    CONSTRAINT FK_Bookings_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id),
    CONSTRAINT FK_Bookings_Showtimes FOREIGN KEY (ShowtimeId) REFERENCES dbo.Showtimes(Id),
    CONSTRAINT FK_Bookings_Payments FOREIGN KEY (PaymentId) REFERENCES dbo.Payments(Id)
);
CREATE INDEX IX_Bookings_UserId ON dbo.Bookings(UserId);
CREATE INDEX IX_Bookings_ShowtimeId ON dbo.Bookings(ShowtimeId);

-- BookingSeats: reserved seats for a booking (one row per seat)
CREATE TABLE dbo.BookingSeats (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_BookingSeats PRIMARY KEY DEFAULT NEWID(),
    BookingId UNIQUEIDENTIFIER NOT NULL,
    SeatId UNIQUEIDENTIFIER NULL,           -- optionally link to Seats table (layout)
    RowLabel NVARCHAR(10) NOT NULL,
    SeatNumber INT NOT NULL,
    Price DECIMAL(12,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'booked', -- booked, cancelled, sold
    CONSTRAINT FK_BookingSeats_Bookings FOREIGN KEY (BookingId) REFERENCES dbo.Bookings(Id) ON DELETE CASCADE,
    CONSTRAINT FK_BookingSeats_Seats FOREIGN KEY (SeatId) REFERENCES dbo.Seats(Id)
);
CREATE INDEX IX_BookingSeats_BookingId ON dbo.BookingSeats(BookingId);
CREATE INDEX IX_BookingSeats_Seat_RowNum ON dbo.BookingSeats(RowLabel, SeatNumber);

-- Optional: materialized seat availability per showtime (pre-generated)
-- This table can improve availability checks at the cost of extra writes when creating/cancelling bookings.
CREATE TABLE dbo.ShowtimeSeatStatus (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_ShowtimeSeatStatus PRIMARY KEY DEFAULT NEWID(),
    ShowtimeId UNIQUEIDENTIFIER NOT NULL,
    SeatId UNIQUEIDENTIFIER NULL,
    RowLabel NVARCHAR(10) NOT NULL,
    SeatNumber INT NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'available', -- available, blocked, reserved, sold
    LastUpdated DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_Showtime_Seat UNIQUE (ShowtimeId, RowLabel, SeatNumber),
    CONSTRAINT FK_ShowtimeSeatStatus_Showtimes FOREIGN KEY (ShowtimeId) REFERENCES dbo.Showtimes(Id),
    CONSTRAINT FK_ShowtimeSeatStatus_Seats FOREIGN KEY (SeatId) REFERENCES dbo.Seats(Id)
);
CREATE INDEX IX_ShowtimeSeatStatus_ShowtimeId ON dbo.ShowtimeSeatStatus(ShowtimeId);

-- Audit / Logs (optional)
CREATE TABLE dbo.AuditLogs (
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_AuditLogs PRIMARY KEY DEFAULT NEWID(),
    Entity NVARCHAR(200) NULL,
    EntityId UNIQUEIDENTIFIER NULL,
    Action NVARCHAR(100) NOT NULL,
    Detail NVARCHAR(MAX) NULL,
    CreatedBy UNIQUEIDENTIFIER NULL,
    CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Example: ensure no overlapping showtime in same room (basic check via index and app-level validation)
CREATE UNIQUE INDEX IX_Showtime_Room_Start_Unique ON dbo.Showtimes(RoomId, StartTime, EndTime);