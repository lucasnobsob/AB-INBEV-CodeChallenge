using AB_INBEV.Domain.Models;

namespace AB_INBEV.Domain.Interfaces
{
    public interface IPhoneRepository : IRepository<Phone>
    {
        Task RemoveByEmployeeId(Guid employeeId);
    }
}
