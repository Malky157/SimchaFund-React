using Microsoft.EntityFrameworkCore;
using SimchaFund_React.Data.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimchaFund_React.Data
{
    public class ContributorRepository
    {
        private readonly string _connectionString;
        public ContributorRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddContributor(Contributor contributor)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Contributors.Add(contributor);
            context.SaveChanges();
        }

        public List<Contributor> GetContributors()
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributors.OrderBy(c => c.LastName).ToList();
        }

        public Contributor GetContributor(int id)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributors.Include(c => c.Deposits).FirstOrDefault(c => c.Id == id);
        }

        public void AddDeposit(Deposit deposit)
        {
            var context = new SimchaFundDbContext(_connectionString);
            context.Deposits.Add(deposit);
            context.SaveChanges();
        }

        public decimal CalculateBalance(int contributorId)
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Contributors.Include(c => c.Deposits).FirstOrDefault(c => c.Id == contributorId).Deposits.Sum(d => d.Amount)
                - context.Contributions.Where(c => c.ContributorId == contributorId).Sum(c => c.Amount);
        }

        public void Update(Contributor contributor)
        {

            var context = new SimchaFundDbContext(_connectionString);
            var c = context.Contributors.FirstOrDefault(c => c.Id == contributor.Id);
            if (c != null)
            {
                c.FirstName = contributor.FirstName;
                c.LastName = contributor.LastName;
                c.CellNumber = contributor.CellNumber;
                c.AlwaysInclude = contributor.AlwaysInclude;
                context.Contributors.Attach(c);
                context.Update(c);
                context.SaveChanges();
            }
        }

        public bool ContributorIdIsValid(int id)
        {
            var context = new SimchaFundDbContext(_connectionString);
            bool x = context.Contributors.Any(c => c.Id == id);
            return x;
        }

        public decimal CalculateTotalBalance()
        {
            var context = new SimchaFundDbContext(_connectionString);
            return context.Deposits.Sum(d => d.Amount)
                - context.Contributions.Sum(c => c.Amount);
        }
    }
}