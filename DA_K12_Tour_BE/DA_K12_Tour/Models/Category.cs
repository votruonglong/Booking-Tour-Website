using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }
        public string? categoryId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateOnly CreatedTime { get; set; }
    }
}
