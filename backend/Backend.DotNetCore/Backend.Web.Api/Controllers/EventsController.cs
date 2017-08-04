using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Web.Api.Models;
using Backend.Web.Api.ViewModels;
using System.Threading;
using Backend.Web.Api.Dtos;
using Backend.Web.Api.Data;
using Backend.Web.Api.Filters;
using Backend.Web.Api.Configuration;
using Microsoft.Extensions.Options;

namespace Backend.Web.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Events")]
    public class EventsController : Controller
    {

        IEventRepository _eventRepository;
        MySettings _settings;

        public EventsController(IEventRepository eventRepository, IOptions<MySettings> settings)
        {
            _eventRepository = eventRepository;
            _settings = settings.Value;

        }

        // GET: api/Events
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_eventRepository.Get());
        }


        // POST: api/Users
        [ServiceFilter(typeof(TokenFilter))]
        [HttpPost]
        public ActionResult Post([FromBody]NewEventVM model)
        {
      
            Thread.Sleep(4000);

            if (ModelState.IsValid)
            { 
                if(string.IsNullOrWhiteSpace(model.Description))
                {
                    return BadRequest(new OperationResponse() { IsValid = false, Errors = new string[] { "Description is empty" } });
                }
                 
                try
                {
                   var newEvent = _eventRepository.Add(model.Description);

                    string newResourceUri = string.Format("/api/users/{0}", newEvent.Id.ToString("N"));

                    return Created(newResourceUri, newEvent);
                }
                catch
                {
                    return StatusCode(500, new { message = "An error occurred while attempting to add the event." });
                }
                
            }
            else
            {
                // extract the list of validation errors
                IEnumerable<string> modelStateErrors =
                    from state in ModelState.Values
                    from error in state.Errors
                    select error.ErrorMessage;
                 
               return BadRequest(new OperationResponse() { IsValid = false, Errors = modelStateErrors});
            }
           
        }

        // DELETE: api/ApiWithActions/5
        [ServiceFilter(typeof(TokenFilter))]
        [HttpDelete("{username}")]
        public ActionResult Delete(string id)
        {
            var eventId = new Guid(id);


            if (_eventRepository.GetById(eventId) == null)
            {
                return NotFound();
            }

            _eventRepository.Delete(eventId);

            return Ok();
        }
    }
}
