using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{
    public class Comment
    {
        [Key]
        public Guid id { get; set; }
        public string Content { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid TourId { get; set; }
        public virtual Tour Tour { get; set; }
        public DateOnly CreatedDate { get; set; }
    }
}
