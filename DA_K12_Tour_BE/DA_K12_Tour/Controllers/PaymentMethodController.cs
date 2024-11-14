using DA_K12_Tour.Data;
using DA_K12_Tour.Models.DTO;
using DA_K12_Tour.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DA_K12_Tour.Controllers
{
    [Route("api/paymentMethod")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaymentMethodController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult getAllPaymentMethod(string? searchName, string? searchCode)
        {
            var obj = _context.PaymentMethods
            .Where(c =>
            (string.IsNullOrEmpty(searchName) || c.methodName.Contains(searchName)) &&
            (string.IsNullOrEmpty(searchCode) || c.methodId.Contains(searchCode))
            )
            .ToList();

            return Ok(obj);
        }


        [HttpPost]
        public IActionResult CreatePaymentMethod([FromBody] AddPaymentMethodRequest request)
        {
            try
            {
                var data = _context.PaymentMethods.FirstOrDefault(u => u.methodName == request.methodName);

                if (data != null)
                {
                    return BadRequest("Trùng tên phương thức thanh toán");
                }

                PaymentMethod method = new()
                {
                    methodId = request.methodId,
                    methodName = request.methodName,
                    description = request.description,
                };

                _context.PaymentMethods.Add(method);
                _context.SaveChanges();

                return Ok(method);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePaymentMethod(Guid id, [FromBody] AddPaymentMethodRequest request)
        {
            try
            {
                var obj = _context.PaymentMethods.FirstOrDefault(u => u.id == id);

                if (obj == null)
                {
                    return NotFound("Không tìm thấy phương thức.");
                }


                obj.methodId = request.methodId;
                obj.methodName = request.methodName;
                obj.description = request.description;


                _context.PaymentMethods.Update(obj);
                _context.SaveChanges();

                return Ok(obj);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePaymentMethod(Guid id)
        {
            try
            {
                var obj = _context.PaymentMethods.FirstOrDefault(u => u.id == id);

                if (obj == null)
                {
                    return NotFound("Không tìm thấy phương thức.");
                }

                // Xóa danh mục
                _context.PaymentMethods.Remove(obj);
                _context.SaveChanges();

                return Ok("Đã xóa phương thức thanh toán thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
