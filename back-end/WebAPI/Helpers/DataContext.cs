using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Helpers
{
    public class DataContext : DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
