using SimchaFund_React.Data;

namespace SimchaFund_React.Web.ViewModels
{
    public class HistoryViewModel
    {
        public int ContributorId { get; set; }
        public string ContributorName { get; set; }
        public decimal ContributorBalance { get; set; }
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
