namespace SimchaFund_React.Web.ViewModels
{
    public class ContributorsPageViewModel
    {
        public List<ContributorViewModel> Contributors { get; set; } = new List<ContributorViewModel>();
        public decimal TotalBalance { get; set; }
    }
}
