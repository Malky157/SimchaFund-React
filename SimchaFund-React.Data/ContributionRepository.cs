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

        public void UpdateContributionsForSimcha(int simchaId, List<Contribution> contributions)
        {
            var context = new SimchaFundDbContext(_connectionString);
            var contributorRepo = new ContributorRepository(_connectionString);
            DeleteContributionsForSimcha(simchaId);
            foreach (Contribution contribution in contributions)
            {
                if (contributorRepo.CalculateBalance(contribution.ContributorId) < contribution.Amount)
                {
                    //send back mess. "Insufficient funds for {contributor.FirstName} {contributor.LastName} to donate to the {Simcha.SimchaName}
                    return;
                }
                if (contribution.ContributorId != 0 && contribution.SimchaId != 0)
                {
                    AddContribution(contribution);
                }
            }
            context.SaveChanges();
        }

        private void DeleteContributionsForSimcha(int simchaId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"Delete Contributions Where SimchaId = {simchaId}");
            context.SaveChanges();
        }

        public List<Contributor> GetContributorsWhoAlwaysInclude()
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributors.Where(c => c.AlwaysInclude).ToList();
        }
    }
}
