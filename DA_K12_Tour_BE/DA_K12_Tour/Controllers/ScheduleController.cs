using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DA_K12_Tour.Controllers
{
    [Route("api/schedule")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ScheduleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult getAllSchedule(string? searchCode)
        {
            var scheduleList = _context.Schedules
            .Include(t => t.Tour)
            .Where(t =>
                (string.IsNullOrEmpty(searchCode) || t.scheduleId.Contains(searchCode))
            )
            .Select(t => new
            {
                t.Id,
                t.tourId,
                t.scheduleId,
                t.description,
                t.title,
                tourName = t.Tour.tourName
            })
            .ToList();

            return Ok(scheduleList);
        }

        [HttpGet("GetScheduleByTourId/{tourId}")]
        public async Task<IActionResult> GetScheduleByTourId(Guid tourId)
        {
            var schedules = await _context.Schedules
                .Where(s => s.tourId == tourId)
                .ToListAsync();

            if (schedules == null || schedules.Count == 0)
            {
                return NotFound(new { message = "Không tìm thấy lịch trình cho tour này." });
            }

            return Ok(schedules);
        }


        [HttpPost]
        public IActionResult CreateSchedule([FromBody] AddScheduleRequest request)
        {
            try
            {
                var data = _context.Schedules.FirstOrDefault(u => u.scheduleId == request.scheduleId);

                if (data != null)
                {
                    return BadRequest("Trùng mã lịch trình");
                }

                Schedule schedule = new()
                {
                    scheduleId = request.scheduleId,
                    tourId = request.tourId,
                    description = request.description,
                    title = request.title,
                };

                _context.Schedules.Add(schedule);
                _context.SaveChanges();

                return Ok(schedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateSchedule(Guid id, [FromBody] AddScheduleRequest request)
        {
            try
            {
                var schedule = _context.Schedules.FirstOrDefault(u => u.Id == id);

                if (schedule == null)
                {
                    return NotFound("Không tìm thấy lịch trình.");
                }


                schedule.scheduleId = request.scheduleId;
                schedule.tourId = request.tourId;
                schedule.description = request.description;
                schedule.title = request.title;


                _context.Schedules.Update(schedule);
                _context.SaveChanges();

                return Ok(schedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult XoaDanhMuc(Guid id)
        {
            try
            {
                var schedule = _context.Schedules.FirstOrDefault(u => u.Id == id);

                if (schedule == null)
                {
                    return NotFound("Không tìm thấy lịch trình.");
                }

                // Xóa danh mục
                _context.Schedules.Remove(schedule);
                _context.SaveChanges();

                return Ok("Đã xóa lịch trình thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
