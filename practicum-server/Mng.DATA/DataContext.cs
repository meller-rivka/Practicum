using Microsoft.EntityFrameworkCore;
using Mng.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mng.DATA
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Role> Roles { get; set; }
   
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {
        //        var connectionString = "server=bf5js4yzcejshyn1hbcz-mysql.services.clever-cloud.com;user=uylo9gioiddhrkua;password=duePpUF3WPAe77vpWueO;database=bf5js4yzcejshyn1hbcz";

        //        //var connectionString = "server=localhost;user=root;password=Rm8184!!!~~~;database=Mng_project";
        //        optionsBuilder.UseMySql(connectionString, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql"));
        //    }
           
        //}
    }
}

