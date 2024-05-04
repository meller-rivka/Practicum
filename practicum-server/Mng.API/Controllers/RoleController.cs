using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mng.API.Models; // Assuming Role model or DTO resides here
using Mng.CORE.DTOs;
using Mng.CORE.Entities;
using Mng.CORE.Services;

namespace Mng.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRoleService _roleService; // Service for business logic

        public RoleController(IMapper mapper, IRoleService roleService)
        {
            _mapper = mapper;
            _roleService = roleService;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<List<RoleDto>>(roles)); // Map to DTO for security
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<RoleDto>(role)); // Map to DTO for security
        }

        // POST: api/Role
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RolePostModel role) // Assuming RolePostModel exists
        {
            if (!ModelState.IsValid) // Validate model state
            {
                return BadRequest(ModelState);
            }

            var newRole = await _roleService.AddAsync(_mapper.Map<Role>(role));
            return Ok(_mapper.Map<RoleDto>(newRole)); // Map to DTO for security
        }

        // PUT: api/Role/5 (Assuming update requires full object replacement)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] RolePutModel role) // Assuming RolePutModel exists
        {
            if (!ModelState.IsValid) // Validate model state
            {
                return BadRequest(ModelState);
            }

            if (id != role.Id) // Check for ID mismatch
            {
                return BadRequest();
            }

            var existingRole = await _roleService.GetByIdAsync(id);
            if (existingRole == null)
            {
                return NotFound();
            }

            await _roleService.UpdateAsync(_mapper.Map<Role>(role));
            return NoContent(); // Success without content
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            await _roleService.DeleteAsync(role.Id);
            return NoContent(); // Success without content
        }
    }
}
