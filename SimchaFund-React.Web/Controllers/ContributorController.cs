using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimchaFund_React.Data;
using SimchaFund_React.Web.ViewModels;

namespace SimchaFund_React.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContributorController : ControllerBase
    {
        private readonly string _connectionString;
        public ContributorController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addcontributor")]
        public void AddContributor(NewContributorViewModel vm)
        {
            var repo = new ContributorRepository(_connectionString);
            repo.AddContributor(vm);
            if (vm.InitialDeposit != 0)
            {
                repo.AddDeposit(new Deposit()
                {
                    ContributorId = vm.Id,
                    Amount = vm.InitialDeposit,
                    Date = vm.DateCreated
                });
            }
            if (vm.AlwaysInclude)
            {
                var contributionRepo = new ContributionRepository(_connectionString);
                var simchaRepo = new SimchaRepository(_connectionString);
                var simchas = simchaRepo.GetAllSimchas();
                foreach (Simcha simcha in simchas)
                {
                    contributionRepo.AddContribution(new Contribution()
                    {
                        ContributorId = vm.Id,
                        SimchaId = simcha.Id,
                        Amount = 5,
                    });
                }
            }
        }

        [HttpGet]
        [Route("getallcontributors")]
        public ContributorsPageViewModel GetContributors()
        {
            var repo = new ContributorRepository(_connectionString);
            var page = new ContributorsPageViewModel();
            var contributors = repo.GetContributors();
            contributors.ForEach(c =>
            page.Contributors.Add(new ContributorViewModel()
            {
                Contributor = c,
                Balance = repo.CalculateBalance(c.Id)
            }));
            page.TotalBalance = repo.CalculateTotalBalance();
            return page;
        }

        [HttpPost]
        [Route("updatecontributor")]
        public void UpdateContributor(Contributor editableContributor)
        {
            var repo = new ContributorRepository(_connectionString);
            var simchaRepo = new SimchaRepository(_connectionString);
            var contributionRepo = new ContributionRepository(_connectionString);
            if (editableContributor == null)
            {
                return;
            }
            repo.Update(editableContributor);
            if (editableContributor.AlwaysInclude)
            {
                var simchas = simchaRepo.GetAllSimchas();
                foreach (Simcha simcha in simchas)
                {
                    if (contributionRepo.DidContributorContributeToSimcha == null && repo.CalculateBalance(editableContributor.Id) > 0)
                    {
                        contributionRepo.AddContribution(new Contribution()
                        {
                            ContributorId = editableContributor.Id,
                            SimchaId = simcha.Id,
                            Amount = 5,
                            Date = DateTime.Now
                        });
                    }
                }
            }
        }
    }
}
