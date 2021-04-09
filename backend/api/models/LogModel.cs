using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class LogModel
    {
        public Guid Id { get; set; }
        public Guid IdCard { get; set; }

        [Column(TypeName = "nvarchar(1)")]
        public string CodOper { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Extraction { get; set; }
        public DateTime Date { get; set; }
    }
}