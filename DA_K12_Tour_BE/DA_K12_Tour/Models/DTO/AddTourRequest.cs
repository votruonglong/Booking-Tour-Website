namespace DA_K12_Tour.Models.DTO
{
    public class AddTourRequest
    {
        public string tourId { get; set; }
        public Guid categoryId { get; set; }
        public string tourName { get; set; }
        public int maxParticipant { get; set; }
        public string AdultPrice { get; set; }
        public string Description { get; set; }
        public bool isActive { get; set; }
        public string ChildPrice { get; set; }
        public IEnumerable<string>? ImageUrls { get; set; }
    }
}
