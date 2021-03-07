using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Usuario
    {
        public int id { get; set; }

        public string username { get; set; }

        public string usertype { get; set; }

        public string email { get; set; }

        public string passwd { get; set; }
    }
}
