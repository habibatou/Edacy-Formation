using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection.Emit;
using System;

namespace GestionProduits.Models
{
    public class GPContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Produit> Produit { get; set; }
        public DbSet<Categorie> Categorie { get; set; }
        public string DbPath { get; }

        public GPContext(DbContextOptions<GPContext> options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "GPDatabase.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
    }
}
