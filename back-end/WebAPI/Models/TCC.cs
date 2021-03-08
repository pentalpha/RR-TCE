using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class TCC
    {
        public int id { get; set; }

        public string title { get; set; }

        public int author_id { get; set; }

        public int professor_id { get; set; }

        public bool approved { get; set; }

        public string keywords { get; set; }

        public string abstract_text { get; set; }

        public DateTime date_creation { get; set; }
    }
}
