using DA_K12_Tour.utils;

namespace DA_K12_Tour.Models.DTO
{
    public class AddBookingRequest
    {
        public Guid tourId { get; set; }
        public Guid paymentMethodId { get; set; }
        public string email { get; set; }
        public string tourName { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public DateOnly departureDate { get; set; }
        public int numberOfAdult { get; set; }
        public int numberOfChild { get; set; }
        public string totalAmount { get; set; }
        public string? description { get; set; }

        // Status field (enum type)
    }
}
