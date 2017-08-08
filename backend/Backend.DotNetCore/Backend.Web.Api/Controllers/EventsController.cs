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
                    return BadRequest(new OperationResponse() { IsValid = false,
                        Errors = new Dictionary<string, string>(){
                            { "identifier", "Description is empty or invalid." }
                        }
                    });
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
                var listErrors = ModelState.ToDictionary(
                 m => m.Key,
                 m => m.Value.Errors
                   .Select(s => s.ErrorMessage)
                   .FirstOrDefault(s => s != null)
               );

                return BadRequest(new OperationResponse() { IsValid = false, Errors = listErrors});
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

        // GET: api/events/Random
        [Route("Random")]
        [HttpGet]
        public ActionResult Random()
        {

            var randomId = Guid.NewGuid();

            var newRandomEvent = new Event() { Id=randomId, Description="The description generated is " + randomId };

            return Ok(newRandomEvent);
        }
    }
}
