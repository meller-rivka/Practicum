using AutoMapper;
using Mng.API.Models;
using Mng.CORE.Entities;

public class ApiMappingProfile : Profile
{
    public ApiMappingProfile()
    {
        CreateMap<EmployeePostModel, Employee>();
        CreateMap<RolePostModel, Role>();
        CreateMap<EmployeeRolePostModel, EmployeeRole>();
}
}
