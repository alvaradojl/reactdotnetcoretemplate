using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Web.Api.Models;
using Backend.Web.Api.Services;
using Backend.Web.Api.Dtos;
using Backend.Web.Api.Exceptions;

namespace Backend.Web.Api.Data
{
  public interface IUserRepository
    {
        List<Models.User> Get();

        Models.User GetByUsername(string username);

        Models.User GetByEmail(string email);


        void Update(UserDto user);

        void Delete(string username);

        void Add(UserDto user);
    }

   

    public class UserRepository : IUserRepository
    {
        IPasswordService _passwordService;
        List<User> _inMemoryDb;

        public UserRepository(IPasswordService passwordService)
        {
            _inMemoryDb = new List<Models.User>();
            _passwordService = passwordService;
            _inMemoryDb.Add(new Models.User { Username = "user1", Email = "user1@email.com", HashedPassword = "wUbcgmrbAYWbPxPrmnTq72e7TliMbLbp+z8IjiZfLnI=", Salt= "b3qSg3H7WcszgqMqjMkmkw==", Timezone = "Europe/Zurich" });
            _inMemoryDb.Add(new Models.User { Username = "user2", Email = "user2@email.com", HashedPassword = "wUbcgmrbAYWbPxPrmnTq72e7TliMbLbp+z8IjiZfLnI=", Salt= "b3qSg3H7WcszgqMqjMkmkw==", Timezone = "Europe/Berlin" });
            _inMemoryDb.Add(new Models.User { Username = "user3", Email = "user3@email.com", HashedPassword = "wUbcgmrbAYWbPxPrmnTq72e7TliMbLbp+z8IjiZfLnI=", Salt= "b3qSg3H7WcszgqMqjMkmkw==", Timezone = "Europe/Paris" });
            _inMemoryDb.Add(new Models.User { Username = "user4", Email = "user4@email.com", HashedPassword = "wUbcgmrbAYWbPxPrmnTq72e7TliMbLbp+z8IjiZfLnI=", Salt= "b3qSg3H7WcszgqMqjMkmkw==", Timezone = "Europe/Madrid" });
            _inMemoryDb.Add(new Models.User { Username = "user5", Email = "user5@email.com", HashedPassword = "wUbcgmrbAYWbPxPrmnTq72e7TliMbLbp+z8IjiZfLnI=", Salt= "b3qSg3H7WcszgqMqjMkmkw==", Timezone = "Europe/Vienna" });

        }

        public void Add(UserDto user)
        {
            
            if (_inMemoryDb.Exists(x => x.Username == user.Username) || _inMemoryDb.Exists(x => x.Email == user.Email))
            {
                throw new RecordAlreadyExistsException("User already exists.");
            }

            var passwordData = _passwordService.Hash(user.ClearTextPassword);

            _inMemoryDb.Add(new Models.User() { Username = user.Username, Email = user.Email, Timezone = user.Timezone, HashedPassword = passwordData.HashedPassword, Salt = passwordData.Salt });


        }

        public void Delete(string username)
        {
            if (!_inMemoryDb.Exists(x => x.Username == username))
            {
                throw new RecordNotFoundException("user does not exist.");
            }

            var userToBeRemoved = _inMemoryDb.FirstOrDefault(x => x.Username == username);

            _inMemoryDb.Remove(userToBeRemoved);
        }

        public List<User> Get()
        {
            return _inMemoryDb.ToList();
        }

        public User GetByUsername(string username)
        {
            return _inMemoryDb.FirstOrDefault(x => x.Username == username);
        }

        public User GetByEmail(string email)
        {
            return _inMemoryDb.FirstOrDefault(x => x.Email == email);
        }

        public void Update(UserDto user)
        {
            if (!_inMemoryDb.Exists(x => x.Username == user.Username))
            {
                throw new RecordNotFoundException("user does not exist.");
            }

            var userToBeUpdated = _inMemoryDb.FirstOrDefault(x => x.Username == user.Username);

            _inMemoryDb.Remove(userToBeUpdated);

            var passwordData = _passwordService.Hash(user.ClearTextPassword);
             
            _inMemoryDb.Add(new Models.User() { Username=user.Username, Email=user.Email, Timezone=user.Timezone, HashedPassword=passwordData.HashedPassword, Salt=passwordData.Salt  });

        }
    }

}
