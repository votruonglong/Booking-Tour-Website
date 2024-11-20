namespace DA_K12_Tour.Models.DTO
{
    public class RevenueStatisticsDto
    {
        public Guid TourId { get; set; }
        public string TourName { get; set; }
        public int TotalAdults { get; set; }
        public int TotalChildren { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}
