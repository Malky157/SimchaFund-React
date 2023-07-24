using SimchaFund_React.Data;

namespace SimchaFund_React.Web.ViewModels
{
    public class UpdateContributionsViewModel
    {
        public int SimchaId { get; set; }
        public List<Contribution> Contributions { get; set; } = new List<Contribution>();
    }
}
