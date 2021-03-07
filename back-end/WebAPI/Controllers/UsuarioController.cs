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

        
        [HttpDelete("{id}")]
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
