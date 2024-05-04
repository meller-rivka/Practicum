using AutoMapper;
using Mng.CORE.DTOs;
using Mng.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.CORE.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {

            CreateMap<EmployeeDto, Employee>().ReverseMap();
            CreateMap<EmployeeRoleDto, EmployeeRole>().ReverseMap();
            CreateMap<RoleDto, Role>().ReverseMap();
            CreateMap<Employee, EmployeeRoleDto>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));// Assuming Employee has an Id property



        }
    }
}
