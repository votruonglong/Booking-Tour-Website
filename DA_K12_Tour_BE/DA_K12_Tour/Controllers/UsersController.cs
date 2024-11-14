using DA_K12_Tour.Data;
using DA_K12_Tour.Models;
using DA_K12_Tour.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DA_K12_Tour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UsersController(AppDbContext db) 
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult getAllUser()
        {
            var userData = _db.Users.ToList();

            return Ok(userData);
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterRequestDTO request)
        {
            try
            {
                var userData = _db.Users.FirstOrDefault(u => u.UserName == request.UserName);

                if (userData != null)
                {
                    return BadRequest("Đã có người dùng");
                }

                var phoneNumberExists = _db.Users.Any(u => u.PhoneNumber == request.PhoneNumber);
                if (phoneNumberExists)
                {
                    return BadRequest("Số điện thoại này đã được đăng ký");
                }


                if (request.Role == null)
                {
                    request.Role = "KhachHang";
                }

                User nguoiDung = new()
                {
                    UserName = request.UserName,
                    FullName = request.FullName,
                    Password = request.Password,
                    Email = request.Email,
                    Role = request.Role,
                    PhoneNumber = request.PhoneNumber,
                    CreatedTime = DateOnly.FromDateTime(DateTime.Now)
                };

                _db.Users.Add(nguoiDung);
                _db.SaveChanges();

                return Ok(nguoiDung);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
