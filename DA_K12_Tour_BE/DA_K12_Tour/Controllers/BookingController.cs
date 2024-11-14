using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DA_K12_Tour.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult getAllBookings(string? searchName, string? searchCode, string? phoneNumberSearch)
        {
            var bookingList = _context.Bookings
            .Include(t => t.PaymentMethod)
            .Include(t => t.Tour)
            .Where(t =>
                (string.IsNullOrEmpty(searchName) || t.name.Contains(searchName)) &&
                (string.IsNullOrEmpty(searchCode) || t.bookingId.Contains(searchCode)) &&
                (string.IsNullOrEmpty(phoneNumberSearch) || t.phoneNumber.Replace(" ", "").Contains(phoneNumberSearch))

            )
            .Select(t => new
            {
                t.id,
                t.bookingId,
                t.description,
                t.phoneNumber,
                t.departureDate,
                t.numberOfChild,
                t.numberOfAdult,
                t.name,
                t.email,
                t.totalAmount,
                t.bookingDate,
                t.tourName,
                t.Status,
                paymentMethod = t.PaymentMethod.methodName,
            })
            .ToList();

            return Ok(bookingList);
        }

        [HttpGet("GetBookingId/{id}")]
        public async Task<IActionResult> GetBookingById(Guid id)
        {
            var bookings = await _context.Bookings
                .Where(s => s.id == id)
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound(new { message = "Không tìm thấy đơn cho tour này." });
            }

            return Ok(bookings);
        }

        [HttpGet("GetBookingByphoneNumber/{phoneNumber}")]
        public async Task<IActionResult> GetBookingById(string phoneNumber)
        {
            var bookings = await _context.Bookings
                .Where(s => s.phoneNumber.Replace(" ", "") == phoneNumber)
                .ToListAsync();

            if (bookings == null || bookings.Count == 0)
            {
                return NotFound(new { message = "Không tìm thấy đơn cho tour này." });
            }

            return Ok(bookings);
        }

        [HttpPut("CancelBooking/{id}")]
        public IActionResult CancelBooking(Guid id)
        {
            try
            {
                // Find the booking by ID
                var booking = _context.Bookings.FirstOrDefault(u => u.id == id);

                if (booking == null)
                {
                    return NotFound("Không tìm thấy đơn đặt.");
                }

                // Update the status to "Đã hủy"
                booking.Status = DA_K12_Tour.utils.BookingStatus.DaHuy; // Set the status to "Đã hủy"

                // Save changes to the database
                _context.Bookings.Update(booking);
                _context.SaveChanges();

                return Ok("Đơn đặt đã được hủy.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateBookings([FromBody] AddBookingRequest request)
        {
            try
            {

                Booking booking = new()
                {
                    bookingId = $"Booking-{Guid.NewGuid()}",
                    tourId = request.tourId,
                    description = request.description,
                    name = request.name,
                    email = request.email,
                    phoneNumber = request.phoneNumber,
                    departureDate = request.departureDate,
                    numberOfAdult = request.numberOfAdult,
                    numberOfChild = request.numberOfChild,
                    tourName=request.tourName,
                    totalAmount = request.totalAmount,
                    paymentMethodId = request.paymentMethodId,
                    bookingDate = DateOnly.FromDateTime(DateTime.Now),
                };

                _context.Bookings.Add(booking);
                _context.SaveChanges();

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBooking(Guid id, [FromBody] AddBookingRequest request)
        {
            try
            {
                var booking = _context.Bookings.FirstOrDefault(u => u.id == id);

                if (booking == null)
                {
                    return NotFound("Không tìm thấy lịch trình.");
                }


                booking.bookingId = $"Booking-{Guid.NewGuid()}";
                booking.tourId = request.tourId;
                booking.description = request.description;
                booking.name = request.name;
                booking.email = request.email;
                booking.numberOfChild = request.numberOfChild;
                booking.numberOfAdult = request.numberOfAdult;
                booking.totalAmount = request.totalAmount;
                booking.paymentMethodId = request.paymentMethodId;
                booking.bookingDate = DateOnly.FromDateTime(DateTime.Now);


                _context.Bookings.Update(booking);
                _context.SaveChanges();

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBooking(Guid id)
        {
            try
            {
                var booking = _context.Bookings.FirstOrDefault(u => u.id == id);

                if (booking == null)
                {
                    return NotFound("Không tìm thấy đơn đặt.");
                }

                // Xóa danh mục
                _context.Bookings.Remove(booking);
                _context.SaveChanges();

                return Ok("Đã xóa đơn đặt thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
