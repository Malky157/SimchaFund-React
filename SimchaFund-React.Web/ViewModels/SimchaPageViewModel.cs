namespace SimchaFund_React.Web.ViewModels
{
    public class SimchaPageViewModel
    { 
        public List<SimchaViewModel> Simchas { get; set; } = new List<SimchaViewModel>();
        public int TotalAmountContributors { get; set; }
    }
}
