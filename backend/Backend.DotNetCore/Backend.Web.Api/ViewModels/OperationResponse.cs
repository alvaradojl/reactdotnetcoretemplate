﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.ViewModels
{
    public class OperationResponse
    {
        public IEnumerable<string> Errors { get; set; }

        public bool IsValid { get; set; }
    }
}
