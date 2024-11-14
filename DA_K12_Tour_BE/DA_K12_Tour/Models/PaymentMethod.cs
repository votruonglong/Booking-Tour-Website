using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{
    public class PaymentMethod
    {
        [Key]
        public Guid id { get; set; }
        public string methodId { get; set; }
        public string methodName { get; set; }
        public string description { get; set; }
    }
}
