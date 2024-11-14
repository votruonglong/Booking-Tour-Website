namespace DA_K12_Tour.Models.DTO
{
    public class TourDTO
    {
        public string TourId { get; set; }
        public Guid CategoryId { get; set; }
        public string TourName { get; set; }
        public DateOnly StartDay { get; set; }
        public DateOnly EndDay { get; set; }
        public int MaxParticipant { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<string>? ImageUrls { get; set; }
        public string CategoryName { get; set; }
    }
}
