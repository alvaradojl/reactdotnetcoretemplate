using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Web.Api.Models;
using Backend.Web.Api.ViewModels;
using System.Threading;

namespace Backend.Web.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {

        IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;

        }

        // GET: api/Users
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_userRepository.Get());
        }

        // GET: api/Users/5
        [HttpGet("{username}", Name = "Get")]
        public ActionResult Get(string username)
        {
            var userFound = _userRepository.Get(username);
            if (userFound == null)
            {
                return NotFound(new OperationResponse() { IsValid = false, Errors = new string[] { "User does not exists." } });
            }
            return Ok(userFound);
        }
        
        // POST: api/Users
        [HttpPost]
        public ActionResult Post([FromBody]UserVM model)
        {

            Thread.Sleep(4000);

            if (ModelState.IsValid)
            {
                if (_userRepository.Get(model.Username) != null)
                {
                    return BadRequest(new OperationResponse() { IsValid = false, Errors = new string[] { "User already exists." } });
                }

                var parsedUser = new Models.User() { Username = model.Username, Email = model.Email, Password = model.Password, PasswordConfirmation = model.PasswordConfirmation, Timezone = model.Timezone };

                _userRepository.Add(parsedUser);

                string newResourceUri = string.Format("/api/users/{0}", model.Username);

                return Created(newResourceUri, parsedUser);
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
        
        // PUT: api/Users/5
        [HttpPut("{username}")]
        public ActionResult Put(string username, [FromBody]UserVM model)
        {

            if (ModelState.IsValid)
            {
                if (_userRepository.Get(username) == null)
                {
                    return NotFound(new OperationResponse() { IsValid = false, Errors = new string[] { "User does not exists." } });
                }

                var updatedUser = new Models.User() { Username = username, Email = model.Email, Password = model.Password, PasswordConfirmation = model.PasswordConfirmation, Timezone = model.Timezone };

                _userRepository.Update(updatedUser);

                return Ok(updatedUser);
            }
            else
            {
                // extract the list of validation errors
                IEnumerable<string> modelStateErrors =
                    from state in ModelState.Values
                    from error in state.Errors
                    select error.ErrorMessage;

                 
                return BadRequest(new OperationResponse() { IsValid = false, Errors = modelStateErrors });
            }
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{username}")]
        public ActionResult Delete(string username)
        {
           
            if (_userRepository.Get(username) == null)
            {
                return NotFound();
            }

            _userRepository.Delete(username);

            return Ok();
        }
    }
}
