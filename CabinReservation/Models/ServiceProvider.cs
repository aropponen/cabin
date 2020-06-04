using System;
using System.Collections.Generic;

namespace CabinReservation.Models
{
    public partial class ServiceProvider
    {
        public ServiceProvider()
        {
            Service = new HashSet<Service>();
        }

        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Service> Service { get; set; }
    }
}
