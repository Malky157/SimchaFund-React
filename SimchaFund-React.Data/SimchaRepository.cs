using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimchaFund_React.Data
{
    public class SimchaRepository
    {
        private readonly string _connectionString;
        public SimchaRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddSimcha(Simcha simcha)
        {
            if (simcha == null)
            {
                return;
            }
            var context = new SimchaFundDbContext(_connectionString);
            context.Add(simcha);
            context.SaveChanges();
        }

        public List<Simcha> GetAllSimchas()
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Simchas.ToList();
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

        public decimal GetTotalAmountForSimcha(int simchaId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributions.Where(c => c.SimchaId == simchaId).Sum(c => c.Amount);
        }

        public Simcha GetSimchaById(int simchaId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Simchas.FirstOrDefault(s => s.Id == simchaId);
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
    }
}
