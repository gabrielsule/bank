using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class AccountModel
    {
        public Guid Id { get; set; }
        public Guid IdCard { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Balance { get; set; }

    }
}