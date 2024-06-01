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

    [HttpGet]
    public async Task<IActionResult> GetEmployees()=> Ok(_mapper.Map<List<EmployeeDto>>(await _employeeService.GetAllAsync()));


    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(int id)=> Ok(_mapper.Map<EmployeeDto>(await _employeeService.GetByIdAsync(id)));
    //{
    //    var employee = await _employeeService.GetByIdAsync(id);
    //    if (employee == null)
    //    {
    //        return NotFound();
    //    }
    //    return Ok(_mapper.Map<EmployeeDto>(employee)); // Map to DTO for security
    //}

    [HttpPost]
    public async Task<ActionResult> AddEmployee([FromBody] EmployeePostModel employee)
    {
        var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(employee));
        return Ok(_mapper.Map<EmployeeDto>(newEmployee)); // Map to DTO for security
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeePostModel employee)
    {
        var employeeToUpdate = await _employeeService.GetByIdAsync(id);

        if (employeeToUpdate == null)
        {
            // If the employee doesn't exist, return a 404 Not Found response
            return NotFound($"Employee with id {id} does not exist.");
        }

        // Update the necessary properties
        _mapper.Map(employee, employeeToUpdate);
       
        // Update the employee in the database
        var updatedEmployee = await _employeeService.UpdateAsync(id,employeeToUpdate);

        if (updatedEmployee == null)
        {
            return BadRequest("An error occurred while updating the employee.");
        }

        return Ok(_mapper.Map<EmployeeDto>(updatedEmployee));
    }

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
       await _employeeService.UpdateAsync(id,emp);
        return NoContent();
    }
}
