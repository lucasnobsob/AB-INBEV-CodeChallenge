using AB_INBEV.Domain.Core.Events;

namespace AB_INBEV.Domain.Events
{
    public class EmployeeRegisteredEvent : Event
    {
        public EmployeeRegisteredEvent(Guid id, string name, string email, DateTime birthDate)
        {
            Id = id;
            Name = name;
            Email = email;
            BirthDate = birthDate;
            AggregateId = id;
        }
        public Guid Id { get; set; }

        public string Name { get; private set; }

        public string Email { get; private set; }

        public DateTime BirthDate { get; private set; }
    }
}
