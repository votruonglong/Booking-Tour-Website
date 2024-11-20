using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.utils;
using Microsoft.EntityFrameworkCore;

namespace DA_K12_Tour.Services.Statistics
{
    public class RevenueStatisticsService
    {
        private readonly AppDbContext _context;

        public RevenueStatisticsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<RevenueStatisticsDto>> GetRevenueStatisticsAsync()
        {
            return await _context.Bookings
                .Where(b => b.Status == BookingStatus.DaNhan) // Lọc các booking đã nhận
                .GroupBy(b => new { b.tourId, b.Tour.tourName, b.Tour.AdultPrice, b.Tour.ChildPrice })
                .Select(group => new RevenueStatisticsDto
                {
                    TourId = group.Key.tourId,
                    TourName = group.Key.tourName,
                    TotalAdults = group.Sum(b => b.numberOfAdult),
                    TotalChildren = group.Sum(b => b.numberOfChild),
                    TotalRevenue = group.Sum(b =>
                        b.numberOfAdult * decimal.Parse(group.Key.AdultPrice) +
                        b.numberOfChild * decimal.Parse(group.Key.ChildPrice))
                })
                .ToListAsync();
        }

    }
}
