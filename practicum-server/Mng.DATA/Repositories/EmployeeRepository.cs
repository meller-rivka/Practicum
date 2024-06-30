using Microsoft.EntityFrameworkCore;
using Mng.CORE.Entities;
using Mng.CORE.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Mng.DATA.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _dataContext;
        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {

            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        //public async Task<EmployeeRole> AddRoleToEmployee(EmployeeRole employeeRole)
        //{
        //    var employee = await _dataContext.Employees.FirstOrDefaultAsync(e => e.Id == employeeRole.EmployeeId);
        //    //var role = await _dataContext.Roles.FirstOrDefaultAsync(r => r.Id == employeeRole.RoleId);
        //    if (employee == null)
        //    {
        //        throw new ArgumentException("Employee not found");
        //    }

        //    // Inject DbContext instance
        //    var context = _dataContext;/* inject your DbContext instance */;

        //    // Explicitly load roles if not already loaded
        //    if (!context.Entry(employee).Collection(e => e.EmployeeRoles).IsLoaded)
        //    {
        //        context.Entry(employee).Collection(e => e.EmployeeRoles).Load();
        //    }
        //    employee?.EmployeeRoles.Add(employeeRole);
        //    await _dataContext.SaveChangesAsync();
        //    return employeeRole;
        //}
        public async Task<Employee> GetEmployeeByTZAsync(string tz)
        {
            return await _dataContext.Employees.SingleOrDefaultAsync(e => e.TZ == tz);
        }

        public async Task DeleteAsync(int employeeId)
        {
            var emp = await GetByIdAsync(employeeId);
            _dataContext.Remove(emp);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees.Include(u => u.EmployeeRoles).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _dataContext.Employees.Include(e => e.EmployeeRoles).FirstOrDefaultAsync(e => e.Id == id);
        }


        public async Task<Employee> UpdateAsync(int id,Employee employee)
        {
            var existEmployee = await _dataContext.Employees.Include(e=>e.EmployeeRoles).FirstOrDefaultAsync(r=>r.Id==id);
            if (existEmployee != null)
            {
                existEmployee.FirstName = employee.FirstName;
                existEmployee.LastName = employee.LastName;
                existEmployee.TZ = employee.TZ;
                existEmployee.StartWork = employee.StartWork;
                existEmployee.BirthDate = employee.BirthDate;
                existEmployee.Gender = employee.Gender;
                existEmployee.Active = employee.Active;
                existEmployee.EmployeeRoles = employee.EmployeeRoles;


                await _dataContext.SaveChangesAsync();
            }

            return existEmployee;
        }

    }
}
