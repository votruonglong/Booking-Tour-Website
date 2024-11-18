namespace DA_K12_Tour.Models
{
    public class OrderInfoModel
    {
        public string OrderId { get; set; } // Mã đơn hàng
        public string Amount { get; set; } // Số tiền thanh toán (nên là decimal để đảm bảo tính chính xác)
        public string FullName { get; set; } // Tên khách hàng
        public string OrderInfo { get; set; } // Nội dung đơn hàng
        public string Email { get; set; } // Email khách hàng
        public string PhoneNumber { get; set; } // Số điện thoại khách hàng
    }
}
