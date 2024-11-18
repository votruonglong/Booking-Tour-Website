namespace DA_K12_Tour.Models.DTO
{
    public class TourStatisticsDTO
    {
        public int TotalTours { get; set; }
        public int TotalBookings { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<MonthlyBookingStatsDTO> MonthlyBookingStats { get; set; } // Thêm thuộc tính cho thống kê tháng
    }
}
