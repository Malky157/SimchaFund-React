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
            //string message = string.Empty;
            repo.AddContributor(vm);
            if (vm.InitialDeposit != 0)
            {
                repo.AddDeposit(new Deposit()
                {
                    ContributorId = vm.Id,
                    Amount = vm.InitialDeposit,
                    Date = vm.DateCreated
                });
                //message = "success";
            }
            //else
            //{
            //    message = "warning";
            //}
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
            //return message;
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

        [HttpPost]
        [Route("adddeposit")]
        public void AddDeposit(Deposit deposit)
        {
            var repo = new ContributorRepository(_connectionString);
            if (repo.ContributorIdIsValid(deposit.ContributorId))
            {
                repo.AddDeposit(deposit);
            }

        }

        [HttpGet]
        [Route("gethistory")]
        public HistoryViewModel GetHistory(int id)
        {
            var repo = new ContributorRepository(_connectionString);
            var contributionRepo = new ContributionRepository(_connectionString);

            var contributor = repo.GetContributor(id);
            var contributions = contributionRepo.GetContributionsForContributor(id);
            var historyPage = new HistoryViewModel()
            {
                ContributorId = contributor.Id,
                ContributorName = contributor.FirstName + " " + contributor.LastName,
                ContributorBalance = repo.CalculateBalance(id),
            };
            var transactions = contributor.Deposits.Select(d =>
           new Transaction()
           {
               Id = d.Id,
               Action = "Deposit",
               Amount = d.Amount,
               Date = d.Date
           }).Concat(contributions.Select(c => new Transaction()
           {
               Id = c.SimchaId,
               Action = FormulateContributionActionText(c.SimchaId),
               Amount = c.Amount,
               Date = c.Date
           }));
            historyPage.Transactions = transactions.OrderBy(t => t.Date).ToList();
            return historyPage;
        }

        private string FormulateContributionActionText(int simchaId)
        {
            var simchaRepo = new SimchaRepository(_connectionString);
            var simcha = simchaRepo.GetSimchaById(simchaId);
            return $"Contribution to the {simcha.SimchaName}";
        }
    }
}
