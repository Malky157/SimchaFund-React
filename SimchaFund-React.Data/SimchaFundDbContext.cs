using Microsoft.EntityFrameworkCore;

namespace SimchaFund_React.Data
{
    public class SimchaFundDbContext : DbContext
    {
        private readonly string _connectionString;

        public SimchaFundDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<Contribution>()
                .HasKey(c => new { c.SimchaId, c.ContributorId });

        }

        public DbSet<Simcha> Simchas { get; set; }
        public DbSet<Contributor> Contributors { get; set; }
        public DbSet<Contribution> Contributions { get; set; }
        public DbSet<Deposit> Deposits { get; set; }
    }
}
