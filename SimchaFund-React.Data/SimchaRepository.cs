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
            return context.Simchas.OrderBy(s => s.Date).ToList();
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
    }
}
