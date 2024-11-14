using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{
    public class Schedule
    {
        [Key]
        public Guid Id { get; set; }
        public string scheduleId { get; set; }
        public Guid tourId { get; set; }
        public virtual Tour Tour { get; set; }
        public string description { get; set; }
        public string title { get; set; }   

    }
}
