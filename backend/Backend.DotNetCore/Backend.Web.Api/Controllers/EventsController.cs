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
using System.Net.Http;

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
        public async Task<ActionResult> Random(int startIndex =0, int stopIndex =1)
        {
            string seed = "TEST";
            int page = 1;
            int results = stopIndex - startIndex + 1; //0-based index
            string urlTemplate = "https://randomuser.me/api/?inc=name,nat,picture&page={0}&results={1}&seed={2}";

            string finalUrl = string.Format(urlTemplate, page, results, seed);

            List<RandomPayload> finalResult = new List<RandomPayload>();

            var httpClient = new HttpClient();

            var httpResult = await httpClient.GetStringAsync(finalUrl);

            var randomUsersReturned = Newtonsoft.Json.JsonConvert.DeserializeObject<RandomUserResult>(httpResult);

            for (int i = 0; i < randomUsersReturned.results.Length; i++)
            {
                var randomId = Guid.NewGuid();

                finalResult.Add(new RandomPayload() {
                    Id = randomId,
                    FullName = string.Format("{0} {1} {2}", 
                                randomUsersReturned.results[i].name.title,
                                randomUsersReturned.results[i].name.first,
                                randomUsersReturned.results[i].name.last
                                ),
                    PictureUrl= randomUsersReturned.results[i].picture.large,
                    Index = startIndex + i
                });
            }
            return Ok(finalResult);
        }



    }

    public class RandomPayload
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string PictureUrl { get; set; }

        public int Index { get; set; }

    }

}
