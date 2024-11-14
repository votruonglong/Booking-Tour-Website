using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{
    public class TourImage
    {

        [Key]
        public Guid Id { get; set; }
        public Guid tourId { get; set; }
        public virtual Tour Tour { get; set; }
        public string image_url { get; set; }
    }
}
