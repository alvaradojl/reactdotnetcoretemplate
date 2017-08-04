using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.Dtos
{
    public class EventDto
    {
        public EventDto(Guid id, string description)
        {
            this.Id = id;
            this.Description = description;
        }

        public Guid Id { get;}

        public string Description { get;}
    }
}
