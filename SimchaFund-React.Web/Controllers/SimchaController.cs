using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimchaFund_React.Data;
using SimchaFund_React.Data.Migrations;
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
            var contributionRepo = new ContributionRepository(_connectionString);
            var contributorRepo = new ContributorRepository(_connectionString);
            repo.AddSimcha(simcha);
            var contributors = contributionRepo.GetContributorsWhoAlwaysInclude();
            foreach (var contributor in contributors)
            {
                if (contributorRepo.CalculateBalance(contributor.Id) > 0)
                {
                    contributionRepo.AddContribution(new Data.Contribution()
                    {
                        ContributorId = contributor.Id,
                        SimchaId = simcha.Id,
                        Amount = 5,
                        Date = DateTime.Now
                    });
                }
            }
        }

        [HttpGet]
        [Route("getallsimchas")]
        public SimchaPageViewModel GetAllSimchasWithOtherInfo()
        {
            var page = new SimchaPageViewModel();
            var repo = new SimchaRepository(_connectionString);
            var contributionRepo = new ContributionRepository(_connectionString);
            var simchas = repo.GetAllSimchas();
            simchas.ForEach(s =>
           page.Simchas.Add(new SimchaViewModel()
           {
               Simcha = s,
               ContributorCount = contributionRepo.GetContributorCountForSimcha(s.Id),
               TotalAmount = repo.GetTotalAmountForSimcha(s.Id)
           }));
            page.TotalAmountContributors = contributionRepo.GetTotalContributors();
            return page;
        }

        [HttpGet]
        [Route("getcontributionsforsimcha")]
        public ContributionsPageViewModel GetContributionsForSimcha(int id)
        {
            var repo = new SimchaRepository(_connectionString);
            var contributorRepo = new ContributorRepository(_connectionString);
            var contributionRepo = new ContributionRepository(_connectionString);
            var page = new ContributionsPageViewModel
            {
                Simcha = repo.GetSimchaById(id)
            };
            var contributors = contributorRepo.GetContributors();
            contributors.ForEach(c =>
            page.Contributors.Add(new ContributorViewModel()
            {
                Contributor = c,
                Balance = contributorRepo.CalculateBalance(c.Id),
                Contribution = contributionRepo.DidContributorContributeToSimcha(c.Id, id)
            })
            );
            return page;
        }

        [HttpPost]
        [Route("addorupdatecontribution")]
        public void AddOrUpdateContribution(UpdateContributionsViewModel vm)
        {
            var contributionRepo = new ContributionRepository(_connectionString);
            contributionRepo.UpdateContributionsForSimcha(vm.SimchaId, vm.Contributions);
        }
    }
}