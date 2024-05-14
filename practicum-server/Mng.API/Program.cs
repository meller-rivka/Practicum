using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mng.CORE.Mapping;
using Mng.CORE.Repositories;
using Mng.CORE.Services;
using Mng.DATA;
using Mng.DATA.Repositories;
using Mng.SERVICES;
using Subscriber.WebWpi.Config;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigurationManager configuration = builder.Configuration;


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmployeeService,EmployeeService>();
builder.Services.AddScoped<IRoleService,RoleService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(ApiMappingProfile));
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(
        builder.Configuration.GetConnectionString("DATABASE_CONNECTION_STRING"),
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"),
        b => b.EnableRetryOnFailure()
    );
});

builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy => {
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
})
);


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("MyPolicy");
app.MapControllers();
app.UseMiddleware(typeof(ErrorHandlingMiddleware));

app.Run();
