using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace SimchaFund_React.Data
{
    public class SimchaFundContextFactory : IDesignTimeDbContextFactory<SimchaFundDbContext>
    {
        public SimchaFundDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}SimchaFund-React.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new SimchaFundDbContext(config.GetConnectionString("ConStr"));
        }
    }
}
