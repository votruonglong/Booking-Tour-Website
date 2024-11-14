using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace DA_K12_Tour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        public AuthController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO request)
        {
            // Retrieve the user from the database by username
            var userData = _db.Users.FirstOrDefault(u => u.UserName == request.UserName);

            if (userData != null)
            {
                // Check if the password matches
                if (userData.Password == request.Password)
                {
                    // Return the full user details if login is successful
                    return Ok(new
                    {
                        userData.Id,
                        userData.UserName,
                        userData.FullName,
                        userData.Email,
                        userData.PhoneNumber,
                        userData.Role,  // If applicable
                    });
                }
            }

            // Return a BadRequest if user not found or password is incorrect
            return BadRequest(new { message = "Invalid username or password" });
        }

    }
}
