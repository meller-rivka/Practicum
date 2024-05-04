using Mng.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.CORE.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int employeeId);
        Task<Employee> AddAsync(Employee employee);
        Task<Employee> UpdateAsync(Employee employee);
        Task DeleteAsync(int employeeId);
        //Task<EmployeeRole> AddRoleToEmployee(EmployeeRole employeeRole);
        //Task<Employee> AddRoleToEmployee(int employeeId, int roleId);

    }
}
