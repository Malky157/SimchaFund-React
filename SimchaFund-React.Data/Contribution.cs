using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SimchaFund_React.Data
{
    public class Contribution
    {
        public int SimchaId { get; set; }
        [JsonIgnore]
        public Simcha Simcha { get; set; }

        public int ContributorId { get; set; }       
        [JsonIgnore]
        public Contributor Contributor { get; set; }

        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
