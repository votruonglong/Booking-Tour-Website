using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DA_K12_Tour.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult getAllComment()
        {
            var comment = _context.Comments
            .Include(t => t.User)
            .Select(t => new
            {
                t.id,
                t.Content,
                t.CreatedDate,
                t.TourId,
                User = t.User.UserName
            })
            .ToList();


            return Ok(comment);
        }

        [HttpGet("GetCommentByTourId/{tourId}")]
        public async Task<IActionResult> GetCommentByTourId(Guid tourId)
        {
            var comment = await _context.Comments
                .Where(s => s.TourId == tourId)
                .Include(t => t.User)
                .Select(t => new
                {
                    t.id,
                    t.Content,
                    t.CreatedDate,
                    t.TourId,
                    User = t.User.FullName
                })
                .ToListAsync();

            return Ok(comment);
        }

        [HttpPost]
        public async Task<IActionResult> ThemBinhLuan(AddCommentRequest request)
        {
            try
            {
                // Create a new Tour instance
                var comment = new Comment
                {
                    Content = request.Content,
                    UserId = request.UserId,
                    TourId = request.TourId,
                    CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                };
                await _context.Comments.AddAsync(comment);
                await _context.SaveChangesAsync();

                return Ok("Bình luận thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error saving file: " + ex.Message);
            }
        }
    }
}
