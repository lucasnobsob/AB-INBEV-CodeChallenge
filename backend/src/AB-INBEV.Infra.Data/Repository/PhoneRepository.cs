using AB_INBEV.Domain.Interfaces;
using AB_INBEV.Domain.Models;
using AB_INBEV.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace AB_INBEV.Infra.Data.Repository
{
    public class PhoneRepository : Repository<Phone>, IPhoneRepository
    {
        public PhoneRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task RemoveByEmployeeId(Guid employeeId)
        {
            var phones = await DbSet.Where(x => x.EmployeeId == employeeId).ToListAsync();
            if (phones is null) return;
            DbSet.RemoveRange(phones);
        }
    }
}
