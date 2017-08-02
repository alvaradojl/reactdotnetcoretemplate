using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Web.Api.ViewModels;
using Backend.Web.Api.Services;
using Microsoft.Extensions.Options;
using Backend.Web.Api.Configuration;
using Jwt;

namespace Backend.Web.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        IUserRepository _userRepository;
        IPasswordService _passwordService;
        MySettings _settings;


        public AuthController(IUserRepository userRepository, IPasswordService passwordService, IOptions<MySettings> settings)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _settings = settings.Value;
        }
      
        // POST: api/Auth
        [HttpPost]
        public ActionResult Post([FromBody]LoginVM model)
        {
            if (ModelState.IsValid)
            { 
             
                Models.User foundUser = _userRepository.GetByUsername(model.Identifier)==null ? _userRepository.GetByEmail(model.Identifier) : null;
                 
                if (foundUser == null)
                {
                    return Unauthorized();
                }
                else
                {
                    if(_passwordService.IsValid(model.Password, foundUser.Salt, foundUser.HashedPassword))
                    {
                        var payload = new Dictionary<string, object>()
                        {
                            { "username", foundUser.Username },
                            { "email", foundUser.Email },
                            { "timezone", foundUser.Timezone }
                        };
                       
                        var token = JsonWebToken.Encode(payload, _settings.Security.JwtSecret, JwtHashAlgorithm.HS256);
                        return Ok(new { jwt=token });
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }

            }

            return BadRequest();
            
        }
        
      
    }
}
