using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.Models
{
    public class Event
    {
        public Guid Id { get; set; }

        public string Description { get; set; }
    }
}
