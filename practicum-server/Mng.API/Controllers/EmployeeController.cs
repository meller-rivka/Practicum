using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Mng.API.Models;
using Mng.CORE.DTOs;
using Mng.CORE.Entities;
using Mng.CORE.Services;
using Mng.SERVICES;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IEmployeeService _employeeService; // Service for business logic

    public EmployeeController(IMapper mapper, IEmployeeService employeeService)
    {
        _mapper = mapper;
        _employeeService = employeeService;
    }

    // GET: api/Employee
    [HttpGet]
    public async Task<IActionResult> GetEmployees()
    {
        var employees = await _employeeService.GetAllAsync();
        return Ok(_mapper.Map<List<EmployeeDto>>(employees)); // Map to DTO for security
    }
    // GET: api/Employee/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(int id)
    {
        var employee = await _employeeService.GetByIdAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<EmployeeDto>(employee)); // Map to DTO for security
    }

    // POST: api/Employee
    [HttpPost]
    
   
    // PUT: api/Role/5 (Assuming update requires full object replacement)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeePutModel employee)
    {
        //var employeeToUpdate = _mapper.Map<Employee>(employee);
        //employeeToUpdate.Id = id;
        //var updateEmployee = await _employeeService.UpdateAsync(employeeToUpdate);
        //if (updateEmployee is null)
        //{
        //    return NotFound($"employee with id {id} is not exist!");
        //}

        //return Ok(_mapper.Map<EmployeeDto>(updateEmployee));
        // Retrieve the employee from the database
        var employeeToUpdate = await _employeeService.GetByIdAsync(id);

        if (employeeToUpdate == null)
        {
            // If the employee doesn't exist, return a 404 Not Found response
            return NotFound($"Employee with id {id} does not exist.");
        }

        // Update the necessary properties
        _mapper.Map(employee, employeeToUpdate);
        foreach (var role in employeeToUpdate.EmployeeRoles)
        {
            role.EmployeeId = id;
        }
        // Update the employee in the database
        var updatedEmployee = await _employeeService.UpdateAsync(employeeToUpdate);

        if (updatedEmployee == null)
        {
            return BadRequest("An error occurred while updating the employee.");
        }

        return Ok(_mapper.Map<EmployeeDto>(updatedEmployee));


    }

    // DELETE: api/Role/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        var emp = await _employeeService.GetByIdAsync(id);
        if (emp == null)
            return NotFound();
        await _employeeService.DeleteAsync(id);
        return NoContent();
    }
    [HttpDelete("{id}/active")]
    public async Task<ActionResult> DeleteEmployeeActive(int id)
    {
        Employee emp = await _employeeService.GetByIdAsync(id);
        if (emp == null)
            return NotFound();
        emp.Active= false;
       await _employeeService.UpdateAsync(emp);
        return NoContent();
    }
}
