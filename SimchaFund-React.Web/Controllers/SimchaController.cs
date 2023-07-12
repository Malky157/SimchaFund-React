using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimchaFund_React.Data;
using SimchaFund_React.Web.ViewModels;

namespace SimchaFund_React.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SimchaController : ControllerBase
    {
        private readonly string _connectionString;
        public SimchaController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addsimcha")]
        public void AddSimcha(Simcha simcha)
        {
            if (simcha.SimchaName == "")
            {
                return;
            }
            var repo = new SimchaRepository(_connectionString);
            repo.Add(simcha);
        }

        [HttpGet]
        [Route("getallsimchas")]
        public SimchaPageViewModel GetAllSimchasWithOtherInfo()
        {
            var page = new SimchaPageViewModel();
            var repo = new SimchaRepository(_connectionString);
            var simchas = repo.GetAllSimchas();
            simchas.ForEach(s =>
           page.Simchas.Add(new SimchaViewModel()
           {
               Simcha = s,
               ContributorCount = repo.GetContributorCountForSimcha(s.Id),
               TotalAmount = repo.GetTotalAmountForSimcha(s.Id)
           }));
            page.TotalAmountContributors = repo.GetTotalContributors();
            return page;
        }

        [HttpGet]
        [Route("getcontributionsforsimcha")]
        public ContributionsPageViewModel GetContributionsForSimcha(int id)
        {
            var repo = new SimchaRepository(_connectionString);
            var contribRepo = new ContributorRepository(_connectionString);
            var simcha = repo.GetSimchaById(id);
            var contributors = contribRepo.GetContributors();
            if (simcha == null)
            {
                return null;
            }
            var page = new ContributionsPageViewModel();
            page.Simcha = simcha;
            contributors.ForEach(c =>
            page.Contributors.Add(new ContributorViewModel()
            {
                Contributor = c,
                Balance = contribRepo.CalculateBalance(c.Id),
                Contributed = repo.ContributorDidContributeToSimcha(c.Id, simcha.Id)
               
            }
            ));
            return page;
        }
    }
}