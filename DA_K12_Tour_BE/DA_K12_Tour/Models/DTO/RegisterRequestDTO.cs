namespace DA_K12_Tour.Models.DTO
{
    public class RegisterRequestDTO
    {
        public string? UserName { get; set; }
        public string? FullName { get; set; }

        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
    }
}
