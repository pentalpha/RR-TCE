using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using WebAPI.Services;
using System.Text.Json;
using Newtonsoft.Json;
using WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsuarioController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate(Usuario model)
        {
            // Recupera o usuário
            /*var userJson = UserRepository.Get(model.Username, model.Password);*/
            var userTable = GetUserByUsername(model.username, model.passwd);

            var users = CommonMethod.ConvertToList<Usuario>(userTable);

            // Verifica se retornou mais de 1 usuário com mesmo username
            if (users.Count > 1)
                return NotFound(new { message = "Há mais de 1 usuário com mesmo username. Entre em contato com os administradores do sistema" });

            // Verifica se o usuário existe
            if (users == null || users.Count == 0)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var user = users[0];

            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Oculta a senha
            user.passwd = "";

            // Retorna os dados
            return new
            {
                user = user,
                token = token
            };
        }

        public JsonResult Get()
        {
            string query = @"
                    select id, username, usertype, email from dbo.Usuario";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RRTCEAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        /*[HttpGet("username/{name}")]*/
        private DataTable GetUserByUsername(string name, string password)
        {
            string query = @"
                    select id, username, usertype, email from dbo.Usuario" + @"
                    where username = '" + name + @"' 
                    and passwd = '" + password + @"'
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RRTCEAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return table;
        }

        [HttpPost]
        public JsonResult Post(Usuario usuario)
        {
            string query = @"
                    insert into dbo.Usuario
                    (username,usertype,email,passwd)
                    values
                    (
                    '" + usuario.username + @"'
                    ,'" + usuario.usertype + @"'
                    ,'" + usuario.email + @"'
                    ,'" + usuario.passwd + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RRTCEAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        
        [HttpPut]
        public JsonResult Put(Usuario usuario)
        {
            string query = @"
                    update dbo.Usuario set 
                    username = '" + usuario.username + @"'
                    ,usertype = '" + usuario.usertype + @"'
                    ,email = '" + usuario.email + @"'
                    ,passwd = '" + usuario.passwd + @"'
                    where id = " + usuario.id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RRTCEAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "ADMIN")]
        public string Employee() => "Funcionário";


        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "ADMIN")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Usuario
                    where id = " + id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("RRTCEAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
