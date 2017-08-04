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
        public ActionResult Get(string identifier)
        {
            var userFoundByUsername = _userRepository.GetByUsername(identifier);
           
            if (userFoundByUsername != null)
            {
                return Ok(userFoundByUsername);
            }
            else
            {
                var userFoundByEmail = _userRepository.GetByEmail(identifier);

                if (userFoundByEmail != null)
                {
                    return Ok(userFoundByEmail);
                }
                else
                {
                    return NotFound(new OperationResponse() { IsValid = false, Errors = new string[] { "User does not exists." } });
                }
            }
           
        }
        
        // POST: api/Users
        [HttpPost]
        public ActionResult Post([FromBody]RegisterUserVM model)
        {

            Thread.Sleep(4000);

            if (ModelState.IsValid)
            {
                if (_userRepository.GetByUsername(model.Username) != null)
                {
                    return BadRequest(new OperationResponse() { IsValid = false, Errors = new string[] { "Username already exists." } });
                }

                if(_userRepository.GetByEmail(model.Email) != null)
                {
                    return BadRequest(new OperationResponse() { IsValid = false, Errors = new string[] { "Email already exists." } });
                }

                var parsedUser = new UserDto() { Username = model.Username, Email = model.Email, ClearTextPassword = model.Password, Timezone = model.Timezone };
                try
                {
                    _userRepository.Add(parsedUser);

                    string newResourceUri = string.Format("/api/users/{0}", model.Username);

                    return Created(newResourceUri, parsedUser);
                }
                catch
                {
                    return StatusCode(500, new { message = "error while attempting to add the user." });
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
        
        // PUT: api/Users/5
        [HttpPut("{username}")]
        public ActionResult Put(string username, [FromBody]RegisterUserVM model)
        {

            if (ModelState.IsValid)
            {
                if (_userRepository.GetByUsername(username) == null)
                {
                    return NotFound(new OperationResponse() { IsValid = false, Errors = new string[] { "User does not exists." } });
                }

                var updatedUser = new UserDto() { Username = username, Email = model.Email, ClearTextPassword = model.Password, Timezone = model.Timezone };

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
           
            if (_userRepository.GetByUsername(username) == null)
            {
                return NotFound();
            }

            _userRepository.Delete(username);

            return Ok();
        }
    }
}
