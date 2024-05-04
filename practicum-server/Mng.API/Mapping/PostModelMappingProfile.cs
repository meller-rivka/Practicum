//using AutoMapper;
//using Mng.API.Models;
//using Mng.CORE.Entities;

//namespace Mng.API.Mapping
//{
//    public class PostModelMappingProfile:Profile
//    {
//        public PostModelMappingProfile()
//        {
//            CreateMap<EmployeePostModel, Employee>();
//            CreateMap<RolePostModel, Role>();
//            CreateMap<>([RolePostModel,EmployeePostmodel],EmployeeRole)();
//        }
//    }
//}

using AutoMapper;
using Mng.API.Models;
using Mng.CORE.Entities;

public class PostModelMappingProfile : Profile
{
    public PostModelMappingProfile()
    {
        CreateMap<EmployeePostModel, Employee>();
        CreateMap<EmployeePutModel, Employee>();
        CreateMap<RolePostModel, Role>();
        CreateMap<RolePutModel, Role>();
        CreateMap<EmployeeRolePostModel, EmployeeRole>();

        //CreateMap<EmployeePostModel, Employee>()
        //    .ForMember(dest => dest.EmployeeRoles, opt => opt.Ignore()); // Ignore for now

        //CreateMap<RolePostModel, Role>();

        //CreateMap<EmployeePostModel, EmployeeRole>()
        //    .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.EmployeeId))
        //    .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.id))
        //    .ForMember(dest => dest.StartRole, opt => opt.Ignore()); // Set StartDate later

        //CreateMap<RolePostModel, EmployeeRole>()
        //    .ForMember(dest => dest.EmployeeId, opt => opt.Ignore())
        //    .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => src.Id))
        //    .ForMember(dest => dest.StartRole, opt => opt.Ignore()); // Set StartDate later
    }
}
