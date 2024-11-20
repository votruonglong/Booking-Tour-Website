using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Services.Statistics;
using DA_K12_Tour.utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DA_K12_Tour.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RevenueStatisticsService _revenueService;

        public StatisticsController(AppDbContext context, RevenueStatisticsService revenueService)
        {
            _context = context;
            _revenueService = revenueService;
        }

        // API for getting tour statistics
        [HttpGet("tour-stats")]
        public async Task<IActionResult> GetTourStatistics()
        {
            // Lấy tổng số tour
            var totalTours = await _context.Tours.CountAsync();

            // Lấy tổng số booking
            var totalBookings = await _context.Bookings.CountAsync();

            // Lấy danh sách bookings có trạng thái đã nhận
            var bookings = await _context.Bookings
                .Where(b => b.Status == BookingStatus.DaNhan) // Chỉ lấy các booking đã xác nhận
                .ToListAsync();

            // Lấy danh sách bookings có trạng thái đã hủy
            var cancelledBookings = await _context.Bookings
                .Where(b => b.Status == BookingStatus.DaHuy) // Chỉ lấy các booking đã hủy
                .ToListAsync();

            // Tính tổng doanh thu từ các booking đã xác nhận
            decimal totalRevenue = 0;
            foreach (var booking in bookings)
            {
                // Loại bỏ dấu chấm phân cách hàng nghìn và chữ " đ"
                string totalAmountString = booking.totalAmount?.Replace(".", "").Replace(" đ", "").Trim();

                // Chuyển đổi chuỗi đã xử lý thành decimal
                if (decimal.TryParse(totalAmountString, out var amount))
                {
                    totalRevenue += amount;
                }
                else
                {
                    // Ghi log nếu không thể chuyển đổi thành decimal
                    Console.WriteLine($"Failed to parse TotalAmount for Booking ID: {booking.bookingId}, TotalAmount: {booking.totalAmount}");
                }
            }

            // Lấy số lượng booking đã xác nhận và đã hủy theo tháng
            var bookingsAcceptByMonth = bookings
                .GroupBy(b => b.bookingDate.Month)
                .Select(group => new MonthlyBookingStatsDTO
                {
                    Month = group.Key,
                    AcceptedBookingsCount = group.Count(),
                    CanceledBookingsCount = cancelledBookings
                        .Where(b => b.bookingDate.Month == group.Key)
                        .Count()
                }).ToList();

            // Tạo DTO để trả về thông tin thống kê
            var stats = new TourStatisticsDTO
            {
                TotalTours = totalTours,
                TotalBookings = totalBookings,
                TotalRevenue = totalRevenue,
                MonthlyBookingStats = bookingsAcceptByMonth
            };

            // Trả về kết quả thống kê
            return Ok(stats);
        }

        [HttpGet("RevenueByCategory")]
        public IActionResult GetRevenueByCategory()
        {
            var bookings = _context.Bookings
                .Include(b => b.Tour)
                .ThenInclude(t => t.Category)
                .Where(b => b.Status == BookingStatus.DaNhan) // Lọc theo Status "Đã nhận"
                .ToList();

            var revenueByCategory = bookings
                .Where(b => b.Tour?.Category != null) // Đảm bảo có Category
                .GroupBy(b => b.Tour.Category.Name)
                .Select(group => new
                {
                    CategoryName = group.Key,
                    TotalRevenue = group.Sum(b =>
                    {
                        // Chuẩn hóa totalAmount: loại bỏ ký tự '.' và ' đ'
                        var normalizedAmount = b.totalAmount
                            .Replace(".", "") // Loại bỏ dấu chấm
                            .Replace(" đ", ""); // Loại bỏ đơn vị tiền tệ

                        // Chuyển đổi sang decimal
                        return decimal.TryParse(normalizedAmount, out var amount) ? amount : 0;
                    })
                })
                .ToList();

            return Ok(revenueByCategory);
        }

        [HttpGet("BookingsByTour")]
        public IActionResult GetBookingsByTour()
        {
            var bookings = _context.Bookings
                .Include(b => b.Tour)
                .Where(b => b.Status == BookingStatus.DaNhan) // Lọc theo Status "Đã nhận"
                .ToList();

            var bookingsByTour = bookings
                .Where(b => b.Tour != null) // Đảm bảo có Tour
                .GroupBy(b => b.Tour.tourName) // Nhóm theo tên tour
                .Select(group => new
                {
                    TourName = group.Key,
                    TotalBookings = group.Count() // Đếm số lượng booking cho từng tour
                })
                .ToList();

            return Ok(bookingsByTour);
        }
    }
}
