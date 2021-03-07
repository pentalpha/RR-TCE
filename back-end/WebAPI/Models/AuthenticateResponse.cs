using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Models
{
    public class AuthenticateResponse
    {
        public int id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(Usuario usuario, string jwtToken, string refreshToken)
        {
            id = usuario.id;
            username = usuario.username;
            email = usuario.email;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
