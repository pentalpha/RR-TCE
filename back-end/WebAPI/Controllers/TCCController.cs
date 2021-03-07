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
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TCCController : ControllerBase
    {
        private readonly IConfiguration _configuration;

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
                     '" + tcc.Title + @"'
                    ,'" + tcc.AuthorId + @"'
                    ,'" + tcc.ProfessorId + @"'
                    ,'" + tcc.Approved + @"'
                    ,'" + tcc.Keywords + @"'
                    ,'" + tcc.Abstract + @"'
                    ,'" + tcc.DateCreation + @"'
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
        public JsonResult Put(TCC tcc)
        { 
            string query = @"
                    update dbo.TCC set 
                    title = '" + tcc.Title + @"'
                    ,author_id = '" + tcc.AuthorId + @"'
                    ,professor_id = '" + tcc.ProfessorId + @"'
                    ,approved = '" + tcc.Approved + @"'
                    ,keywords = '" + tcc.Keywords + @"'
                    ,abstract = '" + tcc.Abstract + @"'
                    ,date_creation = '" + tcc.DateCreation + @"'
                    where id = " + tcc.Id + @"
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

            return new JsonResult("Deleted Successfully");
        }
    }
}
