using Mng.API.Models;
using Mng.CORE.DTOs;
using Mng.CORE.Entities;
using System.ComponentModel.DataAnnotations;
using static Mng.CORE.Entities.Enums;

namespace Mng.API.Models
{
    public class EmployeePostModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(10)]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage = "First name must include just letters or spaces!")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(10)]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage = "Last name must include just letters or spaces!")]
        public string LastName { get; set; }

        [Required]
        [RegularExpression(@"^\d{9}$", ErrorMessage = "TZ must contain exactly 9 digits.")]
        public string TZ { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [ValidateStartWorkDate(ErrorMessage = "Start work date cannot be in the future.")]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartWork { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [ValidateBirthDate(ErrorMessage = "You must be at least 18 years old.")]
        public DateTime BirthDate { get; set; }

        [Required]
        public GenderEnum Gender { get; set; }

        [Required]
        [ValidateRoleStartDates(ErrorMessage = "Role start date cannot be before employee's start work date.")]
        public List<EmployeeRolePostModel> EmployeeRoles { get; set; }
        public bool Active { get; set; }

    }
}
public class ValidateBirthDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var birthDate = (DateTime)value;
        if (birthDate > DateTime.Now.AddYears(-18))
            return new ValidationResult(ErrorMessage);
        return ValidationResult.Success;
    }
}
public class ValidateStartWorkDateAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var startWorkDate = (DateTime)value;
        if (startWorkDate >= DateTime.Now)
            return new ValidationResult(ErrorMessage);
        return ValidationResult.Success;
    }
}
public class ValidateRoleStartDatesAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var roles = value as List<EmployeeRolePostModel>;
        if (roles == null)
            return ValidationResult.Success;
        var employeePostModel = validationContext.ObjectInstance as EmployeePostModel;
        if (employeePostModel == null)
            return new ValidationResult("Invalid employee data.");
        if (roles.Any(role => role.StartRole < employeePostModel.StartWork))
            return new ValidationResult(ErrorMessage);
        return ValidationResult.Success;
    }
}