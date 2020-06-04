using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CabinReservation.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Cabin = new HashSet<Cabin>();
            Reservation = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Details { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
        [JsonIgnore]
        public virtual ICollection<Cabin> Cabin { get; set; }
        [JsonIgnore]
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
