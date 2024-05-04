using static Mng.CORE.Entities.Enums;

namespace Mng.API.Models
{
    public class EmployeePutModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TZ { get; set; }
        public DateTime StartWork { get; set; }
        public DateTime BirthDate { get; set; }
        public GenderEnum Gender { get; set; }
        public List<EmployeeRolePostModel> EmployeeRoles { get; set; }
        public bool Active { get; set; }

    }
}
