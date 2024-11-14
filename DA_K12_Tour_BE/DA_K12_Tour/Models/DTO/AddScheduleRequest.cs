namespace DA_K12_Tour.Models.DTO
{
    public class AddScheduleRequest
    {
        public string scheduleId { get; set; }
        public Guid tourId { get; set; }
        public string description { get; set; }
        public string title { get; set; }
    }
}
