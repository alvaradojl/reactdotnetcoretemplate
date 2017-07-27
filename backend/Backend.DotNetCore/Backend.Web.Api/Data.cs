using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Web.Api.Models;

namespace Backend.Web.Api
{
  public interface IUserRepository
    {
        List<Models.User> Get();

        Models.User Get(string username);

        void Update(Models.User user);

        void Delete(string username);

        void Add(Models.User user);
    }

    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException(string message) : base(message)
        {
        }
    }

    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message) : base(message)
        {
        }
    }

    public class UserRepository : IUserRepository
    {

        List<User> _inMemoryUsers;

        public UserRepository()
        {
            _inMemoryUsers = new List<Models.User>();

            _inMemoryUsers.Add(new Models.User { Username = "user1", Email = "user1@email.com", Password = "123", PasswordConfirmation = "123", Timezone = "Europe/Zurich" });
            _inMemoryUsers.Add(new Models.User { Username = "user2", Email = "user2@email.com", Password = "123", PasswordConfirmation = "123", Timezone = "Europe/Berlin" });
            _inMemoryUsers.Add(new Models.User { Username = "user3", Email = "user3@email.com", Password = "123", PasswordConfirmation = "123", Timezone = "Europe/Paris" });
            _inMemoryUsers.Add(new Models.User { Username = "user4", Email = "user4@email.com", Password = "123", PasswordConfirmation = "123", Timezone = "Europe/Madrid" });
            _inMemoryUsers.Add(new Models.User { Username = "user5", Email = "user5@email.com", Password = "123", PasswordConfirmation = "123", Timezone = "Europe/Vienna" });

        }

        public void Add(User user)
        {
            
            if (_inMemoryUsers.Exists(x => x.Username == user.Username))
            {
                throw new UserAlreadyExistsException("User already exists.");
            }

            _inMemoryUsers.Add(user);

        }

        public void Delete(string username)
        {
            if (!_inMemoryUsers.Exists(x => x.Username == username))
            {
                throw new UserNotFoundException("user does not exist.");
            }

            var userToBeRemoved = _inMemoryUsers.FirstOrDefault(x => x.Username == username);

            _inMemoryUsers.Remove(userToBeRemoved);
        }

        public List<User> Get()
        {
            return _inMemoryUsers.ToList();
        }

        public User Get(string username)
        {
            return _inMemoryUsers.FirstOrDefault(x => x.Username == username);
        }

        public void Update(User user)
        {
            if (!_inMemoryUsers.Exists(x => x.Username == user.Username))
            {
                throw new UserNotFoundException("user does not exist.");
            }

            var userToBeUpdated = _inMemoryUsers.FirstOrDefault(x => x.Username == user.Username);

            _inMemoryUsers.Remove(userToBeUpdated);

            _inMemoryUsers.Add(user);

        }
    }

}
