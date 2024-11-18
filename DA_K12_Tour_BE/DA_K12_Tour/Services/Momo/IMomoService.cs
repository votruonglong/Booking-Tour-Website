using DA_K12_Tour.Models.Momo;
using DA_K12_Tour.Models;

namespace DA_K12_Tour.Services.Momo
{
    public interface IMomoService
    {
        Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(OrderInfoModel model);
        MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection);
    }
}
