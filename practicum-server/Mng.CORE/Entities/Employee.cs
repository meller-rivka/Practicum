using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static Mng.CORE.Entities.Enums;

namespace Mng.CORE.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string TZ { get; set; }

        public DateTime StartWork { get; set; }

        public DateTime BirthDate { get; set; }

        public GenderEnum Gender { get; set; }

        public IEnumerable<EmployeeRole> EmployeeRoles { get; set; }

        public bool Active { get; set; } = true;
    }
}
