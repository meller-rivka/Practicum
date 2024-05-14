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
    public class EmployeeService :IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            return await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteAsync(int employeeId)
        {
            await _employeeRepository.DeleteAsync(employeeId);
        }


        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _employeeRepository.GetByIdAsync(employeeId);
        }

        public async Task<Employee> UpdateAsync(int id,Employee employee)
        {
            return await _employeeRepository.UpdateAsync(id,employee);
        }

       
    }
}
