
using Online_Guid_Generator.IService;
using Online_Guid_Generator.Service;

var builder = WebApplication.CreateBuilder(args);

#region CORS setting for API
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "_myAllowSpecificOrigins",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowAnyMethod();
        }
    );
});

#endregion

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region serviceLife Times
builder.Services.AddTransient<IGuidGenerator, GuidGenerator>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("_myAllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
