using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cinema_booking_server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cinemas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    City = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cinemas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PosterUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    BannerUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    TrailerUrl = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DurationMinutes = table.Column<int>(type: "int", nullable: true),
                    ReleaseDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Genres = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Rating = table.Column<decimal>(type: "decimal(3,2)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Director = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Cast = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AgeRating = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProviderPaymentId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Method = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CinemaId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RowsCount = table.Column<int>(type: "int", nullable: false),
                    SeatsPerRow = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Cinemas_CinemaId",
                        column: x => x.CinemaId,
                        principalTable: "Cinemas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RowLabel = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    SeatNumber = table.Column<int>(type: "int", nullable: false),
                    SeatType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DefaultPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    IsBlocked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seats_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Showtimes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MovieId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    EndTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    BasePrice = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Showtimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Showtimes_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Showtimes_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Entity = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    EntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Action = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLogs_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ShowtimeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_Payments_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Payments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Bookings_Showtimes_ShowtimeId",
                        column: x => x.ShowtimeId,
                        principalTable: "Showtimes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShowtimeSeatStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShowtimeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SeatId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RowLabel = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    SeatNumber = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastUpdated = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShowtimeSeatStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShowtimeSeatStatuses_Seats_SeatId",
                        column: x => x.SeatId,
                        principalTable: "Seats",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ShowtimeSeatStatuses_Showtimes_ShowtimeId",
                        column: x => x.ShowtimeId,
                        principalTable: "Showtimes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookingSeats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SeatId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RowLabel = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    SeatNumber = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingSeats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookingSeats_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingSeats_Seats_SeatId",
                        column: x => x.SeatId,
                        principalTable: "Seats",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_CreatedBy",
                table: "AuditLogs",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_PaymentId",
                table: "Bookings",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ShowtimeId",
                table: "Bookings",
                column: "ShowtimeId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingSeats_BookingId",
                table: "BookingSeats",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingSeats_SeatId",
                table: "BookingSeats",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_CinemaId",
                table: "Rooms",
                column: "CinemaId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_RoomId_RowLabel_SeatNumber",
                table: "Seats",
                columns: new[] { "RoomId", "RowLabel", "SeatNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Showtimes_MovieId",
                table: "Showtimes",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_Showtimes_RoomId",
                table: "Showtimes",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowtimeSeatStatuses_SeatId",
                table: "ShowtimeSeatStatuses",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_ShowtimeSeatStatuses_ShowtimeId_RowLabel_SeatNumber",
                table: "ShowtimeSeatStatuses",
                columns: new[] { "ShowtimeId", "RowLabel", "SeatNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "BookingSeats");

            migrationBuilder.DropTable(
                name: "ShowtimeSeatStatuses");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Showtimes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Cinemas");
        }
    }
}
