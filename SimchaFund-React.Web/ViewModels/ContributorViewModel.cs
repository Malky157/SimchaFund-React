using SimchaFund_React.Data;

namespace SimchaFund_React.Web.ViewModels
{
    public class ContributorViewModel
    {
        public Contributor Contributor { get; set; }
        public decimal Balance { get; set; }
        public bool Contributed { get; set; }
    }
}
