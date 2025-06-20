using GestionProduits.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var objBuilder = new ConfigurationBuilder()
          .SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile("appSettings.json", optional: true, reloadOnChange: true);
IConfiguration conManager = objBuilder.Build();
var conn = conManager.GetConnectionString("userConnection");

builder.Services.AddDbContext<GPContext>(options =>
{
    options.UseSqlServer(conn);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "Jwt",
        In = ParameterLocation.Header,
        Name = "Authorisation",
        Description = "Bearer Authentification avec JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
  }
);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseCors("AllowAngularApp");
app.UseSwagger();
app.UseAuthorization();
app.UseAuthentication();

/// api de connexion d'un utilisateur
app.MapPost("/Connexion",
  async (UserLogin user, GPContext dbContext) =>
    {
        if (!string.IsNullOrEmpty(user.Username) && !string.IsNullOrEmpty(user.Password))
        {
            var userlogin = await dbContext.User.FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);
            if (userlogin is null) return Results.NotFound("utilisateur n'existe pas");
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, userlogin.Username),
            new Claim(ClaimTypes.Email, userlogin.Email),
            new Claim(ClaimTypes.GivenName, userlogin.Prenom),
            new Claim(ClaimTypes.Surname, userlogin.Nom)
        };
            var token = new JwtSecurityToken
            (
                issuer: builder.Configuration["Jwt:Issuer"],
                audience: builder.Configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"])), SecurityAlgorithms.HmacSha256)
                );
            var tokenSyring = new JwtSecurityTokenHandler().WriteToken(token);

            return Results.Ok(tokenSyring);
        }
        return Results.NotFound("utilisateur n'existe pas");
    });
/// api d'inscription d'un utilisateur
app.MapPost("/Inscription",
async (User user, GPContext db) =>
{
    var userNew = new User
    {
        Nom = user.Nom,
        Username = user.Username,
        Password = user.Password,
        Prenom = user.Prenom,
        Email = user.Email
    };

    db.User.Add(userNew);
    await db.SaveChangesAsync();

    return Results.Created($"/Inscription/{userNew.Id}", userNew);
});
// api de recuperation de la liste des utilisateur
app.MapGet("/ListUsers",
    async (GPContext dbContext) =>
    {
        var users = await dbContext.User.ToListAsync();
        return Results.Ok(users);
    });
/// api de creation de categorie
app.MapPost("/CreationCategorie",
async (Categorie categorydto, GPContext db) =>
{
    var categorydtoNew = new Categorie
    {
        Nom = categorydto.Nom,
        Description = categorydto.Description,
        Code = categorydto.Code
    };

    db.Categorie.Add(categorydtoNew);
    await db.SaveChangesAsync();

    return Results.Created($"/CreationCategorie/{categorydtoNew.Id}", categorydtoNew);
});
// api de recuperation de la liste des categories
app.MapGet("/ListCategories",
    async (GPContext dbContext) =>
    {
        var categories = await dbContext.Categorie.ToListAsync();
        return Results.Ok(categories);
    });
/// api de creation de produit
app.MapPost("/CreationProduit",
//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
async (Produit produitdto, GPContext db) =>
{
    var produitNew = new Produit
    {
        Nom = produitdto.Nom,
        Description = produitdto.Description,
        Code = produitdto.Code,
        Prix = produitdto.Prix,
        Actif = produitdto.Actif,
        CategorieId = produitdto.CategorieId
    };

    db.Produit.Add(produitNew);
    await db.SaveChangesAsync();

    return Results.Created($"/CreationProduit/{produitNew.Id}", produitNew);
});

/// api de recuperation de produit a partir de son Id
app.MapGet("/GetProduitById/{id}",
async (int id, GPContext dbContext) =>
{
    var produitbyId = await dbContext.Produit.Include(v => v.Category).FirstOrDefaultAsync(p => p.Id == id);
    if (produitbyId == null)
    {
        return Results.NotFound("Produit non diponible");
    }
    return Results.Ok(produitbyId);
});

// api de recuperation de la liste des produits
app.MapGet("/ListProduits",
    async (GPContext dbContext) =>
{
    var produits = await dbContext.Produit.ToListAsync();
    return Results.Ok(produits);
});

// api de modification d'un produit a partir de son Id
app.MapPut("/EditProduit/{id}",
async (int id, Produit produitMj, GPContext dbContext) =>
{
    var produit = await dbContext.Produit.FirstOrDefaultAsync(p => p.Id == id);

    if (produit is null)
        return Results.NotFound("Produit non trouve");

    produit.Nom = produitMj.Nom;
    produit.Description = produitMj.Description;
    produit.Code = produitMj.Code;
    produit.Prix = produitMj.Prix;
    produit.Actif = produitMj.Actif;
    produit.CategorieId = produitMj.CategorieId;

    await dbContext.SaveChangesAsync();

    return Results.Ok(produitMj);
});
// api de suppression de produit par a partir de son Id
app.MapDelete("/DeletProduit/{id}",
async (int id, GPContext dbContext) =>
{
    var produit = await dbContext.Produit.FindAsync(id);

    if (produit is null)
        return Results.NotFound("Produit non trouve");

    dbContext.Produit.Remove(produit);
    await dbContext.SaveChangesAsync();

    return Results.Ok("Suppression faite avec succes");
});


app.UseSwaggerUI();

app.Run();
