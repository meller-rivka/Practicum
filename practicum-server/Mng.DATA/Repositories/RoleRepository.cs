using Microsoft.EntityFrameworkCore;
using Mng.CORE.Entities;
using Mng.CORE.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.DATA.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _dataContext;

        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Role> AddAsync(Role role)
        {
            _dataContext.Roles.Add(role);
            await _dataContext.SaveChangesAsync();
            return role;
        }

        public async Task DeleteAsync(int roleId)
        {
            var role =await GetByIdAsync(roleId);
            _dataContext.Remove(role);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dataContext.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _dataContext.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            var newRole = await GetByIdAsync(role.Id);
            _dataContext.Entry(newRole).CurrentValues.SetValues(role);
            await _dataContext.SaveChangesAsync();
            return newRole;
        }

    }
}
