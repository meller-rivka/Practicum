using Mng.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Mng.CORE.Entities.Enums;

namespace Mng.CORE.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TZ { get; set; }
        public DateTime StartWork { get; set; }
        public DateTime BirthDate { get; set; }
        public GenderEnum Gender { get; set; }
        public List<EmployeeRoleDto> EmployeeRoles { get; set; }
        public bool Active { get; set; }
    }
}
