using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimchaFund_React.Data
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Action { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
