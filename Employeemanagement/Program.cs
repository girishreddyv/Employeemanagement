using EmployeeManagement.Repositories;
using EmployeeManagement.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Microsoft.Extensions.Options;
namespace EmployeeManagement
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseInMemoryDatabase("EmployeeDb")
            );
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyCors", builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            //add the employee repository to the DI(dependency Injection) container  
            //builder.Services.AddScoped<IEmployeeRepository, MockEmployeeRepository>();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Use the correct CORS policy name after app is built
            app.UseCors("MyCors");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(C =>
                {
                    C.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee Management API V1");
                    C.RoutePrefix = string.Empty; // Set Swagger UI at the app's root
                });
            }

            app.MapControllers();

            app.Run();
        }
    }
}