using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.CORE.Entities
{
    public class EmployeeRole
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime StartRole { get; set; }
        public bool Manager { get; set; }



    }
}
