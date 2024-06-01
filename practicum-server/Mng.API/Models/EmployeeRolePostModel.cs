using System.ComponentModel.DataAnnotations;

namespace Mng.API.Models
{
    public class EmployeeRolePostModel {
        [Required]
        public int RoleId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime StartRole { get; set; }

        [Required]
        public bool Manager { get; set; }

    }
}
