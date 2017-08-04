using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.Extensions.Options;
using Backend.Web.Api.Configuration;
using Backend.Web.Api.Data;
using Backend.Web.Api.Dtos;

namespace Backend.Web.Api.Filters
{

      public class TokenFilter: ActionFilterAttribute
    {
        const string AUTHORIZATION_HEADER = "Authorization";
        const string BEARER_AUTHENTICATION = "Bearer";


        MySettings _settings;
        IUserRepository _userRepository;


        public TokenFilter(IOptions<MySettings> settings, IUserRepository userRepository)
        {
            _settings = settings.Value;
            _userRepository = userRepository;
        }

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            
            var authHeader = actionContext.HttpContext.Request.Headers[AUTHORIZATION_HEADER];

            if (!authHeader.Any() || authHeader.FirstOrDefault() == null)
            {
                actionContext.Result = new UnauthorizedResult();
            }
            else
            {
                var authType = authHeader.FirstOrDefault().Split(' ')[0];


                if (authType != BEARER_AUTHENTICATION)
                {
                    actionContext.Result = new UnauthorizedResult();
                }
                else
                {
                    try
                    {
                        var serializedJwt = authHeader.FirstOrDefault().Split(' ')[1];

                        var secretInBytes = Convert.FromBase64String(_settings.Security.JwtSecret);

                        var decodedToken = Jose.JWT.Decode(serializedJwt, secretInBytes, Jose.JwsAlgorithm.HS256);

                        JwtDto jwt = Newtonsoft.Json.JsonConvert.DeserializeObject<JwtDto>(decodedToken);

                        var userFound = _userRepository.GetByUsername(jwt.Subject);

                        if (userFound == null)
                        {
                            actionContext.Result = new UnauthorizedResult();
                        }

                        var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

                        if(jwt.NotBefore>now || now > jwt.Expires)
                        {
                            actionContext.Result = new UnauthorizedResult();
                        }

                        //IF NO EXCEPTIONS THEN CARRY ON...
                    }
                    catch
                    {
                        actionContext.Result = new UnauthorizedResult();
                    }
                }
            }
        }

    }
}
