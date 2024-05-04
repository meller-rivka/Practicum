using Mng.CORE.Entities;
using Mng.CORE.Repositories;
using Mng.CORE.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.SERVICES
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<Role> AddAsync(Role employee)
        {
            return await _roleRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(int roleId)
        {
            await _roleRepository.DeleteAsync(roleId);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleRepository.GetAllAsync();
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _roleRepository.GetByIdAsync(roleId);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            return await _roleRepository.UpdateAsync(role);
        }
    }
}
