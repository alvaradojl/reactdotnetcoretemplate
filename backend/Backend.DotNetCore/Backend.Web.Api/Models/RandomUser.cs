using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.Models
{

    public class RandomUserResult
    {
        public Result[] results { get; set; }
        public Info info { get; set; }
    }

    public class Info
    {
        public string seed { get; set; }
        public int results { get; set; }
        public int page { get; set; }
        public string version { get; set; }
    }

    public class Result
    {
        public Name name { get; set; }
        public Picture picture { get; set; }
        public string nat { get; set; }
    }

    public class Name
    {
        public string title { get; set; }
        public string first { get; set; }
        public string last { get; set; }
    }

    public class Picture
    {
        public string large { get; set; }
        public string medium { get; set; }
        public string thumbnail { get; set; }
    }

}
