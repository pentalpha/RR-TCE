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
using Microsoft.AspNetCore.Authorization;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TCCController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string logTCC = "LogTCC";

        public TCCController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public JsonResult Get()
        {
            string query = @"
                    select id, title, author_id, professor_id, approved, keywords, abstract, date_creation from dbo.TCC";
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

        [HttpGet("professorId/{id}")]
        public JsonResult GetTCCByProfessorId(int id)
        {
            string query = @"
                    select id, title, author_id, professor_id, approved, keywords, abstract, date_creation from dbo.TCC"
                    + @" where professor_id = " + id + @"
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

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(TCC tcc)
        {
            string query = @"
                    insert into dbo.TCC
                    (title, author_id, professor_id, approved, keywords, abstract, date_creation)
                    values
                    (
                     '" + tcc.title + @"'
                    ,'" + tcc.author_id + @"'
                    ,'" + tcc.professor_id + @"'
                    ,'" + tcc.approved + @"'
                    ,'" + tcc.keywords + @"'
                    ,'" + tcc.abstract_text + @"'
                    ,'" + tcc.date_creation + @"'
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

            CommonMethod.registrarLog(sqlDataSource, logTCC, "Criado o TCC com title = " + tcc.title, 0);

            return new JsonResult("Added Successfully");
        }
        
        [HttpPut]
        public JsonResult Put(TCC tcc)
        { 
            string query = @"
                    update dbo.TCC set 
                    title = '" + tcc.title + @"'
                    ,author_id = '" + tcc.author_id + @"'
                    ,professor_id = '" + tcc.professor_id + @"'
                    ,approved = '" + tcc.approved + @"'
                    ,keywords = '" + tcc.keywords + @"'
                    ,abstract = '" + tcc.abstract_text + @"'
                    ,date_creation = '" + tcc.date_creation + @"'
                    where id = " + tcc.id + @"
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

            CommonMethod.registrarLog(sqlDataSource, logTCC, "Atualizado o TCC com ID = " + tcc.id, 0);

            return new JsonResult("Updated Successfully");
        }

        [HttpPut]
        [Route("{id}/{approved}")]
        [Authorize(Roles = "PROFESSOR")]
        public JsonResult AlterarApproved(int id, int approved)
        {
            string query = @"
                    update dbo.TCC set 
                    approved = " + approved + " " + @"
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

            string usertoken = Request.Headers["Authorization"];
            var token = usertoken.Split(' ');

            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(token[1], validations, out var tokenSecure);
            var usuarioId = claims.Identity.Name;
            CommonMethod.registrarLog(sqlDataSource, logTCC, "Deletado o TCC com ID = " + id, Int16.Parse(usuarioId));

            return new JsonResult("Updated Successfully the approved attribute");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.TCC
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

            CommonMethod.registrarLog(sqlDataSource, logTCC, "Deletado o TCC com ID = " + id, 0);

            return new JsonResult("Deleted Successfully");
        }
    }
}
