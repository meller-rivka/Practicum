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
    public async Task<ActionResult> CreateEmployee([FromBody] EmployeePostModel employee)
    {
        //if (!ModelState.IsValid)
        //{
        //    return BadRequest(ModelState);
        //}
        var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(employee));
        return Ok(_mapper.Map<EmployeeDto>(newEmployee)); // Map to DTO for security
    }
   
    // PUT: api/Role/5 (Assuming update requires full object replacement)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeePutModel employee) // Assuming RolePutModel exists
    {
        var emp = await _employeeService.GetByIdAsync(id);
        if (emp is null)
        {
            return NotFound();
        }

        _mapper.Map(employee, emp);
        await _employeeService.UpdateAsync(emp);
        emp = await _employeeService.GetByIdAsync(id);
        return Ok(_mapper.Map<EmployeeDto>(emp));
       
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
