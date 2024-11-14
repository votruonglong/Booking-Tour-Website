using DA_K12_Tour.Data;
using DA_K12_Tour.Models;
using DA_K12_Tour.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DA_K12_Tour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DanhMucController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]        
        public IActionResult getAllDanhMuc(string? searchName, string? searchCode)
        {
            var categoryList = _context.Categories
            .Where(c =>
            (string.IsNullOrEmpty(searchName) || c.Name.Contains(searchName)) &&
            (string.IsNullOrEmpty(searchCode) || c.categoryId.Contains(searchCode))
            )
            .ToList();

            return Ok(categoryList);
        }


        [HttpPost]
        public IActionResult ThemDanhMuc([FromBody]AddCategoryRequestDTO request)
        {
            try
            {
                var data = _context.Categories.FirstOrDefault(u => u.Name == request.Name);

                if (data != null)
                {
                    return BadRequest("Trùng tên danh mục");
                }

                Category danhMuc = new()
                {
                    categoryId = request.categoryId,
                    Name = request.Name,
                    Description = request.Description,
                    CreatedTime = DateOnly.FromDateTime(DateTime.Now)
                };

                _context.Categories.Add(danhMuc);
                _context.SaveChanges();

                return Ok(danhMuc);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult SuaDanhMuc(Guid id, [FromBody] AddCategoryRequestDTO request)
        {
            try
            {
                var danhMuc = _context.Categories.FirstOrDefault(u => u.Id == id);

                if (danhMuc == null)
                {
                    return NotFound("Không tìm thấy danh mục.");
                }


                danhMuc.categoryId = request.categoryId;
                danhMuc.Name = request.Name;
                danhMuc.Description = request.Description;
                danhMuc.CreatedTime = DateOnly.FromDateTime(DateTime.Now);
                

                _context.Categories.Update(danhMuc);
                _context.SaveChanges();

                return Ok(danhMuc);
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
                // Tìm danh mục theo Id
                var danhMuc = _context.Categories.FirstOrDefault(u => u.Id == id);

                if (danhMuc == null)
                {
                    return NotFound("Không tìm thấy danh mục.");
                }

                // Xóa danh mục
                _context.Categories.Remove(danhMuc);
                _context.SaveChanges();

                return Ok("Đã xóa danh mục thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
