namespace DA_K12_Tour.Models.DTO
{
    public class AddCommentRequest
    {
        public string Content { get; set; }
        public Guid UserId { get; set; }
        public Guid TourId { get; set; }
    }
}
