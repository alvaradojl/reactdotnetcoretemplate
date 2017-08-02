using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.Configuration
{
    public class MySettings
    {
        public SecuritySettings Security { get; set; }
    }

    public class SecuritySettings
    {
        public string JwtSecret { get; set; }
    }
}
