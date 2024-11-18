using DA_K12_Tour.Models;
using DA_K12_Tour.Services.Momo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DA_K12_Tour.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IMomoService _momoService;
        public PaymentController(IMomoService momoService)
        {
            _momoService = momoService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentUrl(OrderInfoModel model)
        {
            if (string.IsNullOrWhiteSpace(model.OrderId))
            {
                model.OrderId = DateTime.UtcNow.Ticks.ToString();
            }
            var response = await _momoService.CreatePaymentAsync(model);
            return Ok(response);
        }

    }
}
