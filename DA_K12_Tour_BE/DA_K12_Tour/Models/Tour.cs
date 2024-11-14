using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace DA_K12_Tour.Models
{
    public class Tour
    {
        [Key]
        public Guid Id { get; set; }
        public string tourId { get; set; }
        public Guid categoryId { get; set; }
        public virtual Category Category { get; set; }
        public string tourName { get; set; }
        public int maxParticipant {  get; set; }
        public string AdultPrice { get; set; }
        public string ChildPrice { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }

        public virtual ICollection<TourImage> Images { get; set; } = new List<TourImage>();
    }
}
