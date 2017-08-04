using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.Dtos
{
    public class JwtDto
    {
        [Display(Name ="iss")]
        [JsonProperty("iss")]
        public string Issuer { get; set; }

        [Display(Name = "sub")]
        [JsonProperty("sub")]
        public string Subject { get; set; }

        [Display(Name = "aud")]
        [JsonProperty("aud")]
        public string Audience { get; set; }

         
        [JsonProperty("nbf")]
        public long NotBefore { get; set; }

      
        [JsonProperty("iat")]
        public long IssuedAt { get; set; }

       
        [JsonProperty("exp")]
        public long Expires { get; set; }

        
        [JsonProperty("jti")]
        public string JwtId { get; set; }

      
        [JsonProperty("email")]
        public string Email { get; set; }

       
        [JsonProperty("timezone")]
        public string Timezone { get; set; }
    }
}
