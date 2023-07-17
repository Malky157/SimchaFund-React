using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimchaFund_React.Data
{
    public class ContributionRepository
    {
        private readonly string _connectionString;
        public ContributionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public int GetContributorCountForSimcha(int simchaId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributions.Where(c => c.SimchaId == simchaId).Count();
        }

        public int GetTotalContributors()
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributors.Count();
        }

        public Contribution DidContributorContributeToSimcha(int contributorId, int simchaId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributions.FirstOrDefault(c => c.SimchaId == simchaId && c.ContributorId == contributorId);
        }
        public void AddContribution(Contribution contribution)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Contributions.Add(contribution);
            context.SaveChanges();
        }

        public void UpdateContribution(Contribution contribution)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Contributions.Update(contribution);
            context.SaveChanges();
        }

        public void DeleteContribution(int contributorId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete Contributions Where ContributorId = {contributorId}");
            context.SaveChanges();
        }

    }
}
