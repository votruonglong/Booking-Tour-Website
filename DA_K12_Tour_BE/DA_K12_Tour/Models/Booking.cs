using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.utils;
using System.ComponentModel.DataAnnotations;

namespace DA_K12_Tour.Models
{

    
    public class Booking
    {
        [Key]
        public Guid id { get; set; }
        public string bookingId { get; set; }
        public Guid tourId { get; set; }
        public virtual Tour Tour { get; set; }
        public Guid paymentMethodId { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }
        public string email { get; set; }
        public string tourName { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public DateOnly departureDate { get; set; }
        public int numberOfAdult { get; set; }
        public int numberOfChild { get; set; }
        public string totalAmount { get; set; }
        public string? description { get; set; }
        public DateOnly bookingDate { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.DaNhan;
    }
}
