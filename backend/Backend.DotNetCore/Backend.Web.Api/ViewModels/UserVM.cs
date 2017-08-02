using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Web.Api.ViewModels
{
    public class RegisterUserVM
    {
        [Required(AllowEmptyStrings =false)] 
        public string Username { get; set; }
        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
        [Required(AllowEmptyStrings = false)]
        [Compare("Password")]
        public string PasswordConfirmation { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Timezone { get; set; }
    }
}
