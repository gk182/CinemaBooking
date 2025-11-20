using cinema_booking_server.Data;
using cinema_booking_server.Services.Implementations;
using cinema_booking_server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// --------------------------------------------------
// Add services to the container
// --------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Dependency Injection
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IAuthService, AuthService>();  
builder.Services.AddScoped<ICinemaService, CinemaService>();
builder.Services.AddScoped<IRoomService, RoomService>();
// ...existing code...

// --------------------------------------------------
// CORS
// --------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // Vite dev server
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();


// --------------------------------------------------
// CORS Middleware
// --------------------------------------------------
app.UseCors("AllowFrontend");


// --------------------------------------------------
// Database Seeding
// --------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        SeedData.Initialize(services);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the database.");
    }
}


// --------------------------------------------------
// HTTP Request Pipeline
// --------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
