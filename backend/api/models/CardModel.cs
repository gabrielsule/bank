using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class CardModel
    {
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string Card { get; set; }

        [Column(TypeName = "nvarchar(4)")]
        public string Pin { get; set; }
        public DateTime Expiration { get; set; }
        public bool Locked { get; set; }
    }
}