using System;

namespace WebAPI.Entities
{
    public class TCC
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int ProfessorId { get; set; }
        public bool Approved { get; set; }
        public string Keywords { get; set; }
        public string Abstract { get; set; }
        public DateTime DateCreation { get; set; }
    }
}
