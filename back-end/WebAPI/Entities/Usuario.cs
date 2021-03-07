using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebAPI.Entities
{
    public class Usuario
    {
        public int id { get; set; }
        public string username { get; set; }
        public string usertype { get; set; }
        public string email { get; set; }
        [JsonIgnore]
        public string passwd { get; set; }
        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
