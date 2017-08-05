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
using Backend.Web.Api.Data;
using Backend.Web.Api.Dtos;
using Jose;
using System.Threading;

namespace Backend.Web.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    public class AuthController : Controller
    {
        IUserRepository _userRepository;
        IPasswordService _passwordService;
        MySettings _settings;

        const string ISSUER = "https://consonance.ch";
        const string AUDIENCE = "https://consonance.ch";


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
            Thread.Sleep(4000);

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
                        var iat = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                        var nbf = DateTimeOffset.UtcNow.AddMinutes(-1).ToUnixTimeSeconds();
                        var exp = DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds();

                        var payload = new Dictionary<string, object>()
                        {
                            { "sub", foundUser.Username },
                            { "exp", exp },
                            { "iss", ISSUER},
                            { "aud", AUDIENCE },
                            { "iat", iat },
                            { "nbf",nbf },
                            { "email", foundUser.Email },
                            { "timezone", foundUser.Timezone }
                        };

                        var secretInBytes = Convert.FromBase64String(_settings.Security.JwtSecret);
  
                        var serializedJwt = Jose.JWT.Encode(payload, secretInBytes, JwsAlgorithm.HS256);
                        return Ok(new { jwt=serializedJwt });
                    }
                    else
                    {
                        return Unauthorized();
                    }
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



                return BadRequest(new OperationResponse() { IsValid = false, Errors = listErrors });
            }

        }
        
      
    }
}
