using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CabinReservation.Models
{
    public partial class Service
    {
        public Service()
        {
            ReservedService = new HashSet<ReservedService>();
            ResortServices = new HashSet<ResortServices>();
        }

        public int Id { get; set; }
        [Required]
        public string ServiceName { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal PricePerService { get; set; }
        [Required]
        public int ServiceProviderId { get; set; }

        public virtual ServiceProvider ServiceProvider { get; set; }
        public virtual ICollection<ReservedService> ReservedService { get; set; }
        public virtual ICollection<ResortServices> ResortServices { get; set; }
    }
}
