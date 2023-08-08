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

        public List<Contribution> GetContributionsForContributor(int contributorId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributions.Where(c => c.ContributorId == contributorId).ToList();
        }

        public List<string> UpdateContributionsForSimcha(int simchaId, List<Contribution> contributions)
        {
            var context = new SimchaFundDbContext(_connectionString);
            var contributorRepo = new ContributorRepository(_connectionString);
            var simchaRepo = new SimchaRepository(_connectionString);
            List<string> messages = new();
            DeleteContributionsForSimcha(simchaId);
            foreach (Contribution contribution in contributions)
            {
                if (contributorRepo.CalculateBalance(contribution.ContributorId) < contribution.Amount)
                {
                    var contributor = contributorRepo.GetContributor(contribution.ContributorId);
                    var simcha = simchaRepo.GetSimchaById(contribution.SimchaId);
                    messages.Add(new string($"Insufficient funds for {contributor.FirstName} {contributor.LastName} to donate to the {simcha.SimchaName} simcha"));
                }
                else if (contribution.ContributorId != 0 && contribution.SimchaId != 0)
                {
                    AddContribution(contribution);
                }
            }
            context.SaveChanges();
            return messages;
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
