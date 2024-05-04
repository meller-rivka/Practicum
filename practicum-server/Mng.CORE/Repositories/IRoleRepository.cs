using Mng.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.CORE.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllAsync();
        Task<Role> GetByIdAsync(int roleId);
        Task<Role> AddAsync(Role employee);
        Task<Role> UpdateAsync(Role role);
        Task DeleteAsync(int roleId);
    }
}
