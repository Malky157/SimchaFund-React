using SimchaFund_React.Data;

namespace SimchaFund_React.Web.ViewModels
{
    public class ContributionsPageViewModel
    {
        public Simcha Simcha { get; set; }
        public List<ContributorViewModel> Contributors { get; set; } = new List<ContributorViewModel>();
    }
}
