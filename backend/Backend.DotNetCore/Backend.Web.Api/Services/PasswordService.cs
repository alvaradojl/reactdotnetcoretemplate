using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Backend.Web.Api.Services
{
    public class PasswordService : IPasswordService
    {
        public bool IsValid(string clearTextPassword, string salt, string hashed)
        {
            byte[] saltInBytes = Convert.FromBase64String(salt);

            var passwordData = Hash(clearTextPassword, saltInBytes);

            return (string.Equals(passwordData.HashedPassword,hashed));
        }

        public Password Hash(string clearText)
        { 
            var salt = GenerateSalt();

            return Hash(clearText, salt);
        }

        private byte[] GenerateSalt()
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        private Password Hash(string clearText, byte[] salt)
        {
             
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: clearText,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));


            return new Password(Convert.ToBase64String(salt), hashed);
        }

    }



    public interface IPasswordService
    {
        bool IsValid(string clearTextPassword, string salt, string hashed);

        Password Hash(string clearText);
    }


    public class Password
    {
        public Password(string salt, string hash)
        {
            this.Salt = salt;
            this.HashedPassword = hash;
        }

        public string Salt { get; }

        public string HashedPassword { get; }
    }
}
