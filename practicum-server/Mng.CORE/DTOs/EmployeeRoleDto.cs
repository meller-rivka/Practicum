using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.CORE.DTOs
{
    public class EmployeeRoleDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public DateTime StartRole { get; set; }
        public bool Manager { get; set; }

    }
}
