using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DA_K12_Tour.Controllers
{
    [Route("api/tours")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TourController(AppDbContext context )
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult getAllTours(string? searchName, string? searchCode, Guid? categoriesSearch)
        {
            var tourList = _context.Tours
            .Include(t => t.Category) // Nạp thông tin Category
            .Where(t =>
                (string.IsNullOrEmpty(searchName) || t.tourName.Contains(searchName)) &&
                (string.IsNullOrEmpty(searchCode) || t.tourId.Contains(searchCode)) &&
                (!categoriesSearch.HasValue || t.categoryId == categoriesSearch.Value) 
            )
            .Select(t => new
            {
                t.Id,
                t.tourId,
                t.categoryId,
                t.tourName,
                t.AdultPrice,
                t.ChildPrice,
                t.Description,
                t.isActive,
                t.Images,
                categoryName = t.Category.Name // Chỉ lấy tên danh mục
            })
            .ToList();


            return Ok(tourList);
        }

        [HttpGet("{id}")]
        public IActionResult GetTourById(Guid id)
        {
            var tour = _context.Tours
                .Include(t => t.Category) // Nạp thông tin Category
                .Include(t => t.Images) // Nạp thông tin Images nếu cần
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.tourId,
                    t.categoryId,
                    t.tourName,
                    t.AdultPrice,
                    t.ChildPrice,
                    t.Description,
                    t.isActive,
                    Images = t.Images.Select(i => i.image_url).ToList(), // Lấy danh sách đường dẫn hình ảnh
                    categoryName = t.Category.Name // Chỉ lấy tên danh mục
                })
                .FirstOrDefault();

            if (tour == null)
            {
                return NotFound("Tour not found.");
            }

            return Ok(tour);
        }

        [HttpPost]
        public async Task<IActionResult> ThemTourAsync(AddTourRequest request)
        {
            try
            {
                // Check if the tour already exists
                var existingTour = await _context.Tours
                    .FirstOrDefaultAsync(u => u.tourName == request.tourName);

                if (existingTour != null)
                {
                    return BadRequest("Trùng tên tour");
                }

                // Create a new Tour instance
                var tour = new Tour
                {
                    tourId = request.tourId,
                    tourName = request.tourName,
                    categoryId = request.categoryId,
                    Description = request.Description,
                    AdultPrice = request.AdultPrice,
                    ChildPrice = request.ChildPrice,
                    isActive = request.isActive,
                    Images = new List<TourImage>()
                };

                if (request.ImageUrls != null)
                {
                    // Tạo danh sách DefectProductImage từ danh sách ImageUrls
                    tour.Images = request.ImageUrls
                        .Where(url => !string.IsNullOrWhiteSpace(url))  // Loại bỏ các phần tử null hoặc rỗng
                        .Select(url => new TourImage
                        {
                            image_url = url
                        })
                        .ToList();
                }
                // Save the tour to the database
                await _context.Tours.AddAsync(tour);
                await _context.SaveChangesAsync();

                return Ok("Thêm tour thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error saving file: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> SuaTour(Guid id, [FromBody] AddTourRequest request)
        {
            try
            {
                var tour = await _context.Tours.Include(t => t.Images).FirstOrDefaultAsync(u => u.Id == id);

                if (tour == null)
                {
                    return NotFound("Không tìm thấy tour.");
                }


                tour.tourId = request.tourId;
                tour.tourName = request.tourName;
                tour.categoryId = request.categoryId;
                tour.Description = request.Description;
                tour.AdultPrice = request.AdultPrice;
                tour.ChildPrice = request.ChildPrice;
                tour.isActive = request.isActive;

                if (request.ImageUrls != null)
                {
                    _context.TourImages.RemoveRange(tour.Images);
                    // Tạo danh sách DefectProductImage từ danh sách ImageUrls
                    tour.Images = request.ImageUrls
                        .Where(url => !string.IsNullOrWhiteSpace(url))  // Loại bỏ các phần tử null hoặc rỗng
                        .Select(url => new TourImage
                        {
                            image_url = url
                        })
                        .ToList();
                }

                _context.Tours.Update(tour);
                await _context.SaveChangesAsync();

                return Ok("Cập nhật tour thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult XoaTour(Guid id)
        {
            try
            {
                // Tìm danh mục theo Id
                var tour = _context.Tours.FirstOrDefault(u => u.Id == id);

                if (tour == null)
                {
                    return NotFound("Không tìm thấy tour.");
                }

                // Xóa danh mục
                _context.Tours.Remove(tour);
                _context.SaveChanges();

                return Ok("Đã xóa tour thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
