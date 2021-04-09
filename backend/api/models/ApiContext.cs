using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
        }
        public DbSet<AccountModel> Account { get; set; }
        public DbSet<CardModel> Card { get; set; }
        public DbSet<LogModel> LogModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountModel>().ToTable("Account");
            modelBuilder.Entity<CardModel>().ToTable("Card");
            modelBuilder.Entity<LogModel>().ToTable("Logs");
        }
    }
}