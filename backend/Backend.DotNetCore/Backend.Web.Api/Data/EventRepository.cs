using Backend.Web.Api.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Web.Api.Models;
using Backend.Web.Api.Exceptions;

namespace Backend.Web.Api.Data
{

    public interface IEventRepository
    {

        List<Models.Event> Get();

        Event GetById(Guid id);


        void Update(EventDto @event);

        void Delete(Guid id);

        EventDto Add(string description);
    }

    public class EventRepository : IEventRepository
    {

        List<Event> _inMemoryDb;

        public EventRepository()
        {
            _inMemoryDb = new List<Event>();

            _inMemoryDb.Add(new Event() { Id = Guid.NewGuid(), Description = "first description" });
            _inMemoryDb.Add(new Event() { Id = Guid.NewGuid(), Description = "second description" });
            _inMemoryDb.Add(new Event() { Id = Guid.NewGuid(), Description = "third description" });
            _inMemoryDb.Add(new Event() { Id = Guid.NewGuid(), Description = "forth description" });
            _inMemoryDb.Add(new Event() { Id = Guid.NewGuid(), Description = "fifth description" });

        }

        public EventDto Add(string description)
        {
            if (_inMemoryDb.Exists(x => x.Description == description))
            {
                throw new RecordAlreadyExistsException("Event already exists.");
            }

            var newEvent = new Models.Event() { Id = Guid.NewGuid(), Description = description };

            _inMemoryDb.Add(newEvent);

            return new EventDto(newEvent.Id, newEvent.Description);
        }

        public void Delete(Guid id)
        {
            if (!_inMemoryDb.Exists(x => x.Id == id))
            {
                throw new RecordNotFoundException("event does not exist.");
            }

            var eventToBeRemoved = _inMemoryDb.FirstOrDefault(x => x.Id==id);

            _inMemoryDb.Remove(eventToBeRemoved);
        }

        public List<Event> Get()
        {
            return _inMemoryDb.ToList();
        }

        public Event GetById(Guid id)
        {
            return _inMemoryDb.FirstOrDefault(x=>x.Id==id);
        }

        public void Update(EventDto @event)
        {
            if (!_inMemoryDb.Exists(x => x.Id == @event.Id))
            {
                throw new RecordNotFoundException("event does not exist.");
            }

            var eventToBeUpdated = _inMemoryDb.FirstOrDefault(x => x.Id == @event.Id);

            _inMemoryDb.Remove(eventToBeUpdated);
             

            _inMemoryDb.Add(new Models.Event() { Id=@event.Id, Description=@event.Description  });

        }
    }
}
