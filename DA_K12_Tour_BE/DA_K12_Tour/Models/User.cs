using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace DA_K12_Tour.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public int userId { get; set; }
        public string? UserName { get; set; }
        public string? FullName { get; set; }

        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public DateOnly CreatedTime { get; set; }
    }
}
